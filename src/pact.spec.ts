import * as chai from 'chai';
import * as path from 'path';
import chaiAsPromised from 'chai-as-promised';
import * as fs from 'fs';
import pactCli from './pactCli';
import { ServerOptions } from '.';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Pact Spec', () => {
  afterEach(() => pactCli.removeAllServers());

  describe('Set Log Level', () => {
    let originalLogLevel: any;
    // Reset log level after the tests
    before(() => {
      originalLogLevel = pactCli.logLevel();
    });
    after(() => pactCli.logLevel(originalLogLevel));

    context('when setting a log level', () => {
      it("should be able to set log level 'trace'", () => {
        pactCli.logLevel('trace');
        pactCli.logLevel();
      });

      it("should be able to set log level 'debug'", () => {
        pactCli.logLevel('debug');
        pactCli.logLevel();
      });

      it("should be able to set log level 'info'", () => {
        pactCli.logLevel('info');
        pactCli.logLevel();
      });

      it("should be able to set log level 'warn'", () => {
        pactCli.logLevel('warn');
        pactCli.logLevel();
      });

      it("should be able to set log level 'error'", () => {
        pactCli.logLevel('error');
        pactCli.logLevel();
      });
    });
  });

  describe('Create serverFactory', () => {
    let dirPath: string;
    const monkeypatchFile: string = path.resolve(
      __dirname,
      '../test/monkeypatch.rb'
    );

    beforeEach(() => {
      dirPath = path.resolve(
        __dirname,
        `../.tmp/${Math.floor(Math.random() * 1000)}`
      );
    });

    afterEach(() => {
      try {
        if (fs.statSync(dirPath).isDirectory()) {
          fs.rmdirSync(dirPath);
        }
      } catch (e) {
        /* any errors here are not a failed test */
      }
    });

    context('when no options are set', () => {
      it('should use defaults and return serverFactory', () => {
        const server = pactCli.createServer();
        expect(server).to.be.an('object');
        expect(server.options).to.be.an('object');
        expect(server.options).to.contain.all.keys([
          'cors',
          'ssl',
          'host',
          'dir',
        ]);
        expect(server.start).to.be.a('function');
        expect(server.stop).to.be.a('function');
        expect(server.delete).to.be.a('function');
      });
    });

    context('when user specifies valid options', () => {
      it('should return serverFactory using specified options', () => {
        const options = {
          port: 9500,
          host: 'localhost',
          dir: dirPath,
          ssl: true,
          cors: true,
          log: './log/log.txt',
          spec: 1,
          consumer: 'consumerName',
          provider: 'providerName',
          monkeypatch: monkeypatchFile,
        };
        const server = pactCli.createServer(options);
        expect(server).to.be.an('object');
        expect(server.options).to.be.an('object');
        expect(server.options.port).to.equal(options.port);
        expect(server.options.host).to.equal(options.host);
        expect(server.options.dir).to.equal(options.dir);
        expect(server.options.ssl).to.equal(options.ssl);
        expect(server.options.cors).to.equal(options.cors);
        expect(server.options.log).to.equal(path.resolve(options.log));
        expect(server.options.spec).to.equal(options.spec);
        expect(server.options.consumer).to.equal(options.consumer);
        expect(server.options.provider).to.equal(options.provider);
        expect(server.options.monkeypatch).to.equal(options.monkeypatch);
      });
    });

    context('when user specifies invalid port', () => {
      it('should return an error on negative port number', () => {
        expect(() => pactCli.createServer({ port: -42 })).to.throw(Error);
      });

      it('should return an error on non-integer', () => {
        expect(() => {
          pactCli.createServer({ port: 42.42 });
        }).to.throw(Error);
      });

      it('should return an error on non-number', () => {
        expect(() =>
          pactCli.createServer({ port: '99' } as unknown as ServerOptions)
        ).to.throw(Error);
      });

      it('should return an error on outside port range', () => {
        expect(() => {
          pactCli.createServer({ port: 99999 });
        }).to.throw(Error);
      });
    });

    context("when user specifies port that's currently in use", () => {
      it('should return a port conflict error', () => {
        pactCli.createServer({ port: 5100 });
        expect(() => pactCli.createServer({ port: 5100 })).to.throw(Error);
      });
    });

    context('when user specifies invalid host', () => {
      it('should return an error on non-string', () => {
        expect(() =>
          pactCli.createServer({ host: 12 } as unknown as ServerOptions)
        ).to.throw(Error);
      });
    });

    context('when user specifies invalid pact directory', () => {
      it('should create the directory for us', () => {
        pactCli.createServer({ dir: dirPath });
        expect(fs.statSync(dirPath).isDirectory()).to.be.true;
      });
    });

    context('when user specifies invalid ssl', () => {
      it('should return an error on non-boolean', () => {
        expect(() =>
          pactCli.createServer({ ssl: 1 } as unknown as ServerOptions)
        ).to.throw(Error);
      });
    });

    context('when user specifies invalid cors', () => {
      it('should return an error on non-boolean', () => {
        expect(() =>
          pactCli.createServer({ cors: 1 } as unknown as ServerOptions)
        ).to.throw(Error);
      });
    });

    context('when user specifies invalid spec', () => {
      it('should return an error on non-number', () => {
        expect(() =>
          pactCli.createServer({ spec: '1' } as unknown as ServerOptions)
        ).to.throw(Error);
      });

      it('should return an error on negative number', () => {
        expect(() => {
          pactCli.createServer({ spec: -12 });
        }).to.throw(Error);
      });

      it('should return an error on non-integer', () => {
        expect(() => {
          pactCli.createServer({ spec: 3.14 });
        }).to.throw(Error);
      });
    });

    context('when user specifies invalid consumer name', () => {
      it('should return an error on non-string', () => {
        expect(() =>
          pactCli.createServer({ consumer: 1234 } as unknown as ServerOptions)
        ).to.throw(Error);
      });
    });

    context('when user specifies invalid provider name', () => {
      it('should return an error on non-string', () => {
        expect(() =>
          pactCli.createServer({ provider: 2341 } as unknown as ServerOptions)
        ).to.throw(Error);
      });
    });

    context('when user specifies invalid monkeypatch', () => {
      it('should return an error on invalid path', () => {
        expect(() => {
          pactCli.createServer({ monkeypatch: 'some-ruby-file.rb' });
        }).to.throw(Error);
      });
    });
  });

  describe('List servers', () => {
    context('when called and there are no servers', () => {
      it('should return an empty list', () => {
        expect(pactCli.listServers()).to.be.empty;
      });
    });

    context('when called and there are servers in list', () => {
      it('should return a list of all servers', () => {
        pactCli.createServer({ port: 1234 });
        pactCli.createServer({ port: 1235 });
        pactCli.createServer({ port: 1236 });
        expect(pactCli.listServers()).to.have.length(3);
      });
    });

    context('when server is removed', () => {
      it('should update the list', () => {
        pactCli.createServer({ port: 1234 });
        pactCli.createServer({ port: 1235 });
        return pactCli
          .createServer({ port: 1236 })
          .delete()
          .then(() => expect(pactCli.listServers()).to.have.length(2));
      });
    });
  });

  describe('Remove all servers', () => {
    context(
      'when removeAll() is called and there are servers to remove',
      () => {
        it('should remove all servers', () => {
          pactCli.createServer({ port: 1234 });
          pactCli.createServer({ port: 1235 });
          pactCli.createServer({ port: 1236 });
          return pactCli
            .removeAllServers()
            .then(() => expect(pactCli.listServers()).to.be.empty);
        });
      }
    );
  });
});
