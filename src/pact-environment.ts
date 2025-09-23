import * as path from 'node:path';

export class PactEnvironment {
  public get cwd(): string {
    return path.resolve(__dirname, '..');
  }

  public isWindows(platform: string = process.platform): boolean {
    return platform === 'win32' || platform === 'cygwin';
  }
}

export default new PactEnvironment();
