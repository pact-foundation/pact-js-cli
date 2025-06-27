import path from 'path';
import fs from 'fs';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import http from 'http';
import rimraf from 'rimraf';
import { sync as mkdirpSync } from 'mkdirp';
import publisherFactory from './publisher';
import logger from './logger';
import brokerMock from '../test/integration/broker-mock';
import { PublisherOptions } from './types';

const { expect } = chai;
chai.use(chaiAsPromised);

describe('Publish Spec', () => {
  const PORT = Math.floor(Math.random() * 999) + 9000;
  const pactFile = path.resolve(
    __dirname,
    '../test/integration/me-they-success.json'
  );
  let server: http.Server;
  let absolutePath: string;
  let relativePath: string;

  before(() =>
    brokerMock(PORT).then((s) => {
      logger.debug(`Pact Broker Mock listening on port: ${PORT}`);
      server = s;
    })
  );

  after(() => server.close());

  beforeEach(() => {
    relativePath = `.tmp/${Math.floor(Math.random() * 1000)}`;
    absolutePath = path.resolve(__dirname, '..', relativePath);
    mkdirpSync(absolutePath);
  });

  afterEach(() => {
    if (fs.existsSync(absolutePath)) {
      rimraf.sync(absolutePath);
    }
  });

  context('when invalid options are set', () => {
    it('should fail with an Error when not given pactBroker', () => {
      expect(() => {
        publisherFactory({
          pactFilesOrDirs: [absolutePath],
          consumerVersion: '1.0.0',
        } as PublisherOptions);
      }).to.throw(Error);
    });

    it('should fail with an Error when not given consumerVersion', () => {
      expect(() => {
        publisherFactory({
          pactBroker: 'http://localhost',
          pactFilesOrDirs: [absolutePath],
        } as PublisherOptions);
      }).to.throw(Error);
    });

    it('should fail with an error when not given pactFilesOrDirs', () => {
      expect(() => {
        publisherFactory({
          pactBroker: 'http://localhost',
          consumerVersion: '1.0.0',
        } as PublisherOptions);
      }).to.throw(Error);
    });

    it('should fail with an Error when given Pact paths that do not exist', () => {
      expect(() => {
        publisherFactory({
          pactBroker: 'http://localhost',
          pactFilesOrDirs: ['test.json'],
          consumerVersion: '1.0.0',
        });
      }).to.throw(Error);
    });
  });

  context('when valid options are set', () => {
    it('should return an absolute path when a relative one is given', () => {
      expect(
        publisherFactory({
          pactBroker: 'http://localhost',
          pactFilesOrDirs: [relativePath],
          consumerVersion: '1.0.0',
        }).options.pactFilesOrDirs[0]
      ).to.be.equal(path.resolve(__dirname, '..', relativePath));
    });

    it('should return a Publisher object when given the correct arguments', () => {
      const p = publisherFactory({
        pactBroker: 'http://localhost',
        pactFilesOrDirs: [pactFile],
        consumerVersion: '1.0.0',
      });
      expect(p).to.be.ok;
      expect(p.publish).to.be.a('function');
    });
  });

  context('when a bearer token is provided', () => {
    context('and specifies a username or password', () => {
      it('should fail with an error', () => {
        expect(() =>
          publisherFactory({
            pactBroker: 'http://localhost',
            pactFilesOrDirs: [relativePath],
            consumerVersion: '1.0.0',
            pactBrokerToken: '1234',
            pactBrokerUsername: 'username',
            pactBrokerPassword: '5678',
          })
        ).to.throw(Error);
      });
    });
    it('should not fail', () => {
      const p = publisherFactory({
        pactBroker: 'http://localhost',
        pactFilesOrDirs: [pactFile],
        consumerVersion: '1.0.0',
        pactBrokerToken: '1234',
      });
      expect(p).to.be.ok;
      expect(p.publish).to.be.a('function');
    });
  });
});
