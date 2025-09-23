import * as path from 'node:path';
import * as childProcess from 'node:child_process';
import { getBinaryEntry } from '../standalone/install';
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
  // Runtime check for Windows .bat files - require shell: true for proper execution
  const isWindowsBatFile =
    pactEnvironment.isWindows() && command.endsWith('.bat');

  const spawnOptions: childProcess.SpawnSyncOptions = {
    stdio: 'inherit',
    ...(isWindowsBatFile && { shell: true }),
  };

  const result = childProcess.spawnSync(command, args, spawnOptions);
  if (result.error) {
    return { error: result.error };
  }
  return { status: result.status ?? undefined };
}

export interface PactStandalone {
  cwd: string;
  brokerPath: string;
  brokerFullPath: string;
  mockServicePath: string;
  mockServiceFullPath: string;
  stubPath: string;
  stubFullPath: string;
  verifierPath: string;
  verifierFullPath: string;
  messagePath: string;
  messageFullPath: string;
  pactPath: string;
  pactFullPath: string;
  pactflowPath: string;
  pactflowFullPath: string;
  // rust tools
  mockServerPath: string;
  mockServerFullPath: string;
  verifierRustPath: string;
  verifierRustFullPath: string;
  stubServerPath: string;
  stubServerFullPath: string;
  pluginPath: string;
  pluginFullPath: string;
}

export const standalone = (
  platform: string = process.platform,
  arch: string = process.arch
): PactStandalone => {
  const binName = (name: string): string =>
    `${name}${pactEnvironment.isWindows(platform) ? '.bat' : ''}`;
  const exeName = (name: string): string =>
    `${name}${pactEnvironment.isWindows(platform) ? '.exe' : ''}`;
  const mock = binName('pact-mock-service');
  const message = binName('pact-message');
  const verify = binName('pact-provider-verifier');
  const broker = binName('pact-broker');
  const stub = binName('pact-stub-service');
  const pact = binName('pact');
  const pactflow = binName('pactflow');
  // rust tools
  const mockServer = exeName('pact_mock_server_cli');
  const verifier = exeName('pact_verifier_cli');
  const stubServer = exeName('pact-stub-server');
  const plugin = exeName('pact-plugin-cli');

  const basePath = path.join(
    'standalone',
    getBinaryEntry(platform, arch).folderName,
    'pact',
    'bin'
  );

  const exePath = getExePath();
  return {
    cwd: pactEnvironment.cwd,
    brokerPath: path.join(basePath, broker),
    brokerFullPath: path.resolve(exePath, basePath, broker).trim(),
    messagePath: path.join(basePath, message),
    messageFullPath: path.resolve(exePath, basePath, message).trim(),
    mockServicePath: path.join(basePath, mock),
    mockServiceFullPath: path.resolve(exePath, basePath, mock).trim(),
    stubPath: path.join(basePath, stub),
    stubFullPath: path.resolve(exePath, basePath, stub).trim(),
    pactPath: path.join(basePath, pact),
    pactFullPath: path.resolve(exePath, basePath, pact).trim(),
    pactflowPath: path.join(basePath, pactflow),
    pactflowFullPath: path.resolve(exePath, basePath, pactflow).trim(),
    verifierPath: path.join(basePath, verify),
    // rust tools
    mockServerPath: path.join(basePath, mockServer),
    mockServerFullPath: path.resolve(exePath, basePath, mockServer).trim(),
    verifierFullPath: path.resolve(exePath, basePath, verify).trim(),
    verifierRustPath: path.join(basePath, verifier),
    verifierRustFullPath: path.resolve(exePath, basePath, verifier).trim(),
    stubServerPath: path.join(basePath, stubServer),
    stubServerFullPath: path.resolve(exePath, basePath, stubServer).trim(),
    pluginPath: path.join(basePath, plugin),
    pluginFullPath: path.resolve(exePath, basePath, plugin).trim(),
  };
};

export default standalone();
