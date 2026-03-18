# Pact CLI

<!-- TOC -->

- [Pact CLI](#pact-cli)
  - [Pact CLI Tools](#pact-cli-tools)
  - [Installation](#installation)
    - [Do Not Track](#do-not-track)
  - [Which Library/Package should I use?](#which-librarypackage-should-i-use)
  - [Contributing](#contributing)
  - [Testing](#testing)
  - [Questions?](#questions)

<!-- /TOC -->

## Pact CLI Tools

This package wraps the [Pact CLI Tools](https://github.com/pact-foundation/pact-cli/releases) so that they are available to node scripts in package.json, and linked binaries in the [standard](https://docs.npmjs.com/files/folders#executables) NPM installation directory (e..g. `./node_modules/.bin`).

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

- `pact` (top level cli)
- `pact-broker`
- `pact-mock-server`
- `pact-verifier`
- `pact-stub-server`
- `pact-plugin`
- `pactflow`

## Installation

`npm install @pact-foundation/pact-cli --save-dev`

### Do Not Track

In order to get better statistics as to who is using Pact, we have an anonymous tracking event that triggers when Pact installs for the first time. To respect your privacy, anyone can turn it off by simply adding a 'PACT_DO_NOT_TRACK' environment variable in their shell

## Which Library/Package should I use?

`pact-js` for core contract testing functionality
`pact-cli` for broker client, stub and verifier standalone tools

## Contributing

To develop this project, simply install the dependencies with `npm install --ignore-scripts`, and run `npm run watch` to for continual development, linting and testing when a source file changes.

## Testing

Running `npm test` will execute the tests that has the `*.spec.js` pattern.

## Questions?

Please search for potential answers or post question on our [official Pact StackOverflow](https://stackoverflow.com/questions/tagged/pact).
