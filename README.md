# Pact CLI

<!-- TOC -->

- [Pact CLI](#pact-cli)
  - [Pact CLI Tools](#pact-cli-tools)
  - [Pact-CLI API](#pact-cli-api)
  - [Installation](#installation)
    - [Do Not Track](#do-not-track)
  - [Which Library/Package should I use?](#which-librarypackage-should-i-use)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Set Log Level](#set-log-level)
    - [Pact Broker Publishing](#pact-broker-publishing)
    - [Pact Broker Deployment Check](#pact-broker-deployment-check)
    - [Mock Servers](#mock-servers)
      - [Create Mock Server](#create-mock-server)
      - [List Mock Servers](#list-mock-servers)
      - [Remove All Mock Servers](#remove-all-mock-servers)
      - [Start a Mock Server](#start-a-mock-server)
      - [Stop a Mock server](#stop-a-mock-server)
      - [Delete a Mock server](#delete-a-mock-server)
      - [Check if a Mock server is running](#check-if-a-mock-server-is-running)
      - [Mock Server Events](#mock-server-events)
    - [Stub Servers](#stub-servers)
      - [Create Stub Server](#create-stub-server)
    - [Message Pacts](#message-pacts)
      - [Create Message Pacts](#create-message-pacts)
        - [Example](#example)
  - [Windows Issues](#windows-issues)
    - [Enable Long Paths](#enable-long-paths)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [Questions?](#questions)

<!-- /TOC -->

## Pact CLI Tools

This package wraps the [Pact Standalone Tools](https://github.com/pact-foundation/pact-ruby-standalone/releases) so that they are available to node scripts in package.json, and linked binaries in the [standard](https://docs.npmjs.com/files/folders#executables) NPM installation directory (e..g. `./node_modules/.bin`).

For example:

```
"scripts": {
  "pactPublish": "pact-broker publish ./pacts --consumer-app-version=$\(git describe\) --broker-base-url=$BROKER_BASE_URL --broker-username=$BROKER_USERNAME --broker-password=BROKER_PASSWORD"`
}
```

Or:

```
 
```sh
# Example can-i-deploy check
./node_modules/.bin/pact-broker can-i-deploy --pacticipant "Banana Service" --broker-base-url https://test.pact.dius.com.au --latest --broker-username dXfltyFMgNOFZAxr8io9wJ37iUpY42M --broker-password O5AIZWxelWbLvqMd8PkAVycBJh2Psyg1

Computer says no ¯\_(ツ)_/¯

CONSUMER       | C.VERSION | PROVIDER       | P.VERSION | SUCCESS?
---------------|-----------|----------------|-----------|---------
Banana Service | 1.0.0     | Fofana Service | 1.0.0     | false

The verification between the latest version of Banana Service (1.0.0) and version 1.0.0 of Fofana Service failed
```

The following are the binaries currently made available:

- `pact-mock-service`
- `pact-broker`
- `pact-stub-service`
- `pact-message`
- `pact-provider-verifier`
- `pact`

## Pact-CLI API

A wrapper for the [Pact](http://pact.io) [CLI Tools](https://github.com/pact-foundation/pact-ruby-standalone).

## Installation

`npm install @pact-foundation/pact-cli --save-dev`

### Do Not Track

In order to get better statistics as to who is using Pact, we have an anonymous tracking event that triggers when Pact installs for the first time. To respect your privacy, anyone can turn it off by simply adding a 'do not track' flag within their package.json file:

```json
{
 "name": "some-project",
 ...
 "config": {
  "pact_do_not_track": true
 },
 ...
}
```

## Which Library/Package should I use?

`pact-js` for core contract testing functionality
`pact-cli` for broker client tools, either standalone or as a JavaScript API.

## Usage

Simply require the library and call the create function to start the mock service

```js
var pact = require("@pact-foundation/pact-cli");
var server = pact.createServer({ port: 9999 });
server.start().then(function() {
 // Do your testing/development here
});
```

Or if you're using Typescript instead of plain old Javascript

```ts
import pact from "@pact-foundation/pact-cli";
const server = pact.createServer({ port: 9999 });
server.start().then(() => {
 // Do your testing/development here
});
```

Or you can also use the CLI

```
$# pact mock --port 9999
```

To see the list commands possible with the CLI, simply ask for help `$# pact --help`

## Documentation

### Set Log Level

```js
var pact = require("@pact-foundation/pact-cli");
pact.logLevel("debug");
```

or you can set it via an environment variable

```
LOG_LEVEL=debug
```

### Pact Broker Publishing

```js
var pact = require('@pact-foundation/pact-cli');
var opts = {
 ...
};

pact.publishPacts(opts).then(function () {
 // do something
});
```

**Options**:

| Parameter            | Required? | Type   | Description                                                         |
| -------------------- | --------- | ------ | ------------------------------------------------------------------- |
| `pactFilesOrDirs`    | true      | array  | Array of local Pact files or directories containing them. Required. |
| `pactBroker`         | true      | string | URL of the Pact Broker to publish pacts to. Required.               |
| `consumerVersion`    | true      | string | A string containing a semver-style version e.g. 1.0.0. Required.    |
| `pactBrokerUsername` | false     | string | Username for Pact Broker basic authentication. Optional             |
| `pactBrokerPassword` | false     | string | Password for Pact Broker basic authentication. Optional             |
| `pactBrokerToken`    | false     | string | Bearer token for Pact Broker authentication. Optional               |
| `tags`               | false     | array  | An array of Strings to tag the Pacts being published. Optional      |
| `branch`               | false     | string  | The branch to associate with the published pacts. Optional but recommended      |
| `autoDetectVersionProperties`               | false     | boolean  | Automatically detect the repository branch from known CI environment variables or git CLI. Supports Buildkite, Circle CI, Travis CI, GitHub Actions, Jenkins, Hudson, AppVeyor, GitLab, CodeShip, Bitbucket and Azure DevOps. Optional      |
| `buildUrl`           | false     | string | The build URL that created the pact. Optional                       |
| `verbose`           |  false  | boolean | Enables verbose output for underlying pact binary. |

### Pact Broker Deployment Check

```js
var pact = require('@pact-foundation/pact-cli');
var opts = {
 ...
};

pact.canDeploy(opts)
 .then(function (result) {
  // You can deploy this
    // If output is not specified or is json, result describes the result of the check.
    // If outout is 'table', it is the human readable string returned by the check
 })
 .catch(function(error) {
  // You can't deploy this
    // if output is not specified, or is json, error will be an object describing
    // the result of the check (if the check failed),
    // if output is 'table', then the error will be a string describing the output from the binary,

    // In both cases, `error` will be an Error object if something went wrong during the check.
 });
```

**Options**:

| Parameter            | Required? | Type        | Description                                                                         |
| -------------------- | --------- | ----------- | ----------------------------------------------------------------------------------- |
| `pacticipants`       | true      | []objects      | An array of version [selectors](docs.pact.io/selectors) in the form `{ name: String, latest?: string | boolean, version?: string }` |
|                      |           |             | specify a tag, use the tagname with latest. Specify one of these per pacticipant    |
|                      |           |             | that you want to deploy                                                             |
| `pactBroker`         | true      | string      | URL of the Pact Broker to query about deployment. Required.                         |
| `pactBrokerUsername` | false     | string      | Username for Pact Broker basic authentication. Optional                             |
| `pactBrokerPassword` | false     | string      | Password for Pact Broker basic authentication. Optional                             |
| `pactBrokerToken`    | false     | string      | Bearer token for Pact Broker authentication. Optional                               |
| `output`             | false     | json,table  | Specify output to show, json or table. Optional, Defaults to json.                  |
| `verbose`            | false     | boolean | Enables verbose output for underlying pact binary.                                          |
| `retryWhileUnknown`  | false     | number      | The number of times to retry while there is an unknown verification result. Optional|
| `retryInterval`      | false     | number      | The time between retries in seconds, use with retryWhileUnknown. Optional           |
| `to`                 | false     | string      | The tag that you want to deploy to (eg, 'prod')                                     |


### Mock Servers

Mock servers are used by Pact to record interactions and create pact contracts.

#### Create Mock Server

```js
var pact = require('@pact-foundation/pact-cli');
var server = pact.createServer({
 ...
});
```

**Options:**

| Parameter           | Required? | Type                               | Description                                                                                                                          |
| ------------------- | --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `port`              | false     | number                             | Port number that the server runs on, defaults to random available port                                                               |
| `host`              | false     | string                             | Host on which to bind the server on, defaults to 'localhost'. Supports '0.0.0.0' to bind on all IPv4 addresses on the local machine. |
| `log`               | false     | string                             | File to log output on relative to current working directory, defaults to none                                                        |
| `logLevel`    | false     | LogLevel (string)       | Log level to pass to the pact core. One of "DEBUG", "ERROR", "WARN", "INFO", can be set by LOG_LEVEL env var |
| `ssl`               | false     | boolean                            | Create a self-signed SSL cert to run the server over HTTPS , defaults to `false`                                                     |
| `sslcert`           | false     | string                             | Path to a custom self-signed SSL cert file, 'ssl' option must be set to true to use this option, defaults to none                    |
| `sslkey`            | false     | string                             | Path a custom key and self-signed SSL cert key file, 'ssl' option must be set to true to use this, defaults to none                  |
| `cors`              | false     | boolean                            | Allow CORS OPTION requests to be accepted, defaults to 'false'                                                                       |
| `dir`               | false     | string                             | Directory to write the pact contracts relative to the current working directory, defaults to none                                    |
| `spec`              | false     | number                             | The pact specification version to use when writing pact contracts, defaults to '1'                                                   |
| `consumer`          | false     | string                             | The name of the consumer to be written to the pact contracts, defaults to none                                                       |
| `provider`          | false     | string                             | The name of the provider to be written to the pact contracts, defaults to none                                                       |
| `pactFileWriteMode` | false     | `overwrite` OR `update` OR `merge` | Control how the pact file is created. Defaults to "overwrite"                                                                        |
| `format`            | false     | `json` OR `xml`                    | Format to write the results as, either in JSON or XML, defaults to JSON                                                              |
| `out`               | false     | string                             | Write output to a file instead of returning it in the promise, defaults to none                                                      |
| `timeout`               | false     | number                             | How long to wait for the mock server to start up (in milliseconds). Defaults to 30000 (30 seconds)                                                      |

#### List Mock Servers

If you ever need to see which servers are currently created.

```js
var pact = require("@pact-foundation/pact-cli");
var servers = pact.listServers();
console.log(JSON.stringify(servers));
```

#### Remove All Mock Servers

Remove all servers once you're done with them in one fell swoop.

```js
var pact = require("@pact-foundation/pact-cli");
pact.removeAllServers();
```

#### Start a Mock Server

Start the current server.

```js
var pact = require("@pact-foundation/pact-cli");
pact.createServer()
 .start()
 .then(function() {
  // Do something after it started
 });
```

#### Stop a Mock server

Stop the current server.

```js
var pact = require("@pact-foundation/pact-cli");
pact.createServer()
 .stop()
 .then(function() {
  // Do something after it stopped
 });
```

#### Delete a Mock server

Stop the current server and deletes it from the list.

```js
var pact = require("@pact-foundation/pact-cli");
pact.createServer()
 .delete()
 .then(function() {
  // Do something after it was killed
 });
```

#### Check if a Mock server is running

```js
var pact = require("@pact-foundation/pact-cli");
pact.createServer().running;
```

#### Mock Server Events

There's 3 different events available, 'start', 'stop' and 'delete'. They can be listened to the same way as an [EventEmitter](https://nodejs.org/api/events.html).

```js
var pact = require("@pact-foundation/pact-cli");
var server = pact.createServer();
server.on("start", function() {
 console.log("started");
});
server.on("stop", function() {
 console.log("stopped");
});
server.on("delete", function() {
 console.log("deleted");
});
```

### Stub Servers

Stub servers create runnable APIs from existing pact files.

The interface is comparable to the Mock Server API.

#### Create Stub Server

```js
var pact = require('@pact-foundation/pact-cli');
var server = pact.createStub({
 ...
});
```

**Options**:

| Parameter | Required? | Type    | Description                                                                                                                          |
| --------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| pactUrls  | true      | array   | List of local Pact files to create the stub service from                                                                             |
| port      | false     | number  | Port number that the server runs on, defaults to random available port                                                               |
| host      | false     | string  | Host on which to bind the server on, defaults to 'localhost'. Supports '0.0.0.0' to bind on all IPv4 addresses on the local machine. |
| log       | false     | string  | File to log output on relative to current working directory, defaults to none                                                        |
| logLevel    | false     | LogLevel (string)       | Log level to pass to the pact core. One of "DEBUG", "ERROR", "WARN", "INFO", can be set by LOG_LEVEL env var |
| ssl       | false     | boolean | Create a self-signed SSL cert to run the server over HTTPS , defaults to 'false'                                                     |
| sslcert   | false     | string  | Path to a custom self-signed SSL cert file, 'ssl' option must be set to true to use this option. Defaults false                      | to none |
| sslkey    | false     | string  | Path a custom key and self-signed SSL cert key file, 'ssl' option must be set to true to use this option false. Defaults to none     |
| cors      | false     | boolean | Allow CORS OPTION requests to be accepted, defaults to 'false'                                                                       |
| timeout               | false     | number                             | How long to wait for the stub server to start up (in milliseconds). Defaults to 30000 (30 seconds)                                                      |

### Message Pacts

#### Create Message Pacts

```js
var pact = require('@pact-foundation/pact-cli');
var message = pact.createMessage({
 ...
});
```

**Options**:

| Parameter           | Required? | Type                               | Description                                                                                       |
| ------------------- | --------- | ---------------------------------- | ------------------------------------------------------------------------------------------------- |
| `dir`               | true      | string                             | Directory to write the pact contracts relative to the current working directory, defaults to none |
| `consumer`          | true      | string                             | The name of the consumer to be written to the pact contracts, defaults to none                    |
| `provider`          | true      | string                             | The name of the provider to be written to the pact contracts, defaults to none                    |
| `pactFileWriteMode` | false     | `"overwrite" | "update" | "merge"` | Control how the pact file is created. Defaults to "update"                                        |

##### Example

```js
const messageFactory = messageFactory({
 consumer: "consumer",
 provider: "provider",
 dir: dirname(`${__filename}/pacts`),
 content: `{
  "description": "a test mesage",
  "content": {
   "name": "Mary"
  }
 }`
});

messageFactory.createMessage();
```


## Windows Issues

### Enable Long Paths

[Windows has a default path length limit of 260](https://docs.microsoft.com/en-us/windows/desktop/fileio/naming-a-file#maximum-path-length-limitation) causing issues with projects that are nested deep inside several directory and with how npm handles node_modules directory structures.  To fix this issue, please enable Windows Long Paths in the registry by running `regedit.exe`, find the key `HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\FileSystem\LongPathsEnabled` and change the value from `0` to `1`, then reboot your computer.  Pact should now work as it should, if not, please [raise an issue on github](https://github.com/pact-foundation/pact-cli/issues).

## Contributing

To develop this project, simply install the dependencies with `npm install --ignore-scripts`, and run `npm run watch` to for continual development, linting and testing when a source file changes.

## Testing

Running `npm test` will execute the tests that has the `*.spec.js` pattern.

## Questions?

Please search for potential answers or post question on our [official Pact StackOverflow](https://stackoverflow.com/questions/tagged/pact).
