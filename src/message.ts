import fs from 'fs';
import path from 'path';
import { sync as mkdirpSync } from 'mkdirp';
import checkTypes from 'check-types';
import logger from './logger';
import spawn, { DEFAULT_ARG } from './spawn';
import pactStandalone from './pact-standalone';
import { MessageOptions } from './types';

export class Message {
  public readonly options: MessageOptions;

  private readonly __argMapping = {
    pactFileWriteMode: DEFAULT_ARG,
    dir: '--pact_dir',
    consumer: '--consumer',
    provider: '--provider',
    spec: '--pact_specification_version',
  };

  constructor(passedOptions: MessageOptions = {}) {
    const options = { ...passedOptions };
    options.pactFileWriteMode = options.pactFileWriteMode || 'update';
    options.spec = options.spec || 3;

    checkTypes.assert.nonEmptyString(
      options.consumer || '',
      'Must provide the consumer name'
    );
    checkTypes.assert.nonEmptyString(
      options.provider || '',
      'Must provide the provider name'
    );
    checkTypes.assert.nonEmptyString(
      options.content || '',
      'Must provide message content'
    );
    checkTypes.assert.nonEmptyString(
      options.dir || '',
      'Must provide pact output dir'
    );

    if (options.spec) {
      checkTypes.assert.number(options.spec);
      checkTypes.assert.integer(options.spec);
      checkTypes.assert.positive(options.spec);
    }

    if (options.dir) {
      options.dir = path.resolve(options.dir);
      try {
        fs.statSync(options.dir).isDirectory();
      } catch (e) {
        mkdirpSync(options.dir);
      }
    }

    if (options.content) {
      try {
        JSON.parse(options.content);
      } catch (e) {
        throw new Error(
          'Unable to parse message content to JSON, invalid json supplied'
        );
      }
    }

    if (options.consumer) {
      checkTypes.assert.string(options.consumer);
    }

    if (options.provider) {
      checkTypes.assert.string(options.provider);
    }

    this.options = options;
  }

  public createMessage(): Promise<unknown> {
    logger.info(`Creating message pact`);

    return new Promise((resolve, reject) => {
      const { pactFileWriteMode, content, ...restOptions } = this.options;

      const instance = spawn.spawnBinary(
        pactStandalone.messageFullPath,
        [{ pactFileWriteMode }, restOptions],
        this.__argMapping
      );
      const output: Array<string | Buffer> = [];
      if (instance.stdout && instance.stderr && instance.stdin) {
        instance.stdout.on('data', (l) => output.push(l));
        instance.stderr.on('data', (l) => output.push(l));
        instance.stdin.write(content);
        instance.stdin.end();
      }
      instance.once('close', (code) => {
        const o = output.join('\n');
        logger.info(o);

        if (code === 0) {
          return resolve(o);
        }
        return reject(o);
      });
    });
  }
}

export default (options: MessageOptions): Message => new Message(options);
