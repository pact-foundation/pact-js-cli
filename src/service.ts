/* eslint-disable no-param-reassign */
// TODO - the param reassign behaviour is relied on, and should be fixed
import path from 'path';
import fs from 'fs';
import events from 'events';
import { ChildProcess } from 'child_process';
import { timeout, TimeoutError } from 'promise-timeout';
import { sync as mkdirpSync } from 'mkdirp';
import checkTypes from 'check-types';
import needle from 'needle';
import spawn, { CliVerbOptions } from './spawn';
import { LogLevel } from './logger/types';
import logger, { setLogLevel } from './logger';
import { ServiceOptions } from './types';

// Get a reference to the global setTimeout object in case it is mocked by a testing library later
const { setTimeout } = global;

const RETRY_AMOUNT = 60;

const getTimeout = (options: ServiceOptions): number =>
  options.timeout || 30000;

const getRetryTickTime = (options: ServiceOptions): number =>
  Math.round(getTimeout(options) / RETRY_AMOUNT);

interface AbstractServiceEventInterface {
  START_EVENT: string;
  STOP_EVENT: string;
  DELETE_EVENT: string;
}

export abstract class AbstractService extends events.EventEmitter {
  public static get Events(): AbstractServiceEventInterface {
    return {
      START_EVENT: 'start',
      STOP_EVENT: 'stop',
      DELETE_EVENT: 'delete',
    };
  }

  public readonly options: ServiceOptions;

  protected __argMapping: Record<string, string>;

  protected __running: boolean;

  protected __instance: ChildProcess | undefined;

  protected __cliVerb?: CliVerbOptions;

  protected __serviceCommand: string;

  protected constructor(
    command: string,
    options: ServiceOptions,
    argMapping: Record<string, string>,
    cliVerb?: CliVerbOptions
  ) {
    super();
    // Set logger first
    if (options.logLevel) {
      setLogLevel(options.logLevel);
      // Pact-js-core's logger supports fatal and trace,
      // but the ruby binary doesn't. So we map those.
      if ((options.logLevel as string) === 'fatal') {
        options.logLevel = 'error';
      } else if ((options.logLevel as string) === 'trace') {
        options.logLevel = 'debug';
      }

      // Then need to uppercase log level for ruby
      options.logLevel = options.logLevel.toUpperCase() as LogLevel;
    }
    // defaults
    options.ssl = options.ssl || false;
    options.cors = options.cors || false;
    options.host = options.host || 'localhost';

    // port checking
    if (options.port) {
      checkTypes.assert.number(options.port);
      checkTypes.assert.integer(options.port);
      checkTypes.assert.positive(options.port);
      if (!checkTypes.inRange(options.port, 0, 65535)) {
        throw new Error(
          `Port number ${options.port} is not in the range 0-65535`
        );
      }

      if (checkTypes.not.inRange(options.port, 1024, 49151)) {
        logger.warn(
          'Like a Boss, you used a port outside of the recommended range (1024 to 49151); I too like to live dangerously.'
        );
      }
    }

    // ssl check
    checkTypes.assert.boolean(options.ssl);

    // Throw error if one ssl option is set, but not the other
    if (
      (options.sslcert && !options.sslkey) ||
      (!options.sslcert && options.sslkey)
    ) {
      throw new Error(
        'Custom ssl certificate and key must be specified together.'
      );
    }

    // check certs/keys exist for SSL
    if (options.sslcert) {
      try {
        fs.statSync(path.normalize(options.sslcert)).isFile();
      } catch (e) {
        throw new Error(
          `Custom ssl certificate not found at path: ${options.sslcert}`
        );
      }
    }

    if (options.sslkey) {
      try {
        fs.statSync(path.normalize(options.sslkey)).isFile();
      } catch (e) {
        throw new Error(`Custom ssl key not found at path: ${options.sslkey}`);
      }
    }

    // If both sslcert and sslkey option has been specified, let's assume the user wants to enable ssl
    if (options.sslcert && options.sslkey) {
      options.ssl = true;
    }

    // cors check
    checkTypes.assert.boolean(options.cors);

    // log check
    if (options.log) {
      const fileObj = path.parse(path.normalize(options.log));
      try {
        fs.statSync(fileObj.dir).isDirectory();
      } catch (e) {
        // If log path doesn't exist, create it
        mkdirpSync(fileObj.dir);
      }
    }

    // host check
    if (options.host) {
      checkTypes.assert.string(options.host);
    }

    this.options = options;
    this.__running = false;
    this.__cliVerb = cliVerb;
    this.__serviceCommand = command;
    this.__argMapping = argMapping;
  }

