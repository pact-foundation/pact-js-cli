# Pact CLI Tools

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


## Questions?

Please search for potential answers or post questions on the [Pact slack channel](https://slack.pact.io/).
