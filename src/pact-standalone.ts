import * as path from 'node:path';
import * as childProcess from 'node:child_process';
import pactEnvironment from './pact-environment';

/**
 * Returns the executable path which is located inside `node_modules`
 * The naming convention is app-${os}-${arch}
 * @see https://nodejs.org/api/os.html#osarch
 * @see https://nodejs.org/api/os.html#osplatform
 * @example "x/xx/node_modules/app-darwin-arm64"
 */
export function getExePath(): string {
  const { arch } = process;
  const os = pactEnvironment.isWindows() ? 'windows' : process.platform;
  const packageName = `@pact-foundation/pact-cli`;

  const platformArchSpecificPackage = `${packageName}-${os}-${arch}`;
  try {
    const lib = require.resolve(`${platformArchSpecificPackage}/package.json`);
    return lib.replace('package.json', '');
  } catch (_) {
    throw new Error(
      `Couldn't find application binary for ${os}-${arch}:\n 💡 check if ${platformArchSpecificPackage} has been downloaded in your node_modules`
    );
  }
}

/**
 * Spawns a child process synchronously.
 *
 * This differs slightly from `childProcess.spawnSync` by introspecting the
 * command to see if it is a Windows .bat file and adding `shell: true` to the
 * spawn options if so, to ensure proper execution on Windows.
 *
 * @param command The command to run.
 * @param args The arguments to pass to the command.
 * @returns An object containing the error (if any) and the status code.
 */
export function spawnSync(
  command: string,
  args: string[]
): { error?: Error; status?: number } {
  // Runtime check for Windows .exe files - require shell: true for proper execution
  const isWindowsExeFile =
    pactEnvironment.isWindows() && command.endsWith('.exe');

  if (pactEnvironment.isWindows()) {
    // eslint-disable-next-line no-param-reassign
    command = `"${command}"`;
  }

  const spawnOptions: childProcess.SpawnSyncOptions = {
    stdio: 'inherit',
    ...(isWindowsExeFile && { shell: true }),
  };

  const result = childProcess.spawnSync(command, args, spawnOptions);
  if (result.error) {
    return { error: result.error };
  }
  return { status: result.status ?? undefined };
}

export interface PactStandalone {
  cwd: string;
  pactPath: string;
  pactFullPath: string;
}

export const standalone = (
  platform: string = process.platform
): PactStandalone => {
  const exeName = (name: string): string =>
    `${name}${pactEnvironment.isWindows(platform) ? '.exe' : ''}`;
  const pact = exeName('pact');

  const basePath = path.join('standalone');

  const exePath = getExePath();
  return {
    cwd: pactEnvironment.cwd,
    pactPath: path.join(basePath, pact),
    pactFullPath: path.resolve(exePath, basePath, pact).trim(),
  };
};

export default standalone();