  public start(): Promise<AbstractService> {
    if (this.__instance && this.__instance.connected) {
      logger.warn(
        `You already have a process running with PID: ${this.__instance.pid}`
      );
      return Promise.resolve(this);
    }

    this.__instance = this.spawnBinary();
    this.__instance.once('close', () => this.stop());

    if (!this.options.port) {
      // if port isn't specified, listen for it when pact runs
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const catchPort = (data: any): void => {
        const match = data.match(/port=([0-9]+)/);
        if (match && match[1]) {
          this.options.port = parseInt(match[1], 10);
          if (this?.__instance?.stdout) {
            // __instance will never be undefined here because we just
            // read the port number from it
            this.__instance.stdout.removeListener('data', catchPort);
          }
          logger.info(`Pact running on port ${this.options.port}`);
        }
      };

      if (this?.__instance?.stdout) {
        this.__instance.stdout.on('data', catchPort);
      }
    }

    if (this?.__instance?.stderr) {
      this.__instance.stderr.on('data', (data) =>
        logger.error(`Pact Binary Error: ${data}`)
      );
    }

    // check service is available
    return timeout(this.__waitForServiceUp(), getTimeout(this.options))
      .then(() => {
        this.__running = true;
        this.emit(AbstractService.Events.START_EVENT, this);
        return this;
      })
      .catch((err: Error) => {
        if (err instanceof TimeoutError) {
          throw new Error(
            `Timeout while waiting to start Pact with PID: ${
              this.__instance ? this.__instance.pid : 'No Instance'
            }`
          );
        }
        throw err;
      });
  }

  // Stop the instance
  public stop(): Promise<AbstractService> {
    const pid = this.__instance ? this.__instance.pid : -1;
    return timeout(
      Promise.resolve(this.__instance)
        .then(spawn.killBinary)
        .then(() => this.__waitForServiceDown()),
      getTimeout(this.options)
    )
      .catch((err: Error) => {
        if (err instanceof TimeoutError) {
          throw new Error(
            `Timeout while waiting to stop Pact with PID '${pid}'`
          );
        }
        throw err;
      })
      .then(() => {
        this.__running = false;
        this.emit(AbstractService.Events.STOP_EVENT, this);
        return this;
      });
  }

  // Deletes this instance and emit an event
  public delete(): Promise<AbstractService> {
    return this.stop().then(() => {
      this.emit(AbstractService.Events.DELETE_EVENT, this);

      return this;
    });
  }

  // Subclass responsible for spawning the process
  protected spawnBinary(): ChildProcess {
    return spawn.spawnBinary(
      this.__serviceCommand,
      this.__cliVerb ? [this.__cliVerb, this.options] : [this.options],
      this.__argMapping
    );
  }

  // Wait for the service to be initialized and ready
  protected __waitForServiceUp(): Promise<unknown> {
    let amount = 0;

    const waitPromise = new Promise<void>((resolve, reject) => {
      const retry = (): void => {
        if (amount >= RETRY_AMOUNT) {
          reject(
            new Error(
              `Pact startup failed; tried calling service ${RETRY_AMOUNT} times with no result.`
            )
          );
        }
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        setTimeout(check.bind(this), getRetryTickTime(this.options));
      };

      const check = (): void => {
        amount += 1;
        if (this.options.port) {
          this.__call(this.options).then(() => resolve(), retry.bind(this));
        } else {
          retry();
        }
      };

      check(); // Check first time, start polling
    });
    return waitPromise;
  }

  protected __waitForServiceDown(): Promise<unknown> {
    let amount = 0;

    const checkPromise = new Promise<void>((resolve, reject) => {
      const check = (): void => {
        amount += 1;
        if (this.options.port) {
          this.__call(this.options).then(
            () => {
              if (amount >= RETRY_AMOUNT) {
                reject(
                  new Error(
                    `Pact stop failed; tried calling service ${RETRY_AMOUNT} times with no result.`
                  )
                );
                return;
              }
              setTimeout(check, getRetryTickTime(this.options));
            },
            () => resolve()
          );
        } else {
          resolve();
        }
      };
      check(); // Check first time, start polling
    });

    return checkPromise;
  }

  private __call(options: ServiceOptions): Promise<unknown> {
    const config: needle.NeedleOptions = {
      method: 'GET',
      headers: {
        'X-Pact-Mock-Service': 'true',
        'Content-Type': 'application/json',
      },
    };

    if (options.ssl) {
      process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
      config.rejectUnauthorized = false;
      config.agent = false;
    }

    return needle(
      'get',
      `http${options.ssl ? 's' : ''}://${options.host}:${options.port}`,
      config
    ).then((res) => {
      if (res.statusCode !== 200) {
        throw new Error(`HTTP Error: '${JSON.stringify(res)}'`);
      }
    });
  }
}
