import checkTypes from 'check-types';
import { DEFAULT_ARG } from './spawn';
import { AbstractService } from './service';

import pact from './pact-standalone';
import { LogLevel } from './logger/types';

export class Stub extends AbstractService {
  public readonly options: StubOptions;

  constructor(passedOptions: StubOptions = {}) {
    const options = { ...passedOptions };
    options.pactUrls = options.pactUrls || [];

    if (options.pactUrls) {
      checkTypes.assert.array.of.string(options.pactUrls);
    }

    checkTypes.assert.not.emptyArray(options.pactUrls);

    super(pact.stubFullPath, options, {
      pactUrls: DEFAULT_ARG,
      port: '--port',
      host: '--host',
      log: '--log',
      logLevel: '--log-level',
      ssl: '--ssl',
      sslcert: '--sslcert',
      sslkey: '--sslkey',
      cors: '--cors',
    });
    this.options = options;
  }
}

// Creates a new instance of the pact stub with the specified option
export default (options?: StubOptions): Stub => new Stub(options);

export interface StubOptions {
  pactUrls?: string[];
  port?: number;
  ssl?: boolean;
  cors?: boolean;
  host?: string;
  sslcert?: string;
  sslkey?: string;
  log?: string;
  logLevel?: LogLevel;
  timeout?: number;
}
