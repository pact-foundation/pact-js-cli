# Migration guide

Helps document major breaking changes in the Pact ecosystem, and how to migrate to the latest versions.

## Pact-core migration guide

@pact-foundation/pact-core imports will now become @pact-foundation/pact-cli

## Pact CLI changes

## V17

No longer packages [pact-standalone](https://github.com/pact-foundation/pact-standalone) ruby binaries, and instead replaced with the combined [pact-cli](https://github.com/pact-foundation/pact-cli) single binary.

- Remove Full API surface
  - publish
  - canDeploy
  - mock (server)
  - stub
  - message

- Bin Stub changes
  - `pact` which contains entry point to all embedded binaries (stub|mock|verifier|plugin|broker)
  - `pact-mock-service` becomes `pact-mock-server` or `pact mock`
  - `pact-provider-verifier` becomes `pact-verifier` or `pact verifier`
  - `pact-message` is removed
