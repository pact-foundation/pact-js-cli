import * as fs from 'fs';
import * as path from 'path';
import * as chai from 'chai';
import os from 'os';
import { type PactStandalone, standalone } from './pact-standalone';

const { expect } = chai;

// Needs to stay a function and not an arrow function to access mocha 'this' context
describe('Pact Standalone', function forMocha() {
  // Set timeout to 10 minutes because downloading binaries might take a while.
  this.timeout(600000);

  let pact: PactStandalone;

  it('should return an object with cwd, file and fullPath properties that is platform specific', () => {
    pact = standalone();
    expect(pact).to.be.an('object');
    expect(pact.cwd).to.be.ok;
    expect(pact.pactPath).to.contain('pact');
    expect(pact.pactFullPath).to.contain('pact');
  });

  it("should return the base directory of the project with 'cwd' (where the package.json file is)", () => {
    expect(fs.existsSync(path.resolve(pact.cwd, 'package.json'))).to.be.true;
  });

  describe('Check if OS specific files are there', () => {
    const tests = [[os.platform(), os.arch()]];

    tests.forEach(([platform, arch]) => {
      describe(`${platform} ${arch}`, () => {
        beforeEach(() => {
          pact = standalone(platform);
        });

        it('pact full path', () => {
          expect(fs.existsSync(pact.pactFullPath)).to.be.true;
        });

        if (platform === 'win32') {
          it("should add '.exe' to the end of the binary names", () => {
            expect(pact.pactPath).to.contain('pact.exe');
            expect(pact.pactFullPath).to.contain('pact.exe');
          });
        }
      });
    });
  });
});
