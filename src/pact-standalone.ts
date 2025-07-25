import * as path from 'path';
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
  let os = process.platform as string;
  if (['win32', 'cygwin'].includes(process.platform)) {
    os = 'windows';
  }
  const packageName = `@pact-foundation/pact-cli`;

  const platformArchSpecificPackage = `${packageName}-${os}-${arch}`;
  try {
    const lib = require.resolve(`${platformArchSpecificPackage}/package.json`);
    return lib.replace('package.json', '');
  } catch (e) {
    throw new Error(
      `Couldn't find application binary for ${os}-${arch}:\n 💡 check if ${platformArchSpecificPackage} has been downloaded in your node_modules`
    );
  }
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

  return {
    cwd: pactEnvironment.cwd,
    brokerPath: path.join(basePath, broker),
    brokerFullPath: path.resolve(getExePath(), basePath, broker).trim(),
    messagePath: path.join(basePath, message),
    messageFullPath: path.resolve(getExePath(), basePath, message).trim(),
    mockServicePath: path.join(basePath, mock),
    mockServiceFullPath: path.resolve(getExePath(), basePath, mock).trim(),
    stubPath: path.join(basePath, stub),
    stubFullPath: path.resolve(getExePath(), basePath, stub).trim(),
    pactPath: path.join(basePath, pact),
    pactFullPath: path.resolve(getExePath(), basePath, pact).trim(),
    pactflowPath: path.join(basePath, pactflow),
    pactflowFullPath: path.resolve(getExePath(), basePath, pactflow).trim(),
    verifierPath: path.join(basePath, verify),
    // rust tools
    mockServerPath: path.join(basePath, mockServer),
    mockServerFullPath: path.resolve(getExePath(), basePath, mockServer).trim(),
    verifierFullPath: path.resolve(getExePath(), basePath, verify).trim(),
    verifierRustPath: path.join(basePath, verifier),
    verifierRustFullPath: path.resolve(getExePath(), basePath, verifier).trim(),
    stubServerPath: path.join(basePath, stubServer),
    stubServerFullPath: path.resolve(getExePath(), basePath, stubServer).trim(),
    pluginPath: path.join(basePath, plugin),
    pluginFullPath: path.resolve(getExePath(), basePath, plugin).trim(),
  };
};

const isWindows = process.platform === 'win32';

function quoteCmdArg(arg: string) {
  return `"${arg.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function quotePwshArg(arg: string) {
  return `'${arg.replace(/'/g, "''")}'`;
}

function quotePosixShArg(arg: string) {
  return `'${arg.replace(/'/g, "'\\''")}'`;
}

function testWindowsExe(cmd: string, file: string) {
  return new RegExp(`^(?:.*\\\\)?${cmd}(?:\\.exe)?$`, 'i').test(file);
}

function parseArgs(unparsed_args: string[]) {
  if (isWindows === true) {
    const file = process.env['comspec'] || 'cmd.exe';
    if (testWindowsExe('cmd', file) === true) {
      return unparsed_args.map((i) => quoteCmdArg(i));
    }
    if (testWindowsExe('(powershell|pwsh)', file) || file.endsWith('/pwsh')) {
      return unparsed_args.map((i) => quotePwshArg(i));
    }
    return unparsed_args;
  }
  return unparsed_args.map((i) => quotePosixShArg(i));
}

export function setStandaloneArgs(
  unparsed_args: string[],
  shell: boolean
): string[] {
  let parsedArgs = unparsed_args;
  if (shell === true) {
    parsedArgs = parseArgs(unparsed_args);
  }
  return parsedArgs;
}

export const standaloneUseShell = isWindows;

export default standalone();
