# Changelog

All notable changes to this project will be documented in this file. See [commit-and-tag-version](https://github.com/absolute-version/commit-and-tag-version) for commit guidelines.

## 15.0.0 (2024-06-12)


### ⚠ BREAKING CHANGES

* remove ia32 cpu type
* lock engines to node 16 or greater
* Remove everything except for the CLI binstubs
* setLogLevel no longer accepts or returns a `number`
* The verbose option has been removed, as it is now implied by `logLevel` of `DEBUG` or `TRACE`
* All logging and reporting is now on standard out. This was the default before. This means the logDir / format / out options are no longer supported. If your ecosystem needs the ability to customise logging and reporting, please let us know by opening an issue.
* The undocumented option monkeypatch has been removed. The use cases for this feature are mostly covered by other options.
* customProviderHeaders has been removed. Please see the request [filter documentation](https://github.com/pact-foundation/pact-js#modify-requests-prior-to-verification-request-filters) in pact-js.
* All the interfaces that previously returned `q.Promise` have now been replaced with native es6 `Promise`s. Calling code will need to be updated.
* All options deprecated in previous versions have been removed. Migration instructions:

* In `VerifierOptions`: replace use of `tags`, `consumerVersionTag` and `providerVersionTag` with the appropriate `consumerVersionTags` or `providerVersionTags` option.

* The following classes have had their `.create(options)` removed. Please use the appropriate constructor instead (for example, `new Verifier(options)`)
    * `Verifier`
    * `Publisher`
    * `Server`
    * `Stub`
* **docs:** The type for consumer version selectors in the verifier has been corrected. This will affect typescript users who were using consumerVersionSelectors with the fields `pacticipant`, `all` or `version`. These fields never worked, and now will no longer compile in typescript. The correct type is:

```
ConsumerVersionSelector {
  tag?: string;
  latest?: boolean;
  consumer?: string;
  fallbackTag?: string;
}
```

Note that `pacticipant`, `version` and `all` have been removed. Existing code that uses `pacticipant` needs to use `consumer` instead. The other fields can be dropped. Any questions, please reach out to us at https://slack.pact.io/
* fix https://github.com/pact-foundation/pact-js-core/issues/285
* **can-i-deploy:** Options for CanDeploy have changed. Now, pacticipants are specified by an array of { name: <string>, latest?: <string | boolean>, version?: <string> }, allowing more than one pacticipant to be specified. You must specify one of latest
or version. If latest is `true`, the latest pact is used. If it is string, then the latest pact with that tag is used.
* **CanDeploy:** CanDeploy now defaults to json output (and returns the parsed object as the result of the promise. If you were using CanDeploy and relied on parsing the logged output, you will need to explicitly set `output: table` in your CanDeploy options.
* **verifier:** removal of Broker class

* Add migration docs and update readme ([e589c01](https://github.com/pact-foundation/pact-js-cli/commit/e589c01116f3a6cf6c6b1a65e2ba31e2e3e2d00e))
* **docs:** Add description of consumer version selectors to the documentation. ([1bdb45d](https://github.com/pact-foundation/pact-js-cli/commit/1bdb45dfb82bfb2dcf4a01f88f2f2206681e3913))


### Features

* Add a beta interface to the FFI / V3 Consumer tests. Try it out with `import { makeConsumerPact } from 'pact-core/src/consumer'` ([46d6667](https://github.com/pact-foundation/pact-js-cli/commit/46d6667b58abacc007a4c1736d8c2f861ec5a487))
* add additional FFI methods to support plugins ([246e86f](https://github.com/pact-foundation/pact-js-cli/commit/246e86f8f41a2228ec656425447e28c6e4227433))
* Add buildUrl option to Pact Broker Publishing API ([58be64a](https://github.com/pact-foundation/pact-js-cli/commit/58be64a20d0ebc203e36f489580b77e6e583bea6))
* add consumer version selectors and pending pacts to verification ([59ab437](https://github.com/pact-foundation/pact-js-cli/commit/59ab437b1155b26b6e25744a9defd507fd80fc70))
* Add Linux/arm64 support ([a174d7b](https://github.com/pact-foundation/pact-js-cli/commit/a174d7b89105043b21522e56efa1a35f8c8222c4))
* Add new branch consumerVersionSelector options to verifier ([c3872be](https://github.com/pact-foundation/pact-js-cli/commit/c3872be506d96f1ec40bfeb273b0ffc0ae6400e2))
* add plugin consumer native methods ([aeef054](https://github.com/pact-foundation/pact-js-cli/commit/aeef0545d558485dffb29a2621649d393be12dd2))
* add plugin to consumer interfaces ([ea0f536](https://github.com/pact-foundation/pact-js-cli/commit/ea0f5367a5ec909ccdfcb930f47ee4d867190784))
* add provider version tag during verification ([68b17d8](https://github.com/pact-foundation/pact-js-cli/commit/68b17d819d848d9c44448b17cd1d687b584f9107))
* add test for protobufs/plugin ([6bf78d8](https://github.com/pact-foundation/pact-js-cli/commit/6bf78d89d1cd4ec6e41daaed73bf19b037a0d0e7))
* add validation to broker token usage to avoid confusion ([2a4afa3](https://github.com/pact-foundation/pact-js-cli/commit/2a4afa310e413c84cf670efe81400e4828aa0d1b))
* **api:** add removeAll() interface to main API ([9306183](https://github.com/pact-foundation/pact-js-cli/commit/9306183d7d639cd895f5c0d6c5698f222bcf596a))
* **api:** narrow scope of removeAll to AbstractService. See [#65](https://github.com/pact-foundation/pact-js-cli/issues/65) ([d243135](https://github.com/pact-foundation/pact-js-cli/commit/d243135013c3c30ae144177d465e25428a52de1c))
* **binstubs:** expose pact standalone binaries as alternative CLI ([02f16cc](https://github.com/pact-foundation/pact-js-cli/commit/02f16cca8f9f2275744e24f810c7e576bbbde77a))
* **binstubs:** expose pact standalone binaries as alternative CLI ([5c164da](https://github.com/pact-foundation/pact-js-cli/commit/5c164da0cd5f668788e827d2c87c817f4801304f))
* **build:** reduce the number of versions the build will run on the matrix ([114505a](https://github.com/pact-foundation/pact-js-cli/commit/114505abe89797bd0eb093ed65b6fcb04f2ad524))
* **build:** remove node v5 from appveyor build matrix ([cc7c88a](https://github.com/pact-foundation/pact-js-cli/commit/cc7c88a5e969de693d5fea9c0ceaf76cb153544f))
* bump native version to 0.1.6 ([d59d1a6](https://github.com/pact-foundation/pact-js-cli/commit/d59d1a6cb155acb3e831a9754cc6afee0a00a780))
* **can-deploy:** add broker token to can-deploy task ([#158](https://github.com/pact-foundation/pact-js-cli/issues/158)) ([fad1e63](https://github.com/pact-foundation/pact-js-cli/commit/fad1e633a501bd4dbc819339544ca614b6362720))
* **can-i-deploy:** add can-i-deploy to API ([10e2ff1](https://github.com/pact-foundation/pact-js-cli/commit/10e2ff1d452350ae18ec87e4c447a88ee026297b))
* **can-i-deploy:** Add custom error type CannotDeployError for when the deploy check fails ([635b449](https://github.com/pact-foundation/pact-js-cli/commit/635b44953cb014b7bef99f3a61e55aa93290a4e0))
* **can-i-deploy:** allow multiple pacticipants to be specified to CanDeploy ([b4b3921](https://github.com/pact-foundation/pact-js-cli/commit/b4b3921ff9d592adb41834e59ffdcc50e16108e6))
* **can-i-deploy:** Merging can-i-deploy branch, doing a few extra fixes along the way ([81fda80](https://github.com/pact-foundation/pact-js-cli/commit/81fda80f95b7e95eb9f984dda5bcf9f2568729b8))
* **canDeploy:** resolve with output on success ([d20744e](https://github.com/pact-foundation/pact-js-cli/commit/d20744ef5f51f0bc4001d2e25d1a621df4f27233))
* **CanDeploy:** Set json output as the default for CanDeploy ([200abe7](https://github.com/pact-foundation/pact-js-cli/commit/200abe7e812ba566f1ead56968d8419fec5ce3c1))
* collect usage telemetry data ([f97e114](https://github.com/pact-foundation/pact-js-cli/commit/f97e1149d0612574374f70e9b0a1857149abbf69))
* **custom-headers:** allow user to specify custom headers during provider verification ([3797193](https://github.com/pact-foundation/pact-js-cli/commit/3797193dd462548d759214ba2f3112f6d92408b1))
* deprecate consumerVersionTag and providerVersionTag. Fixes [#218](https://github.com/pact-foundation/pact-js-cli/issues/218) ([3e932bd](https://github.com/pact-foundation/pact-js-cli/commit/3e932bd7c80a468a68dff21d7e4457732b5af234))
* **discovery:** automatic discovery of pacts by provider (and tags) ([d8531fb](https://github.com/pact-foundation/pact-js-cli/commit/d8531fb2754eb366bde11e126e4611b1bb34222e))
* expose faiIfNoPactsFound on the VerifierOptions ([72eeb08](https://github.com/pact-foundation/pact-js-cli/commit/72eeb08ab50f64364e5fba38d5d18a5b3e9e5489))
* expose pactflow pact-ruby-standalone command ([d9f9fc7](https://github.com/pact-foundation/pact-js-cli/commit/d9f9fc7508f5c2dbcb61f6ed0c32e7acb1d4bd9e))
* improve m1 support (via rosetta2) ([92bd98b](https://github.com/pact-foundation/pact-js-cli/commit/92bd98b15e55c1ba603355fa9d0d57c3ce3fdd23))
* include arm64 binaries ([75f46ef](https://github.com/pact-foundation/pact-js-cli/commit/75f46eff64d8d76aa719ec92b621ea0b4c0e2ee3))
* include standalone binaries in released package ([eedeb18](https://github.com/pact-foundation/pact-js-cli/commit/eedeb187ad0d0fd4bdae72af0dc01dd21d09488a))
* **install:** Binary install can be skipped by setting PACT_SKIP_BINARY_INSTALL=true ([4d6b194](https://github.com/pact-foundation/pact-js-cli/commit/4d6b1945a58efa2b56b9b39dd3214e29c1637228))
* introduce pact binary, and remove pact-cli (BREAKING CHANGE) ([884ce24](https://github.com/pact-foundation/pact-js-cli/commit/884ce24afb7c24b1fa19004faef0567e0ff7a42c))
* **logging:** Add logLevel to Stub options, and add logDir and logLevel to Verifier options ([acc0579](https://github.com/pact-foundation/pact-js-cli/commit/acc057927e14a80dfa74554614f9a6d1fa29a005))
* **logLevel:** updating standalone to 1.47.0, adding interface for logLevel of mock server, adding tests around it, adding download retry for postinstall ([3580892](https://github.com/pact-foundation/pact-js-cli/commit/35808926a992fb760fbbb510b89a58703969ea70))
* message pact interface ([76baab8](https://github.com/pact-foundation/pact-js-cli/commit/76baab873fad0d9fd6f8cfdb7fe1667441fc1454))
* **message:** add spec version to message type ([7839a12](https://github.com/pact-foundation/pact-js-cli/commit/7839a12a094827558615ed21675c4e62775e8b52))
* **messages:** add Message Pact support ([980a3f5](https://github.com/pact-foundation/pact-js-cli/commit/980a3f5a169e063356971b7281589aa8212ffdab))
* new content mismatch types for plugins ([7cebccd](https://github.com/pact-foundation/pact-js-cli/commit/7cebccdd412262011ae8fa33fbe1a0c26c65f10d))
* **open-collective:** begging for money on postinstall with opencollective link ([#87](https://github.com/pact-foundation/pact-js-cli/issues/87)) ([35da569](https://github.com/pact-foundation/pact-js-cli/commit/35da5697dc8c0beffaaf65f1a0942b41ccb6eff4))
* **package-name:** Pact-node renamed to pact-core ([700ad09](https://github.com/pact-foundation/pact-js-cli/commit/700ad099cebafdb5189e4cb8c09ed0131f24afc4))
* **pact-binary:** Updating pact binary to latest, 1.61.1 ([cf22e6d](https://github.com/pact-foundation/pact-js-cli/commit/cf22e6de5289fdd93809653eeb63e76fc6af57c4))
* **pactFileWriteMode:** add pactFileWriteMode to server. Fixes [#50](https://github.com/pact-foundation/pact-js-cli/issues/50) ([0f8658b](https://github.com/pact-foundation/pact-js-cli/commit/0f8658b3e2de2b25db927982ac23ffb41a777d09))
* **publish:** add bearer token to publish ([3a411b4](https://github.com/pact-foundation/pact-js-cli/commit/3a411b4c76c5b5c5042d41641f00ba60efeef54f))
* **relative-paths:** Allow relative paths for all paths used in CLI/API ([#85](https://github.com/pact-foundation/pact-js-cli/issues/85)) ([ac40613](https://github.com/pact-foundation/pact-js-cli/commit/ac4061326c48c6d014cd527b58df0628e5a78204))
* Revert the consumer changes until the issues with node 14 are fixed (the release notes about the V3 consumer support in this release are not true, sorry) ([dc5217d](https://github.com/pact-foundation/pact-js-cli/commit/dc5217da5bbee79024439526fdfc72da279d01ec))
* **service:** use 'service' command in mock service ([aeaac3d](https://github.com/pact-foundation/pact-js-cli/commit/aeaac3da345bca35df64cda3e52f9089e5c6723d)), closes [/github.com/pact-foundation/pact-js/issues/91#issuecomment-331441084](https://github.com/pact-foundation//github.com/pact-foundation/pact-js/issues/91/issues/issuecomment-331441084)
* **ssl:** allow users to specify custom ssl cert/key ([6e935ec](https://github.com/pact-foundation/pact-js-cli/commit/6e935ec7f41646775fe0df80cab6f00b1e4fae39))
* **standalone:** add pact standalone to TS implementation ([2b89924](https://github.com/pact-foundation/pact-js-cli/commit/2b89924ea3483677c3db1eb49adb034feea4deac))
* **standalone:** Merging pact standalone into pact-node to make upgrading easier ([#76](https://github.com/pact-foundation/pact-js-cli/issues/76)) ([2f20b78](https://github.com/pact-foundation/pact-js-cli/commit/2f20b783d9a12f0a94b220d7d0a151a20314a3df))
* **stub:** add basic stub support ([62185b5](https://github.com/pact-foundation/pact-js-cli/commit/62185b504bcf567291ed96da80bb7b369cd5cf2e))
* support branch/autoDetectVersionProperties when publishing pacts ([64ab2ea](https://github.com/pact-foundation/pact-js-cli/commit/64ab2ea110ea78315fb4609ad92a5fb90e96ddc7))
* support custom provider headers in verification ([d63e1a9](https://github.com/pact-foundation/pact-js-cli/commit/d63e1a90975434416985d8d9046a2c633dc9f130))
* support HTTP + non-HTTP in ConsumerPact ([56786f2](https://github.com/pact-foundation/pact-js-cli/commit/56786f2f300821868f98086e1cd2ac6ee3e8180b))
* support PACT_BROKER_PUBLISH_VERIFICATION_RESULTS ([64872ae](https://github.com/pact-foundation/pact-js-cli/commit/64872ae7a82193d785e378942dacae96e5deca34))
* The new verifier now works on windows too ([#316](https://github.com/pact-foundation/pact-js-cli/issues/316)) ([072e080](https://github.com/pact-foundation/pact-js-cli/commit/072e080fcec01bfb07747f152e4d93f47cddb33d))
* **types:** add support for TS 'strictNullChecks' ([76d8c38](https://github.com/pact-foundation/pact-js-cli/commit/76d8c38d804466afafa6d759cfa1a11d9de1ffc0))
* **types:** add TS declarations to package.json. Fixes [#52](https://github.com/pact-foundation/pact-js-cli/issues/52) ([ef1d9d6](https://github.com/pact-foundation/pact-js-cli/commit/ef1d9d6ba8436ae0038738107dd7124e601f6e47))
* **types:** feedback from mboudreau ([e756592](https://github.com/pact-foundation/pact-js-cli/commit/e75659246dbb9add5b874a7c27ec3922d85ffcab))
* **types:** re-export out common types for library use ([fa19b57](https://github.com/pact-foundation/pact-js-cli/commit/fa19b57cf48451651b57e8c87f8e28dbdeac2c33))
* **types:** uplift code base to comply with noImplicitAny ([861ae89](https://github.com/pact-foundation/pact-js-cli/commit/861ae8958481b6144d7a594866167eb60438593c))
* **upgrade:** update standalone to 1.79.0 ([f33cbb8](https://github.com/pact-foundation/pact-js-cli/commit/f33cbb8e960e34f7f114821061cff701049beac8))
* **upgrade:** update standalone to 1.80.1 ([1a2f517](https://github.com/pact-foundation/pact-js-cli/commit/1a2f517117e6d84a6ea907343a9705fff3c96864))
* **upgrade:** update standalone to 1.81.0 ([21a1564](https://github.com/pact-foundation/pact-js-cli/commit/21a1564110726bd9bdf17b734e18eb1fb08223b4))
* **upgrade:** update standalone to 1.82.0 ([92c3af3](https://github.com/pact-foundation/pact-js-cli/commit/92c3af3bb158544ee921a8d0737197c0dd607ba6))
* **upgrade:** upgrade pact standalone to 3.4.0 ([a77f9f7](https://github.com/pact-foundation/pact-js-cli/commit/a77f9f76bf8399b0e3f4d89ea9f3485b91790212))
* **upgrade:** upgrade pact standalone to 3.5.0 ([82928f1](https://github.com/pact-foundation/pact-js-cli/commit/82928f1dcac987c8b42c590f6f8c46374526340b))
* **upgrade:** upgrade pact standalone to 3.6.0 ([0aa6f8f](https://github.com/pact-foundation/pact-js-cli/commit/0aa6f8f21cfcf0c6ddcd0175c8bf77e53ce2a005))
* **upgrade:** upgrade pact standalone to 3.7.0 ([3b59836](https://github.com/pact-foundation/pact-js-cli/commit/3b59836a370a7540cea09974a42995e07fd76c9f))
* **upgrade:** upgrade to latest verifier 1.1.0 ([2df296e](https://github.com/pact-foundation/pact-js-cli/commit/2df296e9fd15eddc7e2e63792ac373b0e36f4bc9))
* Use the native ffi bindings for the Verifier instead of the ruby bindings ([119c3ce](https://github.com/pact-foundation/pact-js-cli/commit/119c3ce764392070d255f04959333100f07f6be2))
* **verifications:** allow verify() to pull from a broker ([cf13653](https://github.com/pact-foundation/pact-js-cli/commit/cf136533fc44aeb552ca34feee03ac3aff9cd993))
* **verifications:** implement feedback from PR [#36](https://github.com/pact-foundation/pact-js-cli/issues/36) ([b2b9f1f](https://github.com/pact-foundation/pact-js-cli/commit/b2b9f1fa10898cbf204c5a7ca4aed8c9799f778e))
* **verifications:** publish verifications to broker ([c9fb1f9](https://github.com/pact-foundation/pact-js-cli/commit/c9fb1f9ef33a1c62444fe29a1dd5e83f39c97264))
* **verifier:** Add support for includeWipPactsSince ([c691162](https://github.com/pact-foundation/pact-js-cli/commit/c6911620695435b5e47c22bc0d526ca559e5a356))
* **verifier:** Add verbose option to improve debugging during verification ([3f0a5a3](https://github.com/pact-foundation/pact-js-cli/commit/3f0a5a344b0886423d7995605134430f61b52ae4))
* **verifier:** update to latest verifier ([9f328db](https://github.com/pact-foundation/pact-js-cli/commit/9f328db0a722fdf2e2c9ef7d48001982c2eecad6))
* **verifier:** update to latest verifier ([da3d1e3](https://github.com/pact-foundation/pact-js-cli/commit/da3d1e38acd9485f6841fe24d1dc8dea99923ef2))
* **verifier:** update to latest verifier ([8637cae](https://github.com/pact-foundation/pact-js-cli/commit/8637cae6f3cb2e8bb31e57aa23e0e7fd65bb503d))
* **verifier:** update to latest verifier ([888209b](https://github.com/pact-foundation/pact-js-cli/commit/888209b781a5db2615a6b77783f26115596c287f))
* **verify:** support broker bearer token ([f060b78](https://github.com/pact-foundation/pact-js-cli/commit/f060b783bc1acaae9f00493095322a7effda195f))


### Fixes and Improvements

* .snyk, package.json & package-lock.json to reduce vulnerabilities ([31e34a1](https://github.com/pact-foundation/pact-js-cli/commit/31e34a1e8d9ea5fe03c554f6fc6c01b7a0ba183e))
* 🐛 only download binary if PACT_SKIP_BINARY_INSTALL is true ([69cbba0](https://github.com/pact-foundation/pact-js-cli/commit/69cbba0f4800da79e01d594e5b1e0c3556c09551))
* Add consumer version selectors for deployedOrReleased, deployed, released and environment ([#715](https://github.com/pact-foundation/pact-js-cli/issues/715)) ([1bf3b22](https://github.com/pact-foundation/pact-js-cli/commit/1bf3b225da0006ddfca61bd5773df2758f4b249a))
* add disableSslVerification option to verifier ([f354d8a](https://github.com/pact-foundation/pact-js-cli/commit/f354d8a2052ef52ed2066bffcc18b3e022ca44d0))
* Add error messages to the ignored option debug logs ([8c8386d](https://github.com/pact-foundation/pact-js-cli/commit/8c8386ddc356f279f3f7b3c503b403bf9f3b912a))
* Allow the user to specify the timeout (Fixes [#298](https://github.com/pact-foundation/pact-js-cli/issues/298)) ([4c77ddb](https://github.com/pact-foundation/pact-js-cli/commit/4c77ddb7071672050fd682e27992b37cb0682bb6))
* **appveyor:** need to force npm cache clean because npm doesn't seem to like it without force ([b2439f0](https://github.com/pact-foundation/pact-js-cli/commit/b2439f0d3034a59adf8a9aa88310b50745e86045))
* **appveyor:** Trying to fix the horribleness of Window file locking on NPM install ([242155d](https://github.com/pact-foundation/pact-js-cli/commit/242155df627515c75e99fd79a749afd4c973eb38))
* Avoid throwing an exception if needle can't connect to the mock service during polling (may fix [#314](https://github.com/pact-foundation/pact-js-cli/issues/314)) ([74a2cde](https://github.com/pact-foundation/pact-js-cli/commit/74a2cde1a48566fb7ccf8ed91e5b1902e8715c32))
* **binary-location-config:** Fixing install configuration to be more robust to refactoring, adding tests around configuration of package.json file to prevent regression ([ee7ed28](https://github.com/pact-foundation/pact-js-cli/commit/ee7ed28ff152e89a849e034d129e3d9a2c6fb878))
* **binary-location:** Fixing failing tests on windows because the path.resolve would add 'C:\' to the front of the path, failing the expectation ([40f4d6d](https://github.com/pact-foundation/pact-js-cli/commit/40f4d6d409660ed8ad0db27c9abcbb7961665dd3))
* bump dependencies to fix a possible issue with a misbehaving pino ([fe09e4e](https://github.com/pact-foundation/pact-js-cli/commit/fe09e4e1206eb38dd40fc15c472b2e6c491a8095))
* Bump version of libpact_ffi to 0.0.2 ([490249c](https://github.com/pact-foundation/pact-js-cli/commit/490249caceaf65659c629d7c42590ff46fa97115))
* Bump version of Pact FFI to 0.0.3 ([bc74026](https://github.com/pact-foundation/pact-js-cli/commit/bc7402677c6436fbbaf560f094e1259d58e49f4c))
* **can-i-deploy:** Can-i-deploy now prints a warning instead of failing if additional output is produced alongside the json ([364afb2](https://github.com/pact-foundation/pact-js-cli/commit/364afb2cdb9ffab6e3dd6312c3854439c172c3cb))
* **can-i-deploy:** Fixing argument mapping ([6d42ed5](https://github.com/pact-foundation/pact-js-cli/commit/6d42ed533421bbcec3cae56d944d4fcca10adea9))
* **can-i-deploy:** fixing argument mapping in can I deploy for good ([22ead4d](https://github.com/pact-foundation/pact-js-cli/commit/22ead4dc185ec5a5664f81d6b45057f7f2ce3e9a))
* **can-i-deploy:** Fixing can-i-deploy to only have a single participant at a time, but breaking API.  New major release. ([#144](https://github.com/pact-foundation/pact-js-cli/issues/144)) ([2032ba2](https://github.com/pact-foundation/pact-js-cli/commit/2032ba2b46bad3dace397ba3a5938c64a39d4d16))
* Cleanup interface for spawn package ([8cf6c50](https://github.com/pact-foundation/pact-js-cli/commit/8cf6c508f9d72b99ad122a3a9deaeb75dafe991c))
* **cli:** propagate exit code in node CLI wrapper ([b961b79](https://github.com/pact-foundation/pact-js-cli/commit/b961b79d828de6b7022bd00d67d000cdce83b147))
* **cmd:** quote command line invocation arguments, fixes [#22](https://github.com/pact-foundation/pact-js-cli/issues/22) ([40fa2e1](https://github.com/pact-foundation/pact-js-cli/commit/40fa2e13e93a3011ab2c768bb06b3000372bfe6c))
* **consumerVersion:** removing pact-cli requirement for semantic versioning for --consumer-version ([795b31b](https://github.com/pact-foundation/pact-js-cli/commit/795b31bfb28c9cf984a2d58ae00f08502fbed8a9))
* consumerVersionSelector -> consumerVersionSelectors ([dab9507](https://github.com/pact-foundation/pact-js-cli/commit/dab9507aae9acf00296933e5e0938e9a07cbbbf9))
* ConsumerVersionSelector interface ([b1e5afe](https://github.com/pact-foundation/pact-js-cli/commit/b1e5afeea5a6f5ad6265a0a08bf4c4976a99e6dc))
* correct arguments for source with selectors ([dd7ef00](https://github.com/pact-foundation/pact-js-cli/commit/dd7ef007eb2b68083d39020d7c92058fce692cf8))
* correct binary matching behaviour ([5794c74](https://github.com/pact-foundation/pact-js-cli/commit/5794c74366ea57b101f6bfa4fd21c843b36b69cb))
* Correct exposed log levels to 'debug' | 'error' | 'info' | 'trace' | 'warn'. ([4a6f573](https://github.com/pact-foundation/pact-js-cli/commit/4a6f5737f9b6d568e6f97273e41299caaa0105de))
* correct ffi library name on windows ([814ed9c](https://github.com/pact-foundation/pact-js-cli/commit/814ed9c0f8e030555a2a47f2f9f89299ccf4cdca))
* Correct the config for using custom ca file ([e83c895](https://github.com/pact-foundation/pact-js-cli/commit/e83c8958a34d46d63403fe56402fd5b8d4d6a3c0))
* Correct typo in verifier options mapping ([810bd77](https://github.com/pact-foundation/pact-js-cli/commit/810bd7790f3b395283f6ce4ca7f596082a599063))
* correcting the cafile setup for postinstall download ([a07e882](https://github.com/pact-foundation/pact-js-cli/commit/a07e8824d6b5113cbddb4f1767b29020801de407))
* corrects customProviderHeaders validation (pact-foundation/pact-js-core[#392](https://github.com/pact-foundation/pact-js-cli/issues/392)) ([#393](https://github.com/pact-foundation/pact-js-cli/issues/393)) ([f77dd65](https://github.com/pact-foundation/pact-js-cli/commit/f77dd654a5546705f1b0b859f18eaa04879a3915))
* delete old/unused c code ([fe3e3f1](https://github.com/pact-foundation/pact-js-cli/commit/fe3e3f1830664050bc4f7fc4ae5db727b103c5b2))
* **deps:** update package and package-lock to fix vulnerabilties ([6566680](https://github.com/pact-foundation/pact-js-cli/commit/65666805766e9ae71377351dcbb62b5098e0191c))
* **deps:** Update vulnerable dependencies ([239c7a7](https://github.com/pact-foundation/pact-js-cli/commit/239c7a73c3d04289c038bbef70b3d47a1db34d56))
* **deps:** Update vulnerable dependencies ([d210c1b](https://github.com/pact-foundation/pact-js-cli/commit/d210c1bcd3725f617c531b4338054cf1dabbb68a))
* **deps:** Update vulnerable dependencies ([3c20366](https://github.com/pact-foundation/pact-js-cli/commit/3c203660e157deb0380535fec870de1500a2da0c))
* Don't create logger on each log call, so that frameworks that check for imports after teardown (jest) don't throw errors deep inside pino ([c5cf077](https://github.com/pact-foundation/pact-js-cli/commit/c5cf07796a564fd1d70cafcd6d705d8b3e81a3f7))
* download cpp header and c header ([bbc2321](https://github.com/pact-foundation/pact-js-cli/commit/bbc2321c9eae77a543d132c9d39509df11f7b142))
* error if file source is invalid ([f1ad86a](https://github.com/pact-foundation/pact-js-cli/commit/f1ad86ad5d139ecd6381a5f19d0991139b5e110b))
* Expose logger as a base level export ([5686a66](https://github.com/pact-foundation/pact-js-cli/commit/5686a66a8c4906b0146f31456bd9afee56de8c80))
* expose needle types as a dependency to fix TS ([e8ad281](https://github.com/pact-foundation/pact-js-cli/commit/e8ad281839c4f888507d08c8c2e55825c4ec33e6))
* Fix an issue that caused ENOENT on some platforms ([943484a](https://github.com/pact-foundation/pact-js-cli/commit/943484a6feb8d015f95e8394b82d7f4a07a085f8))
* Further cleanup code locations and naming ([a9f8cb1](https://github.com/pact-foundation/pact-js-cli/commit/a9f8cb1b3fc848ad1ec2034650905041de15d95f))
* **install:** Correctly skip downloading the binary archive if it already exists ([1c9a809](https://github.com/pact-foundation/pact-js-cli/commit/1c9a8094baa3f60fd928ff00cfe155fa4c3c9d8e))
* **install:** Fail installation if binary was not successfully downloaded ([3dfb033](https://github.com/pact-foundation/pact-js-cli/commit/3dfb0334e48ffbcbc0b2b6b9370f0356096c8e66))
* **install:** ignoring all errors that might happen from tracking downloads ([70c485a](https://github.com/pact-foundation/pact-js-cli/commit/70c485adf3b08439595ba1324c3c07136094f21d))
* **install:** Use the current working directory instead of the installed directory when finding package.json (Fixes [#234](https://github.com/pact-foundation/pact-js-cli/issues/234)) ([30c41dc](https://github.com/pact-foundation/pact-js-cli/commit/30c41dc422e466b67ecf79ba31408f1caca999df))
* lint errors ([3786e13](https://github.com/pact-foundation/pact-js-cli/commit/3786e1301424efd8abf67480dfe6bca7605c3f20))
* **lint:** add noImplicitThis to TS configuration ([eb17979](https://github.com/pact-foundation/pact-js-cli/commit/eb1797988d3c3674f35ea8e01d11bc01ee935772))
* **lint:** fix noImplicitReturns TS issues ([5c57288](https://github.com/pact-foundation/pact-js-cli/commit/5c57288b53c945e62ab97dceda5b11dedb402e98))
* lock engines to node 16 or greater ([e26784f](https://github.com/pact-foundation/pact-js-cli/commit/e26784f90dad5139287229674be1755b81b1abfa))
* **logger:** Imply verbose mode when log level is debug or trace ([814d4fb](https://github.com/pact-foundation/pact-js-cli/commit/814d4fbe83e598748057c1b5f40b3bef60b86434))
* **logger:** Log output now correctly reads pact-node instead of pact ([c9f22e1](https://github.com/pact-foundation/pact-js-cli/commit/c9f22e16fe406a8474dbcae0c7a5dbf2a473881e))
* **logger:** migrate from bunyan to pino ([704d584](https://github.com/pact-foundation/pact-js-cli/commit/704d58457f7638cd20630be697ac046bb7c434d8))
* **logger:** Now pact-node and ruby use the same logLevel if specified ([513a60d](https://github.com/pact-foundation/pact-js-cli/commit/513a60d00ec8dce8176a592941923b41e1938853))
* **logging:** Only log entire environment when log level is trace, not debug ([c3b9f5f](https://github.com/pact-foundation/pact-js-cli/commit/c3b9f5fa84b80ccaeb49345b857346b8095f07b1))
* **logging:** Print args for spawn binary correctly in debug output ([2b0ce9d](https://github.com/pact-foundation/pact-js-cli/commit/2b0ce9d83ec1f2efe89fe84b4d1c99d09700d2a2))
* **logging:** print options in json instead of using a helper ([9f09348](https://github.com/pact-foundation/pact-js-cli/commit/9f093488cda822518569d53619f5b18e229aea71))
* map pactflow command to correct binary / add tests ([31f4df9](https://github.com/pact-foundation/pact-js-cli/commit/31f4df935fcb92d2b8ab0f473ca282a8aa3fa76c))
* **message:** Change the way pact-message is invoked which should avoid some issues in Windows environments ([92185b0](https://github.com/pact-foundation/pact-js-cli/commit/92185b06db955c3e194317cffde8e27954b7ac9f))
* **message:** Fixed an issue where message pacts could not be created on some platforms ([a092ed9](https://github.com/pact-foundation/pact-js-cli/commit/a092ed904b43c132c00efd6c5e371faef9ea6e97))
* missing api_key issue in travis https://travis-ci.community/t/missing-api-key-when-deploying-to-github-releases/5761/13 ([8f503b8](https://github.com/pact-foundation/pact-js-cli/commit/8f503b8806ba342db75103e3c6c0a58d36e7bc73))
* **mock:** fix q resolver in integration mocks ([6de02db](https://github.com/pact-foundation/pact-js-cli/commit/6de02db1c99bd9575556d829c067793dff35cf40))
* Move argumentMapper back into verifier package ([6d3ff7d](https://github.com/pact-foundation/pact-js-cli/commit/6d3ff7d093a8cabd0952aecebbdab7ab135f60dc))
* Move pact crash message helper into the logger ([4a62335](https://github.com/pact-foundation/pact-js-cli/commit/4a62335409f18aa07d9ee16b54f8583013c7e487))
* move scripts around to make the structure a bit clearer ([0df47b2](https://github.com/pact-foundation/pact-js-cli/commit/0df47b27d3e65ae53c0d68f095ba4ab4d3252440))
* Move the ffi part of the verifier into the ffi folder, and move the internals down a level ([11fac52](https://github.com/pact-foundation/pact-js-cli/commit/11fac52413fbe1b99f4482381753c77eb1142ed7))
* native builds failing on windows ([4e27713](https://github.com/pact-foundation/pact-js-cli/commit/4e27713ec393c1bf140212faa3dd778b7077865c))
* only set failIfNoPactsFound if set by user ([577e49f](https://github.com/pact-foundation/pact-js-cli/commit/577e49f41927a48808005da1b7b317f0be9b9ad2))
* **options:** Stop validating values for logLevel, pactFileWriteMode and format. This means we'll immediately pick up changes to those options without needing to modify pact-node ([1319a86](https://github.com/pact-foundation/pact-js-cli/commit/1319a86d87d4ffd60a58146150f62a96f4ef9f35))
* package.json & package-lock.json to reduce vulnerabilities ([1a1439c](https://github.com/pact-foundation/pact-js-cli/commit/1a1439c7d25f136307d43ff3818682377868e6a6))
* package.json & package-lock.json to reduce vulnerabilities ([44bd189](https://github.com/pact-foundation/pact-js-cli/commit/44bd189fff0303922e6fb04ac60de0fc1f39f7cf))
* package.json & package-lock.json to reduce vulnerabilities ([8d76550](https://github.com/pact-foundation/pact-js-cli/commit/8d76550a4dffcbf3fad477457b736a8ad09d05dd))
* package.json & package-lock.json to reduce vulnerabilities ([70aa0f0](https://github.com/pact-foundation/pact-js-cli/commit/70aa0f0ec8d2c861b1457cc31eb533e5259ba907))
* package.json to reduce vulnerabilities ([#151](https://github.com/pact-foundation/pact-js-cli/issues/151)) ([181e5d8](https://github.com/pact-foundation/pact-js-cli/commit/181e5d8cce23641465d8990f743ba9d939278211))
* package.json, package-lock.json & .snyk to reduce vulnerabilities ([0dc7a8f](https://github.com/pact-foundation/pact-js-cli/commit/0dc7a8f0165902705a31b39ac5f803831f05c5a9))
* **package.json:** Move snyk to devDependencies ([#193](https://github.com/pact-foundation/pact-js-cli/issues/193)) ([b3d7a8a](https://github.com/pact-foundation/pact-js-cli/commit/b3d7a8a4f0adb843b90e3ad02e25305411298615))
* **package:** Update vulnerable packages ([#146](https://github.com/pact-foundation/pact-js-cli/issues/146)) ([e8e5076](https://github.com/pact-foundation/pact-js-cli/commit/e8e5076156586b56207269535460741856198715))
* **pact-location-relative:** adding relative paths to the pact binary location configuration, with accompanying tests ([02d2bcf](https://github.com/pact-foundation/pact-js-cli/commit/02d2bcf6eeac8c6a8dd6a4e2beefdaa787cb367b))
* **pact-util:** make createArguments also accept arrays of SpawnArguments ([6df619b](https://github.com/pact-foundation/pact-js-cli/commit/6df619b670cd3ee934ccda6a347cf698236bbfd1))
* **pact-util:** Replace pact-util with spawn and pact-environment packages ([879a148](https://github.com/pact-foundation/pact-js-cli/commit/879a14854dd6a91419bc92fd2676bc9eb863e3c1))
* pactffi_create_mock_server_for_transport returns uint32 ([8d85a81](https://github.com/pact-foundation/pact-js-cli/commit/8d85a8186d1c960af780bc039bbf4793dc389e0d))
* Pass logLevel down to the native consumer ([88b329c](https://github.com/pact-foundation/pact-js-cli/commit/88b329c4857f0777881574f50ae31e42c8764a8c))
* Pin standalone version back to the last known good version 1.88.66 ([77eab71](https://github.com/pact-foundation/pact-js-cli/commit/77eab71aa0bf6183398b0787e5c370f2b20a9a2d))
* **postinstall:** forgot to resolve the promise on postinstall after downloading binaries ([61fcce6](https://github.com/pact-foundation/pact-js-cli/commit/61fcce6569eec7e888129b09b1d228fbd4468725))
* **postinstall:** removing rimraf from postinstall ([a6ed328](https://github.com/pact-foundation/pact-js-cli/commit/a6ed3286aad49c82e33b1768348bc44e00933512))
* prettier ([8f4e364](https://github.com/pact-foundation/pact-js-cli/commit/8f4e364950f38c9f8750f3a072a12b1ff54231cc))
* prevent archive extracting as the wrong user when installling as root ([d0941b0](https://github.com/pact-foundation/pact-js-cli/commit/d0941b05fdb809ded93d4228e5bdf1e0f8c116ef))
* Print warnings if 'latest' is used as a tag during verification ([ddd516d](https://github.com/pact-foundation/pact-js-cli/commit/ddd516d639b12c31f3b7f5cfbcbb859f16c40f85))
* **promiseRejection:** removing global promise rejection handler as it was causing issues with projects using pact ([8b4478d](https://github.com/pact-foundation/pact-js-cli/commit/8b4478d63f79cd709e3def792c2cba057967e57a))
* **publisher:** Fix an issue that caused the publisher API to reject with the most recent binaries (As an aside, the recommended approach is to use the CLI not the API for almost all use cases- see the examples for more details) ([4a100bb](https://github.com/pact-foundation/pact-js-cli/commit/4a100bbc72e3b31ef9663aed78617b8954be784c))
* Refactor logger to make it easier to use ffi logs ([c650192](https://github.com/pact-foundation/pact-js-cli/commit/c650192d4e83ce342bba4f84ce8b43d573827bda))
* remove dead code, fix bug in URL vs file handling ([dcd53e0](https://github.com/pact-foundation/pact-js-cli/commit/dcd53e08e0dfa6dc3be71ea0bbc95eb327939225))
* remove decompress dependency as it is highly vulnerable. Fixes [#208](https://github.com/pact-foundation/pact-js-cli/issues/208) ([6956544](https://github.com/pact-foundation/pact-js-cli/commit/69565441d5eebabba4db205b608b850f50646636))
* Remove everything except for the CLI binstubs ([44b7045](https://github.com/pact-foundation/pact-js-cli/commit/44b7045327aad82a199818d083a0ca9c9e2f3ea2))
* remove extracted binary folders on clean to avoid false positives ([7e8f76b](https://github.com/pact-foundation/pact-js-cli/commit/7e8f76b59b8b375075971db95b7f48486d54d02e))
* Remove FFI functionality from scripts directory ([ad3308b](https://github.com/pact-foundation/pact-js-cli/commit/ad3308b57d8a8fccd91709045784abb4ece3a819))
* remove ia32 cpu type ([75c36b5](https://github.com/pact-foundation/pact-js-cli/commit/75c36b518051110cdaa48f6892c1473c91031ce3))
* remove overall verification timeout (see https://github.com/pact-foundation/pact-js/issues/761) ([bb52158](https://github.com/pact-foundation/pact-js-cli/commit/bb521587d7c411ea78520733c3178dd92945b89b))
* Remove some unnecessary files from the npm package ([60c4aa1](https://github.com/pact-foundation/pact-js-cli/commit/60c4aa1f28130c7e0764ff8ca7ed1a14f1dc81dc))
* Remove SpawnArguments extension on exported options types ([990b033](https://github.com/pact-foundation/pact-js-cli/commit/990b033a438822308e0bf47ec6ecfeca5c3d51a9))
* remove tests, point directly to npm config settings for ca and StrictSSL ([ae36609](https://github.com/pact-foundation/pact-js-cli/commit/ae366098c268339cebf91bc562a611360f0a68b1))
* Remove unnecessary dependencies ([8b559c5](https://github.com/pact-foundation/pact-js-cli/commit/8b559c5616d5b1302c469f286c9ce310dbf4ce04))
* **remove-old-node:** forgot to remove old node version that were tested in travis and appveyor ([0a6e483](https://github.com/pact-foundation/pact-js-cli/commit/0a6e483719d09c292cc256cbea21f3371fcc6d54))
* Rename fromSpawnArgs -> toArgumentsArray ([12c29be](https://github.com/pact-foundation/pact-js-cli/commit/12c29bec1782cec5308eeccd4892855e6460c32e))
* Replace `q` ith native `Promise` ([a5076cc](https://github.com/pact-foundation/pact-js-cli/commit/a5076cc974c052ab9d281c86d90c136ea00f0f84))
* Replace request with needle ([b053e54](https://github.com/pact-foundation/pact-js-cli/commit/b053e54e7ee313d0bd165f178e55108b1dd58052))
* restore ConsumerMessage type (alias) ([f44283d](https://github.com/pact-foundation/pact-js-cli/commit/f44283de63825c988ec44a36af75712f4f8fd0d9))
* restore makeConsumerAsyncMessagePact ([1c4a893](https://github.com/pact-foundation/pact-js-cli/commit/1c4a8930f760aeaeb0cc146574af0785a46d18f4))
* restore providerVersionBranch ([c155f94](https://github.com/pact-foundation/pact-js-cli/commit/c155f943a5bb9beb33c2b1fab35f4d8a7cfb7d24))
* **security:** updating request dependency for security reason ([dd41ab9](https://github.com/pact-foundation/pact-js-cli/commit/dd41ab9868053ba088a045fda8cdf1d48bca3c22))
* send NUL terminated strings to pactffi_message_with_contents for non-binary payloads ([ac4557c](https://github.com/pact-foundation/pact-js-cli/commit/ac4557c23f5ea2af1ec3b8e384ea8765dc3bbdb6))
* Separate out argMapper types for readability ([df4d22d](https://github.com/pact-foundation/pact-js-cli/commit/df4d22daa656478ed5a852f4b33c1c1af5076287))
* **server:** fix NPE in create server setup ([4f90174](https://github.com/pact-foundation/pact-js-cli/commit/4f90174668f2f93657a764f38de27c4b14d6f250)), closes [#56](https://github.com/pact-foundation/pact-js-cli/issues/56)
* **server:** Maintain a private reference to the global `setTimeout` function in case that function is mocked in a consumer test (e.g. `sinon.useFakeTimers()`) ([#110](https://github.com/pact-foundation/pact-js-cli/issues/110)) ([f4ebfff](https://github.com/pact-foundation/pact-js-cli/commit/f4ebfffefbb51662d4bbf74b26703ac51d2fd11b))
* **server:** remove force-clone of options ([1a7a6e0](https://github.com/pact-foundation/pact-js-cli/commit/1a7a6e02448ef7c0fb445658ff47a3ca445018f6))
* **service:** refactor stub and mock svc ([b02a5d6](https://github.com/pact-foundation/pact-js-cli/commit/b02a5d68380e6af86f6eaf2fd2d4e727b3af95a6))
* set strictSSL on custom downloads from NPM config. Fixes [#211](https://github.com/pact-foundation/pact-js-cli/issues/211) ([d264f0b](https://github.com/pact-foundation/pact-js-cli/commit/d264f0b800209a171b320039e7fa3c2dd621606e))
* **spawn:** Improve debug log formatting ([977a845](https://github.com/pact-foundation/pact-js-cli/commit/977a8457c62bd4dd002ac1d64f844d487b4d5fa1))
* **spawn:** Move cliVerb concept out of domain packages  and into spawn package ([6b82d6d](https://github.com/pact-foundation/pact-js-cli/commit/6b82d6d782c40001ad1cd141428795bf44dae016))
* **spawn:** Now binaries are spawned directly with array arguments, rather than quoted strings. Should fix [#118](https://github.com/pact-foundation/pact-js-cli/issues/118) ([378f256](https://github.com/pact-foundation/pact-js-cli/commit/378f256a528a7be07c9fa29b69f97e9cc526d1a5))
* **spawn:** Replace SpawnArguments index type with specific options types ([4bae9bf](https://github.com/pact-foundation/pact-js-cli/commit/4bae9bf3edceb850db71ce462395a06727fea011))
* **spawn:** The command used to spawn the binary is now debug rather than info (fixes [#184](https://github.com/pact-foundation/pact-js-cli/issues/184)) ([a9f1470](https://github.com/pact-foundation/pact-js-cli/commit/a9f147005237958d78258617b27ca983ed08edb6))
* specify User-Agent when downloading binaries ([a2a1698](https://github.com/pact-foundation/pact-js-cli/commit/a2a1698453cfeb3e5c140ee78aef51628322ba6f)), closes [#149](https://github.com/pact-foundation/pact-js-cli/issues/149)
* spelling in error message. ([c40170d](https://github.com/pact-foundation/pact-js-cli/commit/c40170d39e3ad92749276c158cfa33e32b0be4a9))
* Split types out of ffi.ts and improve readability ([5edf2ef](https://github.com/pact-foundation/pact-js-cli/commit/5edf2ef5c5fb97e6c363e07ac7e7212bcceb3863))
* **standalone:** Bump version of pact-standalone to 1.73.0; fixes [#183](https://github.com/pact-foundation/pact-js-cli/issues/183) ([41bafad](https://github.com/pact-foundation/pact-js-cli/commit/41bafad4cc6979e7c93aaae27b97682b79f5c75f))
* **standalone:** Bump version of pact-standalone to 1.82.1 (improved json diff, basic auth config improvements) ([bde0287](https://github.com/pact-foundation/pact-js-cli/commit/bde02875b4fed127b3266917b1d38c51b2173255))
* **standalone:** Update pact-standalone version to obtain fix for https://github.com/pact-foundation/pact_broker-client/issues/50 ([e0a1921](https://github.com/pact-foundation/pact-js-cli/commit/e0a1921b891294bf360d7cf1bb090784e14bb90a))
* **standalone:** update standalone to 1.82.2 ([#220](https://github.com/pact-foundation/pact-js-cli/issues/220)) ([ea85d0b](https://github.com/pact-foundation/pact-js-cli/commit/ea85d0b96dc3f489cfc335ad0b7331e8de0494a2)), closes [pact-foundation/pact-ruby-standalone#49](https://github.com/pact-foundation/pact-ruby-standalone/issues/49)
* **standalone:** update standalone to 1.82.3 ([#223](https://github.com/pact-foundation/pact-js-cli/issues/223)) ([70fac35](https://github.com/pact-foundation/pact-js-cli/commit/70fac353007e0ebc7b622415cd66bfe25e9c2d2f))
* Substantially improve error messages if the pact publisher API fails ([81d3511](https://github.com/pact-foundation/pact-js-cli/commit/81d35115489e2960d6517d856593de28b54d2d12))
* support customProviderHeaders as a string[] ([171cfd0](https://github.com/pact-foundation/pact-js-cli/commit/171cfd0478406eb6126d437c4e45d0b4968afbea))
* **tag:** fix URL for Pact tagging ([acdfa93](https://github.com/pact-foundation/pact-js-cli/commit/acdfa93e69b9daf30425111d83495e71359a38cb))
* The verifier option `providerStatesSetupUrl` is no longer deprecated. Other deprecated options have been removed. ([95b88e0](https://github.com/pact-foundation/pact-js-cli/commit/95b88e084bf66d97717a99ac4ebf800c8116bc68))
* **types:** Correctly export logger type (in the future we should use our own type) ([a4f766f](https://github.com/pact-foundation/pact-js-cli/commit/a4f766f21a296baf737fb46c8e6c40a70652cdb8))
* **typescript:** Avoids packaging TypeScript sources to avoid .d.ts conflicts ([c65dc9f](https://github.com/pact-foundation/pact-js-cli/commit/c65dc9f195e55cdd7a3b3e77abf90c30d597a285))
* update FFI core and fix order of verifier FFI calls ([3a70f2e](https://github.com/pact-foundation/pact-js-cli/commit/3a70f2e657ff42b3e86a9b8cce1fb65ef46f9b2a))
* update rust core to 0.2.4 ([7407333](https://github.com/pact-foundation/pact-js-cli/commit/7407333a0382ae4a6f1d90d427e5f76ea4bbc506))
* update rust core to 0.3.18 ([d178c27](https://github.com/pact-foundation/pact-js-cli/commit/d178c2784bb31e2bfe12585ad8d6f8d65dddf62b))
* update rust core to 0.3.9 ([81483b8](https://github.com/pact-foundation/pact-js-cli/commit/81483b895fd891ff6cd46b9ab1b42a899cc546d9))
* update standalone to 1.83.0 ([0cfefb4](https://github.com/pact-foundation/pact-js-cli/commit/0cfefb42d302615b9eb93f064458912f87222734))
* update standalone to 1.84.0 ([9f2eb16](https://github.com/pact-foundation/pact-js-cli/commit/9f2eb1695cbbf2d910a6691f777aa435ea0f1859))
* update standalone to 1.85.0 ([acb9aa9](https://github.com/pact-foundation/pact-js-cli/commit/acb9aa9f8431939670e0dffa6a4a6c75c7f8152c))
* update standalone to 1.86.0 ([524a7dd](https://github.com/pact-foundation/pact-js-cli/commit/524a7ddb3716e2e76b598e250131531a675899ad))
* update standalone to 1.88.3 ([6e1c80b](https://github.com/pact-foundation/pact-js-cli/commit/6e1c80b1316c5a79d18bdc497bb764bab7775fb9))
* update standalone to 1.88.33 ([d42e348](https://github.com/pact-foundation/pact-js-cli/commit/d42e3487d58b5f37a71d2d8b0692669af1035ff5))
* update standalone to 1.88.34 ([cba5625](https://github.com/pact-foundation/pact-js-cli/commit/cba5625148e7ea733aeb1cdd4a6e24b4eebb6091))
* update standalone to 1.88.35 ([d8dfe39](https://github.com/pact-foundation/pact-js-cli/commit/d8dfe393671ae74c7f743b537a9e75f6a52656d0))
* update standalone to 1.88.36 ([22e8414](https://github.com/pact-foundation/pact-js-cli/commit/22e8414dc5604f2a8b2c221a04fa6cd8d481f2ff))
* update standalone to 1.88.37 ([383eb8a](https://github.com/pact-foundation/pact-js-cli/commit/383eb8aa30340dc5c4e2293a23b3ae42a60a3eb6))
* update standalone to 1.88.38 ([de4aaf2](https://github.com/pact-foundation/pact-js-cli/commit/de4aaf27932fdbd3707e0aa79f3d659cdfe0a870))
* update standalone to 1.88.40 ([618fb9d](https://github.com/pact-foundation/pact-js-cli/commit/618fb9de5790de9484b4c32f0103c2f754f843e9))
* update standalone to 1.88.41 ([3916c88](https://github.com/pact-foundation/pact-js-cli/commit/3916c886698feef0deb786a944c2b1d9004c0c0a))
* update standalone to 1.88.45 ([fcab9f8](https://github.com/pact-foundation/pact-js-cli/commit/fcab9f8aa9b9532026194799b68bf6df32b78272))
* update standalone to 1.88.46 ([e9f2b43](https://github.com/pact-foundation/pact-js-cli/commit/e9f2b431b1118396c27814daaa0cfd4f538ea138))
* update standalone to 1.88.47 ([5626f3b](https://github.com/pact-foundation/pact-js-cli/commit/5626f3bcb92ce3c7141373232e4ec3701d8ae2d8))
* update standalone to 1.88.48 ([14e31cf](https://github.com/pact-foundation/pact-js-cli/commit/14e31cf812fd7f11fe84e130bcff4c50d0ff64de))
* update standalone to 1.88.49 ([cb088ce](https://github.com/pact-foundation/pact-js-cli/commit/cb088ce64d670ce5babadfec53d561e00d9ad8ff))
* update standalone to 1.88.50 ([ce92950](https://github.com/pact-foundation/pact-js-cli/commit/ce9295023b05df140b7575a6d910add55e62639c))
* update standalone to 1.88.51 ([de83a99](https://github.com/pact-foundation/pact-js-cli/commit/de83a99b1574d868557f7eba6069c4d9a84279e5))
* update standalone to 1.88.56 ([81821fc](https://github.com/pact-foundation/pact-js-cli/commit/81821fcd53649aedd242c9a2a4578b16c4c1fcd6))
* update standalone to 1.88.58 ([b95b6ae](https://github.com/pact-foundation/pact-js-cli/commit/b95b6aeb4198c2f32ebdc40adb9a6322a451fc42))
* update standalone to 1.88.61 ([019af87](https://github.com/pact-foundation/pact-js-cli/commit/019af87cf72d1991313e82663d5530692fd2e42d))
* update standalone to 1.88.63 ([240ea6c](https://github.com/pact-foundation/pact-js-cli/commit/240ea6cb2274cead6705557d61907949996053d3))
* update standalone to 1.88.65 ([#319](https://github.com/pact-foundation/pact-js-cli/issues/319)) ([3be38b4](https://github.com/pact-foundation/pact-js-cli/commit/3be38b409ce4a88c115ce0938930b1edcc4bd9e0))
* update standalone to 1.88.66 ([#320](https://github.com/pact-foundation/pact-js-cli/issues/320)) ([92f0532](https://github.com/pact-foundation/pact-js-cli/commit/92f0532af57757acfca01efae75cefd192de0a58))
* update standalone to 1.88.68 ([5f38729](https://github.com/pact-foundation/pact-js-cli/commit/5f38729e523430c1ed7fdd863c53ef4a71800f54))
* update standalone to 1.88.69 ([ceb7071](https://github.com/pact-foundation/pact-js-cli/commit/ceb7071e55bfb8d303233dfc95f1fd65ef6d6c8f))
* update standalone to 1.88.70 ([138a2c4](https://github.com/pact-foundation/pact-js-cli/commit/138a2c4ba7223c442299d7fdb4cde023bbd09a50))
* update standalone to 1.88.71 ([850178d](https://github.com/pact-foundation/pact-js-cli/commit/850178dc093e2b7e883920363234d3672d02d4c9))
* update standalone to 1.88.72 ([f8d0d0f](https://github.com/pact-foundation/pact-js-cli/commit/f8d0d0fa9e9faff5c5dd772b8ccc7805b4c2afaa))
* update standalone to 1.88.73 ([4ba164d](https://github.com/pact-foundation/pact-js-cli/commit/4ba164d11255f20ec699de0c5f0056f8a435c58c))
* update standalone to 1.88.75 ([c2fc6ac](https://github.com/pact-foundation/pact-js-cli/commit/c2fc6acd19a4d5894a95ef4e5ac7c2959dddc2d6))
* update standalone to 1.88.76 ([eea5c54](https://github.com/pact-foundation/pact-js-cli/commit/eea5c54d653da982b540e2cc6315cef40c5a501d))
* update standalone to 1.88.77 ([9659f35](https://github.com/pact-foundation/pact-js-cli/commit/9659f35603dc9c89f698561c95c4fb30880c8f66))
* update standalone to 1.88.78 ([cb25136](https://github.com/pact-foundation/pact-js-cli/commit/cb2513678dc30a7fd188bdb800e78898bb299f3b))
* update standalone to 1.88.80 ([c0332e8](https://github.com/pact-foundation/pact-js-cli/commit/c0332e81e8ce61f24c131fa61028034314f2c21d))
* update standalone to 1.88.81 ([9abfa06](https://github.com/pact-foundation/pact-js-cli/commit/9abfa06e7c1c7c3fa58d19f985e1cdfe6b224bdb))
* update standalone to 1.88.82 ([1946ada](https://github.com/pact-foundation/pact-js-cli/commit/1946ada84b52ac62f332c2d7e421c8efced13753))
* update standalone to 1.88.83 ([423817d](https://github.com/pact-foundation/pact-js-cli/commit/423817dced532fbe9671b267f31b244d3d246d2f))
* update standalone to 1.88.91-rc4 ([#378](https://github.com/pact-foundation/pact-js-cli/issues/378)) ([f9344ea](https://github.com/pact-foundation/pact-js-cli/commit/f9344ea65bd6aecab08660a209dd04a8b757ceb4))
* update standalone to 1.89.01-rc1 ([#381](https://github.com/pact-foundation/pact-js-cli/issues/381)) ([8f70fa3](https://github.com/pact-foundation/pact-js-cli/commit/8f70fa3f40efeffe9eb88ec63f34dacb845cd49f))
* update standalone to 1.89.02-rc1 ([#382](https://github.com/pact-foundation/pact-js-cli/issues/382)) ([8d9b664](https://github.com/pact-foundation/pact-js-cli/commit/8d9b664bac280b83c587665a8a6b576feb6335a1))
* update standalone to 1.91.0 ([c6d747f](https://github.com/pact-foundation/pact-js-cli/commit/c6d747ff726ffc5a3438aaa91d041c2d93a22cb7))
* update the argument validation and function mapping for ffi verification ([#391](https://github.com/pact-foundation/pact-js-cli/issues/391)) ([fee85e1](https://github.com/pact-foundation/pact-js-cli/commit/fee85e1d1fcd63b81c3d2d0f86ab9691975873e6))
* Upgrade Caporal to fix vulnerability (Fixes [#159](https://github.com/pact-foundation/pact-js-cli/issues/159)) ([6efa434](https://github.com/pact-foundation/pact-js-cli/commit/6efa43420b929e25743fee39381b5f8e11d29476))
* Upgrade pact-standalone version to v1.70.2 ([3f0f1fc](https://github.com/pact-foundation/pact-js-cli/commit/3f0f1fc11b80eff6e41c9e1b19b323d7115dcb62))
* upgrade to ffi 0.2.2 ([6e4b758](https://github.com/pact-foundation/pact-js-cli/commit/6e4b75814c7e8a32598e5a08d871f99b77e203b9))
* upgrade to ffi 0.3.11 ([550e4b3](https://github.com/pact-foundation/pact-js-cli/commit/550e4b37a9617e52f8f8f2b9d2301318ea7711a1))
* upgrade to ffi 0.3.12 ([ce1bef4](https://github.com/pact-foundation/pact-js-cli/commit/ce1bef44ac9a95c1c40c05075f50b1dadf93986d))
* upgrade to ffi 0.3.14 ([1e0358d](https://github.com/pact-foundation/pact-js-cli/commit/1e0358dd3d739b23291966b9e7dfddd34ddd6f21))
* upgrade to ffi 0.3.15 ([0da476d](https://github.com/pact-foundation/pact-js-cli/commit/0da476dbd342f64234515572408fd43b28b5085b))
* upgrade to latest ffi 0.3.19 ([1c5a4fe](https://github.com/pact-foundation/pact-js-cli/commit/1c5a4fea66bf83fed530f10aba85793853fe157d))
* upgrade to latest pino. Fixes 417 ([2de141c](https://github.com/pact-foundation/pact-js-cli/commit/2de141c9f93d9423d18c4a574ca6775eaaba5775))
* upgrade vulnerable dependencies ([e79f929](https://github.com/pact-foundation/pact-js-cli/commit/e79f9294b1662380238323af890e7c922d5e3a57))
* use newer pactffi_with_header_v2 ffi method ([b579e4d](https://github.com/pact-foundation/pact-js-cli/commit/b579e4d271298b6a90be7b7bd05375b7e65a0bf6))
* Use the new pact_ffi instead of the verifier-only one ([5d2f364](https://github.com/pact-foundation/pact-js-cli/commit/5d2f3640e7856eabf2ba355d0fcfb8b5790fa2fe))
* use unzipper for .zip files, tar for tar.gz ([f6d8da0](https://github.com/pact-foundation/pact-js-cli/commit/f6d8da07966a8d262aef5e6f21abafbb1a201e96))
* **util:** move spawn arguments functions to their own package ([b11ddde](https://github.com/pact-foundation/pact-js-cli/commit/b11ddde11d86dc6b5e4aa435d2f79575ab3f6523))
* validateOptions should ignore unknown properties ([8e2af40](https://github.com/pact-foundation/pact-js-cli/commit/8e2af408628db88dccfeca49d1bf161232b6242d))
* **verification:** allow user to specify verification timeout [#30](https://github.com/pact-foundation/pact-js-cli/issues/30) ([cfb780d](https://github.com/pact-foundation/pact-js-cli/commit/cfb780d0d9958857230bb0e9baccbac8910e03e6))
* **verification:** feedback on setting default value from Michel ([c7d4ae8](https://github.com/pact-foundation/pact-js-cli/commit/c7d4ae8fdf1e0c600543b47ba05c8df3334d21e8))
* Verifier now accepts explicitly setting options to undefined (it will ignore and warn). This fixes a regression introduced in beta-45 ([7521c61](https://github.com/pact-foundation/pact-js-cli/commit/7521c6121ec0523795c97ec5c422c3b6d6024dd8))
* **verifier:** --monkeypatch flag missing ([b1355bd](https://github.com/pact-foundation/pact-js-cli/commit/b1355bde3f24588bcae8fa199a4561f114d9132b))
* **verifier:** allow to use progress formatter during verification ([#189](https://github.com/pact-foundation/pact-js-cli/issues/189)) ([2571725](https://github.com/pact-foundation/pact-js-cli/commit/25717257bb18aabc5a113d5ed794cb5fc75ef091))
* **verifier:** Correct the way that authentication tokens are sent to the verifier ([4902db7](https://github.com/pact-foundation/pact-js-cli/commit/4902db73fcd334647b246cd03c9e979ca024b069))
* **verifier:** Correctly pass down log levels to the native core ([c11ce75](https://github.com/pact-foundation/pact-js-cli/commit/c11ce75dffaf6d1932decdd3e275e7b54cf817aa))
* **verifier:** Correctly pass down log levels to the native core ([13d5ded](https://github.com/pact-foundation/pact-js-cli/commit/13d5ded36e5fbb1e1fa4654affff58ed67a6f190))
* **verifier:** Fix issue where using custom provider headers would cause a crash (fixes [#388](https://github.com/pact-foundation/pact-js-cli/issues/388)) ([c4f60f2](https://github.com/pact-foundation/pact-js-cli/commit/c4f60f2e9a4955d744e457c8d47245c3776af2a3))
* **verifier:** update error message if pactUrls not specified. Fixes [#78](https://github.com/pact-foundation/pact-js-cli/issues/78) ([1e7bfda](https://github.com/pact-foundation/pact-js-cli/commit/1e7bfda1a21d3b40b2e75312b28063818ac8a584))
* Warn if broker arguments are set without a broker URL and ignore the argument (fixes pact-foundation/pact-js[#760](https://github.com/pact-foundation/pact-js-cli/issues/760)) ([17d3eb1](https://github.com/pact-foundation/pact-js-cli/commit/17d3eb1629256828d3162a46d078087dd6ef7b91))
* **windows-long-path:** Checking if Windows has long path enabled ([#102](https://github.com/pact-foundation/pact-js-cli/issues/102)) ([dc06228](https://github.com/pact-foundation/pact-js-cli/commit/dc06228262bf7166584fb0e4e8c690b23e9bb739))
* **windows-path:** added condition for optional CLI parameter wrapper for windows ([d34e1e3](https://github.com/pact-foundation/pact-js-cli/commit/d34e1e35e410e86b9b4705a3b97abb75e9415e4d))
* **windows-path:** spaces in paths on windows would error our the pact binary ([#95](https://github.com/pact-foundation/pact-js-cli/issues/95)) ([1de9c75](https://github.com/pact-foundation/pact-js-cli/commit/1de9c757b50acbfe0ffabd65559d523cdf77cc3d))
* x-platform binary consumer spec ([1a81ed4](https://github.com/pact-foundation/pact-js-cli/commit/1a81ed408b916ddd4c63c31b8580780382955e2a))

## [14.3.7](https://github.com/pact-foundation/pact-js-core/compare/v14.3.6...v14.3.7) (2024-05-29)


### Fixes and Improvements

* set process.stdout._handle.setBlocking(true) on ffi init ([#510](https://github.com/pact-foundation/pact-js-core/issues/510)) ([af76abd](https://github.com/pact-foundation/pact-js-core/commit/af76abd64b034d2c0e1ffdbe795d68ed8d791b1e))
* shell escaping ([#511](https://github.com/pact-foundation/pact-js-core/issues/511)) ([3829d20](https://github.com/pact-foundation/pact-js-core/commit/3829d2024b6f8cb9790899ae068d14e74f9837d0))
* update standalone to 2.4.4 ([e7872d2](https://github.com/pact-foundation/pact-js-core/commit/e7872d2cfcc107313b7bedc57291adc041fe68c3))

## [14.3.6](https://github.com/pact-foundation/pact-js-core/compare/v14.3.5...v14.3.6) (2024-05-09)


### Fixes and Improvements

* update pact-ffi to 0.4.20 ([7a91725](https://github.com/pact-foundation/pact-js-core/commit/7a9172536393ac667b067fb57ba3b73363d9c87b))

## [14.3.5](https://github.com/pact-foundation/pact-js-core/compare/v14.3.4...v14.3.5) (2024-05-08)


### Fixes and Improvements

* node doesn't run .bat files on windows ([#504](https://github.com/pact-foundation/pact-js-core/issues/504)) ([4f125b3](https://github.com/pact-foundation/pact-js-core/commit/4f125b32bc3bdfc5e9bfbbef4e0302073783dcf1))

## [14.3.4](https://github.com/pact-foundation/pact-js-core/compare/v14.3.3...v14.3.4) (2024-04-23)


### Fixes and Improvements

* normalise PREBUILD_NAME to node.napi ([3812b0d](https://github.com/pact-foundation/pact-js-core/commit/3812b0def2559492c0ad4608db062e7c53526fec))
* upgrade to latest ffi 0.4.19 ([7a7d9b0](https://github.com/pact-foundation/pact-js-core/commit/7a7d9b0af6e5d9bfd2356f21808c48a407cf8a03))

## [14.3.3](https://github.com/pact-foundation/pact-js-core/compare/v14.3.2...v14.3.3) (2024-03-25)


### Fixes and Improvements

* export pactffiMessageGivenWithParams ([9b77d8c](https://github.com/pact-foundation/pact-js-core/commit/9b77d8cfa0897661d4f73a8d7483ff9bacff7e66))

## [14.3.2](https://github.com/pact-foundation/pact-js-core/compare/v14.3.1...v14.3.2) (2024-03-14)


### Fixes and Improvements

* prevent node-gyp rebuild on fresh install ([c24c638](https://github.com/pact-foundation/pact-js-core/commit/c24c638bc86cab98793ace6b5488de25ca242c85)), closes [/www.linen.dev/s/pact-foundation/t/16633868/hell-all-quick-question-in-the-migration-guide-for-v12-it-s-#100081d7-2fee-4420-8eac-d55858dcc483](https://github.com/pact-foundation//www.linen.dev/s/pact-foundation/t/16633868/hell-all-quick-question-in-the-migration-guide-for-v12-it-s-/issues/100081d7-2fee-4420-8eac-d55858dcc483) [/github.com/npm/cli/issues/5234#issuecomment-1291139150](https://github.com/pact-foundation//github.com/npm/cli/issues/5234/issues/issuecomment-1291139150)

## [14.3.1](https://github.com/pact-foundation/pact-js-core/compare/v14.3.0...v14.3.1) (2024-03-13)


### Fixes and Improvements

* 🐛 avoid node-gyp rebuild install script ([f5f5e7c](https://github.com/pact-foundation/pact-js-core/commit/f5f5e7cc387a7e694552fd5f69ba9c83ba490006))
* update standalone to 2.4.2 ([#492](https://github.com/pact-foundation/pact-js-core/issues/492)) ([fcccc34](https://github.com/pact-foundation/pact-js-core/commit/fcccc34cf0891b277c3cd7053d4d5262ee23eac5))

## [14.3.0](https://github.com/pact-foundation/pact-js-core/compare/v14.2.0...v14.3.0) (2024-02-28)


### Features

* add pactffi_message_with_metadata_v2 ([#493](https://github.com/pact-foundation/pact-js-core/issues/493)) ([613b7bd](https://github.com/pact-foundation/pact-js-core/commit/613b7bd25e8ad2d673961e4c06be83d10ceb5b7b))

## [14.2.0](https://github.com/pact-foundation/pact-js-core/compare/v14.1.4...v14.2.0) (2024-02-19)


### Features

* support status code matcher via pactffi_response_status_v2 ([#486](https://github.com/pact-foundation/pact-js-core/issues/486)) ([0edd3ac](https://github.com/pact-foundation/pact-js-core/commit/0edd3aca29fad38211a87b44d187c5851814876d))

## [14.1.4](https://github.com/pact-foundation/pact-js-core/compare/v14.1.3...v14.1.4) (2024-02-13)


### Fixes and Improvements

* update standalone to 2.4.1 ([8dfad86](https://github.com/pact-foundation/pact-js-core/commit/8dfad86f7b00c890e798eb168fb0d4244101c5a8))

## [14.1.3](https://github.com/pact-foundation/pact-js-core/compare/v14.1.2...v14.1.3) (2024-02-12)


### Fixes and Improvements

* update pact-ffi to 0.4.16 ([502f354](https://github.com/pact-foundation/pact-js-core/commit/502f354290b872a6ca2830d5f880560aa0401df1))
* update standalone to 2.4.0 ([f9a8e27](https://github.com/pact-foundation/pact-js-core/commit/f9a8e27a606feb5ababc1f87b49c746dd33a04ce))

## [14.1.2](https://github.com/pact-foundation/pact-js-core/compare/v14.1.1...v14.1.2) (2024-02-07)


### Fixes and Improvements

* upgrade to latest ffi 0.4.15 ([1ebdc49](https://github.com/pact-foundation/pact-js-core/commit/1ebdc4983a438368286ae36ae1de0f37424cd403))

## [14.1.1](https://github.com/pact-foundation/pact-js-core/compare/v14.1.0...v14.1.1) (2024-01-22)


### Fixes and Improvements

* pactffi_given_with_params accepts 3 args ([a56fdf7](https://github.com/pact-foundation/pact-js-core/commit/a56fdf7f40b13765ea058e2fc70abebe1a185211))
* update standalone to 2.1.0 ([6b49009](https://github.com/pact-foundation/pact-js-core/commit/6b490091623fa6f36899acbcfb41a14ebbf8da4a))

## [14.1.0](https://github.com/pact-foundation/pact-js-core/compare/v14.0.6...v14.1.0) (2024-01-18)


### Features

* add pactffi_given_with_params for params ([#476](https://github.com/pact-foundation/pact-js-core/issues/476)) ([ed8dea8](https://github.com/pact-foundation/pact-js-core/commit/ed8dea8ea1d2b006bdb16922a96f7ca0463fc2de))

## [14.0.6](https://github.com/pact-foundation/pact-js-core/compare/v14.0.5...v14.0.6) (2024-01-17)


### Fixes and Improvements

* update standalone to 2.0.7 ([3234fae](https://github.com/pact-foundation/pact-js-core/commit/3234faee368e59c50ec001c2aa80d7a1dba32b14))
* upgrade to latest ffi 0.4.12 ([94447f4](https://github.com/pact-foundation/pact-js-core/commit/94447f4aa2cd32f0b21747d4e82a63ffceab2a51))

## [14.0.5](https://github.com/pact-foundation/pact-js-core/compare/v14.0.4...v14.0.5) (2023-09-24)


### Fixes and Improvements

* upgrade to latest ffi 0.4.9 ([6ddfda7](https://github.com/pact-foundation/pact-js-core/commit/6ddfda7d43a1590d9dfcf7171c1afeffd228ac05))

## [14.0.4](https://github.com/pact-foundation/pact-js-core/compare/v14.0.3...v14.0.4) (2023-07-27)


### Fixes and Improvements

* upgrade to latest ffi 0.4.7 ([#462](https://github.com/pact-foundation/pact-js-core/issues/462)) ([55f33c3](https://github.com/pact-foundation/pact-js-core/commit/55f33c33962130d7a11af3add6451181c0b338bb))

## [14.0.3](https://github.com/pact-foundation/pact-js-core/compare/v14.0.2...v14.0.3) (2023-07-14)


### Fixes and Improvements

* update standalone to 2.0.3 ([b16a450](https://github.com/pact-foundation/pact-js-core/commit/b16a450f4e6d7ed6cbdfa6192f36f11146ae4031))

## [14.0.2](https://github.com/pact-foundation/pact-js-core/compare/v14.0.1...v14.0.2) (2023-07-13)


### Fixes and Improvements

* upgrade to latest ffi 0.4.6 ([56e3f4b](https://github.com/pact-foundation/pact-js-core/commit/56e3f4bae914a5f0037c8cb7715f82fd354d6afb))

## [14.0.1](https://github.com/pact-foundation/pact-js-core/compare/v14.0.0...v14.0.1) (2023-07-07)


### Fixes and Improvements

* set engines in package.json not engine ([4c9cc69](https://github.com/pact-foundation/pact-js-core/commit/4c9cc695a02c52c546c30379a92c5b9008888b4e))

## [14.0.0](https://github.com/pact-foundation/pact-js-core/compare/v13.15.0...v14.0.0) (2023-07-07)


### ⚠ BREAKING CHANGES

* drop support for node 15 and earlier

### Fixes and Improvements

* drop support for node 15 and earlier ([5fa91db](https://github.com/pact-foundation/pact-js-core/commit/5fa91db208bcceb176665722520519e4cfb5dc93))
* improve logging output for pact ffi native library lookup ([fb4e338](https://github.com/pact-foundation/pact-js-core/commit/fb4e3383c5fccaa03350004b4086d01ff54cf585))

## [13.15.0](https://github.com/pact-foundation/pact-js-core/compare/v13.13.9...v13.15.0) (2023-07-06)


### Features

* allow setting of LOG_LEVEL env var ([7224770](https://github.com/pact-foundation/pact-js-core/commit/72247702e1868286c09988764f93ac4aad68dfdb))
* ARM64 Linux/MacOS Pact Ruby Standalone ([ea9f86f](https://github.com/pact-foundation/pact-js-core/commit/ea9f86f75a287425dfc1aa9b2124b9c892ec7672))
* Prebuild pact_ffi pact.node - ([6a38cf7](https://github.com/pact-foundation/pact-js-core/commit/6a38cf7cf2738e43e84586446fcaa8022d9e2431))


### Fixes and Improvements

* path lookup for binaries was incorrectly munging into a single path ([7203e10](https://github.com/pact-foundation/pact-js-core/commit/7203e1064deb28a79aa92da0edfa28bac604c38b))

## [13.14.0](https://github.com/pact-foundation/pact-js-core/compare/v13.13.9...v13.14.0) (2023-07-06)


### Features

* Allow setting of LOG_LEVEL env var ([7224770](https://github.com/pact-foundation/pact-js-core/commit/72247702e1868286c09988764f93ac4aad68dfdb))
* Support arm64 Linux/MacOS CLI (Pact Ruby Standalone) ([ea9f86f](https://github.com/pact-foundation/pact-js-core/commit/ea9f86f75a287425dfc1aa9b2124b9c892ec7672))
* Prebuild native dependencies to speed up and simplify install ([6a38cf7](https://github.com/pact-foundation/pact-js-core/commit/6a38cf7cf2738e43e84586446fcaa8022d9e2431))

## [13.13.9](https://github.com/pact-foundation/pact-js-core/compare/v13.13.8...v13.13.9) (2023-06-30)


### Fixes and Improvements

* update standalone to 2.0.2 ([a6133f1](https://github.com/pact-foundation/pact-js-core/commit/a6133f1cd1ee57908c055c2de64ad435edb62de3))

## [13.13.8](https://github.com/pact-foundation/pact-js-core/compare/v13.13.7...v13.13.8) (2023-04-24)


### Fixes and Improvements

* update standalone to 1.92.0 ([0287ce8](https://github.com/pact-foundation/pact-js-core/commit/0287ce8f36509ce16812269f065ca75d1b49672d))

## [13.13.7](https://github.com/pact-foundation/pact-js-core/compare/v13.13.6...v13.13.7) (2023-04-24)


### Fixes and Improvements

* Remove unusable external export of HTTPConfig, which removes the need to have needle types as a dependency ([f123204](https://github.com/pact-foundation/pact-js-core/commit/f12320473aefdd51e6230e20256fcb61c661bf8d))
* upgrade to latest needle to support no_proxy. Fixes [#351](https://github.com/pact-foundation/pact-js-core/issues/351) ([30f46d0](https://github.com/pact-foundation/pact-js-core/commit/30f46d071865a69c94a25381f371605e3a1667ed))

### [13.13.6](https://github.com/pact-foundation/pact-js-core/compare/v13.13.5...v13.13.6) (2023-03-14)


### Fixes and Improvements

* Use synchronous logging to allow usage with Jest ([a4899f4](https://github.com/pact-foundation/pact-js-core/commit/a4899f45e3ca8ee3f1754dd88bbb15ee8039b3ba))

### [13.13.5](https://github.com/pact-foundation/pact-js-core/compare/v13.13.4...v13.13.5) (2023-03-08)


### Fixes and Improvements

* Fix an issue where invalid VerifierOptions keys with Array values would cause a TypeError ([4ecc29f](https://github.com/pact-foundation/pact-js-core/commit/4ecc29f567d16a279b6782a0d8cc7a948100cd25))

### [13.13.4](https://github.com/pact-foundation/pact-js-core/compare/v13.13.3...v13.13.4) (2023-01-23)


### Fixes and Improvements

* Fix 'is not a function' regression when using require() and a directly exported factory function. Fixes [#426](https://github.com/pact-foundation/pact-js-core/issues/426) ([2941552](https://github.com/pact-foundation/pact-js-core/commit/2941552e1ca814ed1f2e7dca7e6ae1fb743af440))
* update rust core to 0.4.0 ([3b396cd](https://github.com/pact-foundation/pact-js-core/commit/3b396cd7aca8bfebd4037f515e499460f44055fc))

### [13.13.3](https://github.com/pact-foundation/pact-js-core/compare/v13.13.2...v13.13.3) (2022-12-23)


### Fixes and Improvements

* use newer pactffi_with_header_v2 ffi method ([b579e4d](https://github.com/pact-foundation/pact-js-core/commit/b579e4d271298b6a90be7b7bd05375b7e65a0bf6))

### [13.13.2](https://github.com/pact-foundation/pact-js-core/compare/v13.13.1...v13.13.2) (2022-12-22)


### Fixes and Improvements

* upgrade to latest ffi 0.3.19 ([1c5a4fe](https://github.com/pact-foundation/pact-js-core/commit/1c5a4fea66bf83fed530f10aba85793853fe157d))

### [13.13.1](https://github.com/pact-foundation/pact-js-core/compare/v13.13.0...v13.13.1) (2022-12-19)


### Fixes and Improvements

* update rust core to 0.3.18 ([d178c27](https://github.com/pact-foundation/pact-js-core/commit/d178c2784bb31e2bfe12585ad8d6f8d65dddf62b))

## [13.13.0](https://github.com/pact-foundation/pact-js-core/compare/v13.12.2...v13.13.0) (2022-12-02)


### Features

* new content mismatch types for plugins ([7cebccd](https://github.com/pact-foundation/pact-js-core/commit/7cebccdd412262011ae8fa33fbe1a0c26c65f10d))


### Fixes and Improvements

* pactffi_create_mock_server_for_transport returns uint32 ([8d85a81](https://github.com/pact-foundation/pact-js-core/commit/8d85a8186d1c960af780bc039bbf4793dc389e0d))

### [13.12.2](https://github.com/pact-foundation/pact-js-core/compare/v13.12.1...v13.12.2) (2022-11-28)


### Fixes and Improvements

* upgrade to ffi 0.3.15 ([0da476d](https://github.com/pact-foundation/pact-js-core/commit/0da476dbd342f64234515572408fd43b28b5085b))

### [13.12.1](https://github.com/pact-foundation/pact-js-core/compare/v13.12.0...v13.12.1) (2022-11-24)


### Fixes and Improvements

* upgrade to latest pino. Fixes 417 ([2de141c](https://github.com/pact-foundation/pact-js-core/commit/2de141c9f93d9423d18c4a574ca6775eaaba5775))

## [13.12.0](https://github.com/pact-foundation/pact-js-core/compare/v13.11.3...v13.12.0) (2022-11-08)


### Features

* support HTTP + non-HTTP in ConsumerPact ([56786f2](https://github.com/pact-foundation/pact-js-core/commit/56786f2f300821868f98086e1cd2ac6ee3e8180b))

### [13.11.3](https://github.com/pact-foundation/pact-js-core/compare/v13.11.2...v13.11.3) (2022-11-07)


### Fixes and Improvements

* upgrade to ffi 0.3.14 ([1e0358d](https://github.com/pact-foundation/pact-js-core/commit/1e0358dd3d739b23291966b9e7dfddd34ddd6f21))

### [13.11.2](https://github.com/pact-foundation/pact-js-core/compare/v13.11.1...v13.11.2) (2022-11-04)


### Fixes and Improvements

* restore ConsumerMessage type (alias) ([f44283d](https://github.com/pact-foundation/pact-js-core/commit/f44283de63825c988ec44a36af75712f4f8fd0d9))

### [13.11.1](https://github.com/pact-foundation/pact-js-core/compare/v13.11.0...v13.11.1) (2022-11-02)


### Fixes and Improvements

* restore makeConsumerAsyncMessagePact ([1c4a893](https://github.com/pact-foundation/pact-js-core/commit/1c4a8930f760aeaeb0cc146574af0785a46d18f4))

## [13.11.0](https://github.com/pact-foundation/pact-js-core/compare/v13.10.0...v13.11.0) (2022-10-31)


### Features

* add additional FFI methods to support plugins ([246e86f](https://github.com/pact-foundation/pact-js-core/commit/246e86f8f41a2228ec656425447e28c6e4227433))
* support branch/autoDetectVersionProperties when publishing pacts ([64ab2ea](https://github.com/pact-foundation/pact-js-core/commit/64ab2ea110ea78315fb4609ad92a5fb90e96ddc7))


### Fixes and Improvements

* Add error messages to the ignored option debug logs ([8c8386d](https://github.com/pact-foundation/pact-js-core/commit/8c8386ddc356f279f3f7b3c503b403bf9f3b912a))

## [13.10.0](https://github.com/pact-foundation/pact-js-core/compare/v13.9.1...v13.10.0) (2022-10-18)


### Features

* expose faiIfNoPactsFound on the VerifierOptions ([72eeb08](https://github.com/pact-foundation/pact-js-core/commit/72eeb08ab50f64364e5fba38d5d18a5b3e9e5489))


### Fixes and Improvements

* only set failIfNoPactsFound if set by user ([577e49f](https://github.com/pact-foundation/pact-js-core/commit/577e49f41927a48808005da1b7b317f0be9b9ad2))

### [13.9.1](https://github.com/pact-foundation/pact-js-core/compare/v13.9.0...v13.9.1) (2022-09-28)


### Fixes and Improvements

* upgrade to ffi 0.3.12 ([ce1bef4](https://github.com/pact-foundation/pact-js-core/commit/ce1bef44ac9a95c1c40c05075f50b1dadf93986d))

## [13.9.0](https://github.com/pact-foundation/pact-js-core/compare/v13.8.0...v13.9.0) (2022-09-07)


### Features

* support PACT_BROKER_PUBLISH_VERIFICATION_RESULTS ([64872ae](https://github.com/pact-foundation/pact-js-core/commit/64872ae7a82193d785e378942dacae96e5deca34))


### Fixes and Improvements

* update standalone to 1.91.0 ([c6d747f](https://github.com/pact-foundation/pact-js-core/commit/c6d747ff726ffc5a3438aaa91d041c2d93a22cb7))
* upgrade to ffi 0.3.11 ([550e4b3](https://github.com/pact-foundation/pact-js-core/commit/550e4b37a9617e52f8f8f2b9d2301318ea7711a1))

## [13.8.0](https://github.com/pact-foundation/pact-js-core/compare/v13.7.9...v13.8.0) (2022-09-05)


### Features

* Add Linux/arm64 support ([a174d7b](https://github.com/pact-foundation/pact-js-core/commit/a174d7b89105043b21522e56efa1a35f8c8222c4))

### [13.7.9](https://github.com/pact-foundation/pact-js-core/compare/v13.7.8...v13.7.9) (2022-08-30)


### Fixes and Improvements

* error if file source is invalid ([f1ad86a](https://github.com/pact-foundation/pact-js-core/commit/f1ad86ad5d139ecd6381a5f19d0991139b5e110b))
* update rust core to 0.3.9 ([81483b8](https://github.com/pact-foundation/pact-js-core/commit/81483b895fd891ff6cd46b9ab1b42a899cc546d9))

### [13.7.8](https://github.com/pact-foundation/pact-js-core/compare/v13.7.7...v13.7.8) (2022-08-19)


### Fixes and Improvements

* correct binary matching behaviour ([5794c74](https://github.com/pact-foundation/pact-js-core/commit/5794c74366ea57b101f6bfa4fd21c843b36b69cb))

### [13.7.7](https://github.com/pact-foundation/pact-js-core/compare/v13.7.6...v13.7.7) (2022-08-14)


### Fixes and Improvements

* update FFI core and fix order of verifier FFI calls ([3a70f2e](https://github.com/pact-foundation/pact-js-core/commit/3a70f2e657ff42b3e86a9b8cce1fb65ef46f9b2a))

### [13.7.6](https://github.com/pact-foundation/pact-js-core/compare/v13.7.5...v13.7.6) (2022-08-13)


### Fixes and Improvements

* validateOptions should ignore unknown properties ([8e2af40](https://github.com/pact-foundation/pact-js-core/commit/8e2af408628db88dccfeca49d1bf161232b6242d))

### [13.7.5](https://github.com/pact-foundation/pact-js-core/compare/v13.7.4...v13.7.5) (2022-08-13)


### Fixes and Improvements

* restore providerVersionBranch ([c155f94](https://github.com/pact-foundation/pact-js-core/commit/c155f943a5bb9beb33c2b1fab35f4d8a7cfb7d24))
* support customProviderHeaders as a string[] ([171cfd0](https://github.com/pact-foundation/pact-js-core/commit/171cfd0478406eb6126d437c4e45d0b4968afbea))

### [13.7.4](https://github.com/pact-foundation/pact-js-core/compare/v13.7.3...v13.7.4) (2022-08-13)


### Fixes and Improvements

* corrects customProviderHeaders validation (pact-foundation/pact-js-core[#392](https://github.com/pact-foundation/pact-js-core/issues/392)) ([#393](https://github.com/pact-foundation/pact-js-core/issues/393)) ([f77dd65](https://github.com/pact-foundation/pact-js-core/commit/f77dd654a5546705f1b0b859f18eaa04879a3915))

### [13.7.3](https://github.com/pact-foundation/pact-js-core/compare/v13.7.2...v13.7.3) (2022-08-12)


### Fixes and Improvements

* update the argument validation and function mapping for ffi verification ([#391](https://github.com/pact-foundation/pact-js-core/issues/391)) ([fee85e1](https://github.com/pact-foundation/pact-js-core/commit/fee85e1d1fcd63b81c3d2d0f86ab9691975873e6))

### [13.7.2](https://github.com/pact-foundation/pact-js-core/compare/v13.7.1...v13.7.2) (2022-08-11)


### Fixes and Improvements

* **verifier:** Fix issue where using custom provider headers would cause a crash (fixes [#388](https://github.com/pact-foundation/pact-js-core/issues/388)) ([c4f60f2](https://github.com/pact-foundation/pact-js-core/commit/c4f60f2e9a4955d744e457c8d47245c3776af2a3))

### [13.7.1](https://github.com/pact-foundation/pact-js-core/compare/v13.7.0...v13.7.1) (2022-08-09)


### Fixes and Improvements

* map pactflow command to correct binary / add tests ([31f4df9](https://github.com/pact-foundation/pact-js-core/commit/31f4df935fcb92d2b8ab0f473ca282a8aa3fa76c))

## [13.7.0](https://github.com/pact-foundation/pact-js-core/compare/v13.6.2...v13.7.0) (2022-08-09)


### Features

* expose pactflow pact-ruby-standalone command ([d9f9fc7](https://github.com/pact-foundation/pact-js-core/commit/d9f9fc7508f5c2dbcb61f6ed0c32e7acb1d4bd9e))

### [13.6.2](https://github.com/pact-foundation/pact-js-core/compare/v13.6.1...v13.6.2) (2022-07-06)


### Fixes and Improvements

* update standalone to 1.89.02-rc1 ([#382](https://github.com/pact-foundation/pact-js-core/issues/382)) ([8d9b664](https://github.com/pact-foundation/pact-js-core/commit/8d9b664bac280b83c587665a8a6b576feb6335a1))

### [13.6.1](https://github.com/pact-foundation/pact-js-core/compare/v13.6.0...v13.6.1) (2022-07-04)


### Fixes and Improvements

* send NUL terminated strings to pactffi_message_with_contents for non-binary payloads ([ac4557c](https://github.com/pact-foundation/pact-js-core/commit/ac4557c23f5ea2af1ec3b8e384ea8765dc3bbdb6))
* update standalone to 1.88.91-rc4 ([#378](https://github.com/pact-foundation/pact-js-core/issues/378)) ([f9344ea](https://github.com/pact-foundation/pact-js-core/commit/f9344ea65bd6aecab08660a209dd04a8b757ceb4))
* update standalone to 1.89.01-rc1 ([#381](https://github.com/pact-foundation/pact-js-core/issues/381)) ([8f70fa3](https://github.com/pact-foundation/pact-js-core/commit/8f70fa3f40efeffe9eb88ec63f34dacb845cd49f))

## [13.6.0](https://github.com/pact-foundation/pact-js-core/compare/v13.5.1...v13.6.0) (2022-03-21)


### Features

* add plugin consumer native methods ([aeef054](https://github.com/pact-foundation/pact-js-core/commit/aeef0545d558485dffb29a2621649d393be12dd2))
* add plugin to consumer interfaces ([ea0f536](https://github.com/pact-foundation/pact-js-core/commit/ea0f5367a5ec909ccdfcb930f47ee4d867190784))
* add test for protobufs/plugin ([6bf78d8](https://github.com/pact-foundation/pact-js-core/commit/6bf78d89d1cd4ec6e41daaed73bf19b037a0d0e7))
* bump native version to 0.1.6 ([d59d1a6](https://github.com/pact-foundation/pact-js-core/commit/d59d1a6cb155acb3e831a9754cc6afee0a00a780))
* message pact interface ([76baab8](https://github.com/pact-foundation/pact-js-core/commit/76baab873fad0d9fd6f8cfdb7fe1667441fc1454))
* support custom provider headers in verification ([d63e1a9](https://github.com/pact-foundation/pact-js-core/commit/d63e1a90975434416985d8d9046a2c633dc9f130))


### Fixes and Improvements

* correct arguments for source with selectors ([dd7ef00](https://github.com/pact-foundation/pact-js-core/commit/dd7ef007eb2b68083d39020d7c92058fce692cf8))
* download cpp header and c header ([bbc2321](https://github.com/pact-foundation/pact-js-core/commit/bbc2321c9eae77a543d132c9d39509df11f7b142))
* native builds failing on windows ([4e27713](https://github.com/pact-foundation/pact-js-core/commit/4e27713ec393c1bf140212faa3dd778b7077865c))
* remove dead code, fix bug in URL vs file handling ([dcd53e0](https://github.com/pact-foundation/pact-js-core/commit/dcd53e08e0dfa6dc3be71ea0bbc95eb327939225))
* remove overall verification timeout (see https://github.com/pact-foundation/pact-js/issues/761) ([bb52158](https://github.com/pact-foundation/pact-js-core/commit/bb521587d7c411ea78520733c3178dd92945b89b))
* update rust core to 0.2.4 ([7407333](https://github.com/pact-foundation/pact-js-core/commit/7407333a0382ae4a6f1d90d427e5f76ea4bbc506))
* upgrade to ffi 0.2.2 ([6e4b758](https://github.com/pact-foundation/pact-js-core/commit/6e4b75814c7e8a32598e5a08d871f99b77e203b9))
* x-platform binary consumer spec ([1a81ed4](https://github.com/pact-foundation/pact-js-core/commit/1a81ed408b916ddd4c63c31b8580780382955e2a))

### [13.5.1](https://github.com/pact-foundation/pact-js-core/compare/v13.5.0...v13.5.1) (2022-03-15)


### Fixes and Improvements

* update standalone to 1.88.83 ([423817d](https://github.com/pact-foundation/pact-js-core/commit/423817dced532fbe9671b267f31b244d3d246d2f))

## [13.5.0](https://github.com/pact-foundation/pact-js-core/compare/v13.4.1...v13.5.0) (2022-02-21)


### Features

* collect usage telemetry data ([f97e114](https://github.com/pact-foundation/pact-js-core/commit/f97e1149d0612574374f70e9b0a1857149abbf69))


### Fixes and Improvements

* prettier ([8f4e364](https://github.com/pact-foundation/pact-js-core/commit/8f4e364950f38c9f8750f3a072a12b1ff54231cc))
* update standalone to 1.88.82 ([1946ada](https://github.com/pact-foundation/pact-js-core/commit/1946ada84b52ac62f332c2d7e421c8efced13753))

### [13.4.1](https://github.com/pact-foundation/pact-js-core/compare/v13.4.0...v13.4.1) (2021-12-16)


### Fixes and Improvements

* update standalone to 1.88.81 ([9abfa06](https://github.com/pact-foundation/pact-js-core/commit/9abfa06e7c1c7c3fa58d19f985e1cdfe6b224bdb))

## [13.4.0](https://github.com/pact-foundation/pact-js-core/compare/v13.3.0...v13.4.0) (2021-12-14)


### Features

* Add buildUrl option to Pact Broker Publishing API ([58be64a](https://github.com/pact-foundation/pact-js-core/commit/58be64a20d0ebc203e36f489580b77e6e583bea6))


### Fixes and Improvements

* update standalone to 1.88.80 ([c0332e8](https://github.com/pact-foundation/pact-js-core/commit/c0332e81e8ce61f24c131fa61028034314f2c21d))

## [13.3.0](https://github.com/pact-foundation/pact-js-core/compare/v13.2.1...v13.3.0) (2021-10-29)


### Features

* Add new branch consumerVersionSelector options to verifier ([c3872be](https://github.com/pact-foundation/pact-js-core/commit/c3872be506d96f1ec40bfeb273b0ffc0ae6400e2))


### Fixes and Improvements

* Bump version of Pact FFI to 0.0.3 ([bc74026](https://github.com/pact-foundation/pact-js-core/commit/bc7402677c6436fbbaf560f094e1259d58e49f4c))
* update standalone to 1.88.78 ([cb25136](https://github.com/pact-foundation/pact-js-core/commit/cb2513678dc30a7fd188bdb800e78898bb299f3b))

### [13.2.1](https://github.com/pact-foundation/pact-js-core/compare/v13.2.0...v13.2.1) (2021-10-18)


### Fixes and Improvements

* **publisher:** Fix an issue that caused the publisher API to reject with the most recent binaries (As an aside, the recommended approach is to use the CLI not the API for almost all use cases- see the examples for more details) ([4a100bb](https://github.com/pact-foundation/pact-js-core/commit/4a100bbc72e3b31ef9663aed78617b8954be784c))
* Substantially improve error messages if the pact publisher API fails ([81d3511](https://github.com/pact-foundation/pact-js-core/commit/81d35115489e2960d6517d856593de28b54d2d12))

## [13.2.0](https://github.com/pact-foundation/pact-js-core/compare/v13.1.7...v13.2.0) (2021-10-16)


### Features

* Add a beta interface to the FFI / V3 Consumer tests. Try it out with `import { makeConsumerPact } from 'pact-core/src/consumer'` ([46d6667](https://github.com/pact-foundation/pact-js-core/commit/46d6667b58abacc007a4c1736d8c2f861ec5a487))
* Revert the consumer changes until the issues with node 14 are fixed (the release notes about the V3 consumer support in this release are not true, sorry) ([dc5217d](https://github.com/pact-foundation/pact-js-core/commit/dc5217da5bbee79024439526fdfc72da279d01ec))


### Fixes and Improvements

* Pass logLevel down to the native consumer ([88b329c](https://github.com/pact-foundation/pact-js-core/commit/88b329c4857f0777881574f50ae31e42c8764a8c))
* Pin standalone version back to the last known good version 1.88.66 ([77eab71](https://github.com/pact-foundation/pact-js-core/commit/77eab71aa0bf6183398b0787e5c370f2b20a9a2d))
* update standalone to 1.88.68 ([5f38729](https://github.com/pact-foundation/pact-js-core/commit/5f38729e523430c1ed7fdd863c53ef4a71800f54))
* update standalone to 1.88.69 ([ceb7071](https://github.com/pact-foundation/pact-js-core/commit/ceb7071e55bfb8d303233dfc95f1fd65ef6d6c8f))
* update standalone to 1.88.70 ([138a2c4](https://github.com/pact-foundation/pact-js-core/commit/138a2c4ba7223c442299d7fdb4cde023bbd09a50))
* update standalone to 1.88.71 ([850178d](https://github.com/pact-foundation/pact-js-core/commit/850178dc093e2b7e883920363234d3672d02d4c9))
* update standalone to 1.88.72 ([f8d0d0f](https://github.com/pact-foundation/pact-js-core/commit/f8d0d0fa9e9faff5c5dd772b8ccc7805b4c2afaa))
* update standalone to 1.88.73 ([4ba164d](https://github.com/pact-foundation/pact-js-core/commit/4ba164d11255f20ec699de0c5f0056f8a435c58c))
* update standalone to 1.88.75 ([c2fc6ac](https://github.com/pact-foundation/pact-js-core/commit/c2fc6acd19a4d5894a95ef4e5ac7c2959dddc2d6))
* update standalone to 1.88.76 ([eea5c54](https://github.com/pact-foundation/pact-js-core/commit/eea5c54d653da982b540e2cc6315cef40c5a501d))
* update standalone to 1.88.77 ([9659f35](https://github.com/pact-foundation/pact-js-core/commit/9659f35603dc9c89f698561c95c4fb30880c8f66))
* **verifier:** Correctly pass down log levels to the native core ([c11ce75](https://github.com/pact-foundation/pact-js-core/commit/c11ce75dffaf6d1932decdd3e275e7b54cf817aa))
* **verifier:** Correctly pass down log levels to the native core ([13d5ded](https://github.com/pact-foundation/pact-js-core/commit/13d5ded36e5fbb1e1fa4654affff58ed67a6f190))
* Warn if broker arguments are set without a broker URL and ignore the argument (fixes pact-foundation/pact-js[#760](https://github.com/pact-foundation/pact-js-core/issues/760)) ([17d3eb1](https://github.com/pact-foundation/pact-js-core/commit/17d3eb1629256828d3162a46d078087dd6ef7b91))

### [13.1.7](https://github.com/pact-foundation/pact-js-core/compare/v13.1.6...v13.1.7) (2021-09-22)


### Fixes and Improvements

* Bump version of libpact_ffi to 0.0.2 ([490249c](https://github.com/pact-foundation/pact-js-core/commit/490249caceaf65659c629d7c42590ff46fa97115))
* Verifier now accepts explicitly setting options to undefined (it will ignore and warn). This fixes a regression introduced in beta-45 ([7521c61](https://github.com/pact-foundation/pact-js-core/commit/7521c6121ec0523795c97ec5c422c3b6d6024dd8))

### [13.1.6](https://github.com/pact-foundation/pact-js-core/compare/v13.1.5...v13.1.6) (2021-09-14)


### Fixes and Improvements

* **verifier:** Correct the way that authentication tokens are sent to the verifier ([4902db7](https://github.com/pact-foundation/pact-js-core/commit/4902db73fcd334647b246cd03c9e979ca024b069))

### [13.1.5](https://github.com/pact-foundation/pact-js-core/compare/v13.1.4...v13.1.5) (2021-09-09)


### Fixes and Improvements

* add disableSslVerification option to verifier ([f354d8a](https://github.com/pact-foundation/pact-js-core/commit/f354d8a2052ef52ed2066bffcc18b3e022ca44d0))
* update standalone to 1.88.66 ([#320](https://github.com/pact-foundation/pact-js-core/issues/320)) ([92f0532](https://github.com/pact-foundation/pact-js-core/commit/92f0532af57757acfca01efae75cefd192de0a58))

### [13.1.4](https://github.com/pact-foundation/pact-js-core/compare/v13.1.3...v13.1.4) (2021-09-08)


### Fixes and Improvements

* Fix an issue that caused ENOENT on some platforms ([943484a](https://github.com/pact-foundation/pact-js-core/commit/943484a6feb8d015f95e8394b82d7f4a07a085f8))
* update standalone to 1.88.65 ([#319](https://github.com/pact-foundation/pact-js-core/issues/319)) ([3be38b4](https://github.com/pact-foundation/pact-js-core/commit/3be38b409ce4a88c115ce0938930b1edcc4bd9e0))

### [13.1.3](https://github.com/pact-foundation/pact-js-core/compare/v13.1.2...v13.1.3) (2021-09-06)


### Fixes and Improvements

* Add consumer version selectors for deployedOrReleased, deployed, released and environment ([#715](https://github.com/pact-foundation/pact-js-core/issues/715)) ([1bf3b22](https://github.com/pact-foundation/pact-js-core/commit/1bf3b225da0006ddfca61bd5773df2758f4b249a))

### [13.1.2](https://github.com/pact-foundation/pact-js-core/compare/v13.1.1...v13.1.2) (2021-09-06)


### Fixes and Improvements

* Don't create logger on each log call, so that frameworks that check for imports after teardown (jest) don't throw errors deep inside pino ([c5cf077](https://github.com/pact-foundation/pact-js-core/commit/c5cf07796a564fd1d70cafcd6d705d8b3e81a3f7))

### [13.1.1](https://github.com/pact-foundation/pact-js-core/compare/v13.1.0...v13.1.1) (2021-09-06)


### Fixes and Improvements

* bump dependencies to fix a possible issue with a misbehaving pino ([fe09e4e](https://github.com/pact-foundation/pact-js-core/commit/fe09e4e1206eb38dd40fc15c472b2e6c491a8095))

## [13.1.0](https://github.com/pact-foundation/pact-js-core/compare/v13.0.1...v13.1.0) (2021-08-26)


### Features

* The new verifier now works on windows too ([#316](https://github.com/pact-foundation/pact-js-core/issues/316)) ([072e080](https://github.com/pact-foundation/pact-js-core/commit/072e080fcec01bfb07747f152e4d93f47cddb33d))


### Fixes and Improvements

* correct ffi library name on windows ([814ed9c](https://github.com/pact-foundation/pact-js-core/commit/814ed9c0f8e030555a2a47f2f9f89299ccf4cdca))

### [13.0.1](https://github.com/pact-foundation/pact-js-core/compare/v13.0.0...v13.0.1) (2021-08-24)


### Fixes and Improvements

* expose needle types as a dependency to fix TS ([e8ad281](https://github.com/pact-foundation/pact-js-core/commit/e8ad281839c4f888507d08c8c2e55825c4ec33e6))

## [13.0.0](https://github.com/pact-foundation/pact-js-core/compare/v11.1.1...v13.0.0) (2021-08-24)


### ⚠ BREAKING CHANGES

* setLogLevel no longer accepts or returns a `number`
* The verbose option has been removed, as it is now implied by `logLevel` of `DEBUG` or `TRACE`
* All logging and reporting is now on standard out. This was the default before. This means the logDir / format / out options are no longer supported. If your ecosystem needs the ability to customise logging and reporting, please let us know by opening an issue.
* The undocumented option monkeypatch has been removed. The use cases for this feature are mostly covered by other options.
* customProviderHeaders has been removed. Please see the request [filter documentation](https://github.com/pact-foundation/pact-js#modify-requests-prior-to-verification-request-filters) in pact-js.

### Features

* include standalone binaries in released package ([eedeb18](https://github.com/pact-foundation/pact-js-core/commit/eedeb187ad0d0fd4bdae72af0dc01dd21d09488a))
* Use the native ffi bindings for the Verifier instead of the ruby bindings ([119c3ce](https://github.com/pact-foundation/pact-js-core/commit/119c3ce764392070d255f04959333100f07f6be2))


* Add migration docs and update readme ([e589c01](https://github.com/pact-foundation/pact-js-core/commit/e589c01116f3a6cf6c6b1a65e2ba31e2e3e2d00e))
* Refactor logger to make it easier to use ffi logs ([c650192](https://github.com/pact-foundation/pact-js-core/commit/c650192d4e83ce342bba4f84ce8b43d573827bda))


### Fixes and Improvements

* Correct exposed log levels to 'debug' | 'error' | 'info' | 'trace' | 'warn'. ([4a6f573](https://github.com/pact-foundation/pact-js-core/commit/4a6f5737f9b6d568e6f97273e41299caaa0105de))
* Expose logger as a base level export ([5686a66](https://github.com/pact-foundation/pact-js-core/commit/5686a66a8c4906b0146f31456bd9afee56de8c80))
* Print warnings if 'latest' is used as a tag during verification ([ddd516d](https://github.com/pact-foundation/pact-js-core/commit/ddd516d639b12c31f3b7f5cfbcbb859f16c40f85))
* Remove some unnecessary files from the npm package ([60c4aa1](https://github.com/pact-foundation/pact-js-core/commit/60c4aa1f28130c7e0764ff8ca7ed1a14f1dc81dc))
* Use the new pact_ffi instead of the verifier-only one ([5d2f364](https://github.com/pact-foundation/pact-js-core/commit/5d2f3640e7856eabf2ba355d0fcfb8b5790fa2fe))

### [11.1.1](https://github.com/pact-foundation/pact-js-core/compare/v11.1.0...v11.1.1) (2021-08-11)


### Fixes and Improvements

* Avoid throwing an exception if needle can't connect to the mock service during polling (may fix [#314](https://github.com/pact-foundation/pact-js-core/issues/314)) ([74a2cde](https://github.com/pact-foundation/pact-js-core/commit/74a2cde1a48566fb7ccf8ed91e5b1902e8715c32))
* package.json & package-lock.json to reduce vulnerabilities ([1a1439c](https://github.com/pact-foundation/pact-js-core/commit/1a1439c7d25f136307d43ff3818682377868e6a6))
* package.json & package-lock.json to reduce vulnerabilities ([44bd189](https://github.com/pact-foundation/pact-js-core/commit/44bd189fff0303922e6fb04ac60de0fc1f39f7cf))
* update standalone to 1.88.63 ([240ea6c](https://github.com/pact-foundation/pact-js-core/commit/240ea6cb2274cead6705557d61907949996053d3))

## [11.1.0](https://github.com/pact-foundation/pact-js-core/compare/v11.0.1...v11.1.0) (2021-08-02)


### Features

* improve m1 support (via rosetta2) ([92bd98b](https://github.com/pact-foundation/pact-js-core/commit/92bd98b15e55c1ba603355fa9d0d57c3ce3fdd23))


### Fixes and Improvements

* Replace request with needle ([b053e54](https://github.com/pact-foundation/pact-js-core/commit/b053e54e7ee313d0bd165f178e55108b1dd58052))
* update standalone to 1.88.58 ([b95b6ae](https://github.com/pact-foundation/pact-js-core/commit/b95b6aeb4198c2f32ebdc40adb9a6322a451fc42))
* update standalone to 1.88.61 ([019af87](https://github.com/pact-foundation/pact-js-core/commit/019af87cf72d1991313e82663d5530692fd2e42d))

## [12.0.0-beta.0](https://github.com/pact-foundation/pact-js-core/compare/v11.0.1...v12.0.0-beta.0) (2021-06-28)


### ⚠ BREAKING CHANGES

* The verbose option has been removed, as it is now implied by `logLevel` of `DEBUG` or `TRACE`
* All logging and reporting is now on standard out. This was the default before. This means the logDir / format / out options are no longer supported. If your ecosystem needs the ability to customise logging and reporting, please let us know by opening an issue.
* The undocumented option monkeypatch has been removed. The use cases for this feature are mostly covered by other options.
* customProviderHeaders has been removed. Please see the request [filter documentation](https://github.com/pact-foundation/pact-js#modify-requests-prior-to-verification-request-filters) in pact-js.

### Features

* Use the native ffi bindings for the Verifier instead of the ruby bindings ([1aea16f](https://github.com/pact-foundation/pact-js-core/commit/1aea16f0760b68661db4ee4500ec4e00dbe408fd))


* Add migration docs and update readme ([6bd0df0](https://github.com/pact-foundation/pact-js-core/commit/6bd0df07bd85c4ccef34ea0149e192b11aead1a2))

### [11.0.1](https://github.com/pact-foundation/pact-js-core/compare/v11.0.0...v11.0.1) (2021-06-21)


### Fixes and Improvements

* Allow the user to specify the timeout (Fixes [#298](https://github.com/pact-foundation/pact-js-core/issues/298)) ([4c77ddb](https://github.com/pact-foundation/pact-js-core/commit/4c77ddb7071672050fd682e27992b37cb0682bb6))
* update standalone to 1.88.56 ([81821fc](https://github.com/pact-foundation/pact-js-core/commit/81821fcd53649aedd242c9a2a4578b16c4c1fcd6))

## [11.0.0](https://github.com/pact-foundation/pact-js-core/compare/v10.12.1...v11.0.0) (2021-05-21)


### ⚠ BREAKING CHANGES

* All the interfaces that previously returned `q.Promise` have now been replaced with native es6 `Promise`s. Calling code will need to be updated.
* All options deprecated in previous versions have been removed. Migration instructions:

* In `VerifierOptions`: replace use of `tags`, `consumerVersionTag` and `providerVersionTag` with the appropriate `consumerVersionTags` or `providerVersionTags` option.

* The following classes have had their `.create(options)` removed. Please use the appropriate constructor instead (for example, `new Verifier(options)`)
    * `Verifier`
    * `Publisher`
    * `Server`
    * `Stub`
* **docs:** The type for consumer version selectors in the verifier has been corrected. This will affect typescript users who were using consumerVersionSelectors with the fields `pacticipant`, `all` or `version`. These fields never worked, and now will no longer compile in typescript. The correct type is:

```
ConsumerVersionSelector {
  tag?: string;
  latest?: boolean;
  consumer?: string;
  fallbackTag?: string;
}
```

Note that `pacticipant`, `version` and `all` have been removed. Existing code that uses `pacticipant` needs to use `consumer` instead. The other fields can be dropped. Any questions, please reach out to us at https://slack.pact.io/
* fix https://github.com/pact-foundation/pact-js-core/issues/285

* **docs:** Add description of consumer version selectors to the documentation. ([1bdb45d](https://github.com/pact-foundation/pact-js-core/commit/1bdb45dfb82bfb2dcf4a01f88f2f2206681e3913))


### Fixes and Improvements

* ConsumerVersionSelector interface ([b1e5afe](https://github.com/pact-foundation/pact-js-core/commit/b1e5afeea5a6f5ad6265a0a08bf4c4976a99e6dc))
* Replace `q` ith native `Promise` ([a5076cc](https://github.com/pact-foundation/pact-js-core/commit/a5076cc974c052ab9d281c86d90c136ea00f0f84))
* The verifier option `providerStatesSetupUrl` is no longer deprecated. Other deprecated options have been removed. ([95b88e0](https://github.com/pact-foundation/pact-js-core/commit/95b88e084bf66d97717a99ac4ebf800c8116bc68))
* update standalone to 1.88.46 ([e9f2b43](https://github.com/pact-foundation/pact-js-core/commit/e9f2b431b1118396c27814daaa0cfd4f538ea138))
* update standalone to 1.88.47 ([5626f3b](https://github.com/pact-foundation/pact-js-core/commit/5626f3bcb92ce3c7141373232e4ec3701d8ae2d8))
* update standalone to 1.88.48 ([14e31cf](https://github.com/pact-foundation/pact-js-core/commit/14e31cf812fd7f11fe84e130bcff4c50d0ff64de))
* update standalone to 1.88.49 ([cb088ce](https://github.com/pact-foundation/pact-js-core/commit/cb088ce64d670ce5babadfec53d561e00d9ad8ff))
* update standalone to 1.88.50 ([ce92950](https://github.com/pact-foundation/pact-js-core/commit/ce9295023b05df140b7575a6d910add55e62639c))
* update standalone to 1.88.51 ([de83a99](https://github.com/pact-foundation/pact-js-core/commit/de83a99b1574d868557f7eba6069c4d9a84279e5))

### [10.12.2](https://github.com/pact-foundation/pact-js-core/compare/v10.12.1...v10.12.2) (2021-04-20)


### Fixes and Improvements

* update standalone to 1.88.46 ([e9f2b43](https://github.com/pact-foundation/pact-js-core/commit/e9f2b431b1118396c27814daaa0cfd4f538ea138))
* update standalone to 1.88.47 ([5626f3b](https://github.com/pact-foundation/pact-js-core/commit/5626f3bcb92ce3c7141373232e4ec3701d8ae2d8))
* update standalone to 1.88.48 ([14e31cf](https://github.com/pact-foundation/pact-js-core/commit/14e31cf812fd7f11fe84e130bcff4c50d0ff64de))
* update standalone to 1.88.49 ([cb088ce](https://github.com/pact-foundation/pact-js-core/commit/cb088ce64d670ce5babadfec53d561e00d9ad8ff))

### [10.12.1](https://github.com/pact-foundation/pact-js-core/compare/v10.12.0...v10.12.1) (2021-03-31)


### Fixes and Improvements

* package.json & package-lock.json to reduce vulnerabilities ([8d76550](https://github.com/pact-foundation/pact-js-core/commit/8d76550a4dffcbf3fad477457b736a8ad09d05dd))
* update standalone to 1.88.41 ([3916c88](https://github.com/pact-foundation/pact-js-core/commit/3916c886698feef0deb786a944c2b1d9004c0c0a))
* update standalone to 1.88.45 ([fcab9f8](https://github.com/pact-foundation/pact-js-core/commit/fcab9f8aa9b9532026194799b68bf6df32b78272))

## [10.12.0](https://github.com/pact-foundation/pact-js-core/compare/v10.11.11...v10.12.0) (2021-03-05)


### Features

* **package-name:** Pact-node renamed to pact-core ([700ad09](https://github.com/pact-foundation/pact-js-core/commit/700ad099cebafdb5189e4cb8c09ed0131f24afc4))

### [10.11.11](https://github.com/pact-foundation/pact-node/compare/v10.11.10...v10.11.11) (2021-02-28)


### Fixes and Improvements

* update standalone to 1.88.40 ([618fb9d](https://github.com/pact-foundation/pact-node/commit/618fb9de5790de9484b4c32f0103c2f754f843e9))

### [10.11.10](https://github.com/pact-foundation/pact-node/compare/v10.11.9...v10.11.10) (2021-02-25)


### Fixes and Improvements

* update standalone to 1.88.38 ([de4aaf2](https://github.com/pact-foundation/pact-node/commit/de4aaf27932fdbd3707e0aa79f3d659cdfe0a870))

### [10.11.9](https://github.com/pact-foundation/pact-node/compare/v10.11.8...v10.11.9) (2021-02-24)


### Fixes and Improvements

* 🐛 only download binary if PACT_SKIP_BINARY_INSTALL is true ([69cbba0](https://github.com/pact-foundation/pact-node/commit/69cbba0f4800da79e01d594e5b1e0c3556c09551))

### [10.11.8](https://github.com/pact-foundation/pact-node/compare/v10.11.7...v10.11.8) (2021-02-09)


### Fixes and Improvements

* **install:** Use the current working directory instead of the installed directory when finding package.json (Fixes [#234](https://github.com/pact-foundation/pact-node/issues/234)) ([30c41dc](https://github.com/pact-foundation/pact-node/commit/30c41dc422e466b67ecf79ba31408f1caca999df))

### [10.11.7](https://github.com/pact-foundation/pact-node/compare/v10.11.6...v10.11.7) (2021-02-02)


### Fixes and Improvements

* **logger:** Log output now correctly reads pact-node instead of pact ([c9f22e1](https://github.com/pact-foundation/pact-node/commit/c9f22e16fe406a8474dbcae0c7a5dbf2a473881e))
* update standalone to 1.88.37 ([383eb8a](https://github.com/pact-foundation/pact-node/commit/383eb8aa30340dc5c4e2293a23b3ae42a60a3eb6))

### [10.11.6](https://github.com/pact-foundation/pact-node/compare/v10.11.5...v10.11.6) (2021-02-01)


### Fixes and Improvements

* **types:** Correctly export logger type (in the future we should use our own type) ([a4f766f](https://github.com/pact-foundation/pact-node/commit/a4f766f21a296baf737fb46c8e6c40a70652cdb8))

### [10.11.5](https://github.com/pact-foundation/pact-node/compare/v10.11.4...v10.11.5) (2021-02-01)


### Fixes and Improvements

* update standalone to 1.88.36 ([22e8414](https://github.com/pact-foundation/pact-node/commit/22e8414dc5604f2a8b2c221a04fa6cd8d481f2ff))
* **can-i-deploy:** Can-i-deploy now prints a warning instead of failing if additional output is produced alongside the json ([364afb2](https://github.com/pact-foundation/pact-node/commit/364afb2cdb9ffab6e3dd6312c3854439c172c3cb))
* **logger:** Imply verbose mode when log level is debug or trace ([814d4fb](https://github.com/pact-foundation/pact-node/commit/814d4fbe83e598748057c1b5f40b3bef60b86434))
* **logger:** Now pact-node and ruby use the same logLevel if specified ([513a60d](https://github.com/pact-foundation/pact-node/commit/513a60d00ec8dce8176a592941923b41e1938853))
* **logging:** Only log entire environment when log level is trace, not debug ([c3b9f5f](https://github.com/pact-foundation/pact-node/commit/c3b9f5fa84b80ccaeb49345b857346b8095f07b1))

### [10.11.4](https://github.com/pact-foundation/pact-node/compare/v10.11.3...v10.11.4) (2021-01-28)


### Fixes and Improvements

* update standalone to 1.88.35 ([d8dfe39](https://github.com/pact-foundation/pact-node/commit/d8dfe393671ae74c7f743b537a9e75f6a52656d0))

### [10.11.3](https://github.com/pact-foundation/pact-node/compare/v10.11.2...v10.11.3) (2021-01-28)


### Fixes and Improvements

* update standalone to 1.88.34 ([cba5625](https://github.com/pact-foundation/pact-node/commit/cba5625148e7ea733aeb1cdd4a6e24b4eebb6091))

### [10.11.2](https://github.com/pact-foundation/pact-node/compare/v10.11.1...v10.11.2) (2021-01-27)


### Fixes and Improvements

* **message:** Change the way pact-message is invoked which should avoid some issues in Windows environments ([92185b0](https://github.com/pact-foundation/pact-node/commit/92185b06db955c3e194317cffde8e27954b7ac9f))
* update standalone to 1.88.33 ([d42e348](https://github.com/pact-foundation/pact-node/commit/d42e3487d58b5f37a71d2d8b0692669af1035ff5))

### [10.11.1](https://github.com/pact-foundation/pact-node/compare/v10.11.0...v10.11.1) (2021-01-04)


### Bug Fixes

* **message:** Fixed an issue where message pacts could not be created on some platforms ([a092ed9](https://github.com/pact-foundation/pact-node/commit/a092ed904b43c132c00efd6c5e371faef9ea6e97))

## [10.11.0](https://github.com/pact-foundation/pact-node/compare/v10.10.2...v10.11.0) (2020-10-22)


### Features

* **install:** Binary install can be skipped by setting PACT_SKIP_BINARY_INSTALL=true ([4d6b194](https://github.com/pact-foundation/pact-node/commit/4d6b1945a58efa2b56b9b39dd3214e29c1637228))

### [10.10.2](https://github.com/pact-foundation/pact-node/compare/v10.10.1...v10.10.2) (2020-10-19)


### Bug Fixes

* Correct the config for using custom ca file ([e83c895](https://github.com/pact-foundation/pact-node/commit/e83c8958a34d46d63403fe56402fd5b8d4d6a3c0))
* spelling in error message. ([c40170d](https://github.com/pact-foundation/pact-node/commit/c40170d39e3ad92749276c158cfa33e32b0be4a9))
* update standalone to 1.88.3 ([6e1c80b](https://github.com/pact-foundation/pact-node/commit/6e1c80b1316c5a79d18bdc497bb764bab7775fb9))

### [10.10.1](https://github.com/pact-foundation/pact-node/compare/v10.10.0...v10.10.1) (2020-08-26)


### Bug Fixes

* **server:** remove force-clone of options ([1a7a6e0](https://github.com/pact-foundation/pact-node/commit/1a7a6e02448ef7c0fb445658ff47a3ca445018f6))

## [10.10.0](https://github.com/pact-foundation/pact-node/compare/v10.9.7...v10.10.0) (2020-08-10)


### Features

* **logging:** Add logLevel to Stub options, and add logDir and logLevel to Verifier options ([acc0579](https://github.com/pact-foundation/pact-node/commit/acc057927e14a80dfa74554614f9a6d1fa29a005))


### Bug Fixes

* **deps:** Update vulnerable dependencies ([239c7a7](https://github.com/pact-foundation/pact-node/commit/239c7a73c3d04289c038bbef70b3d47a1db34d56))
* package.json & package-lock.json to reduce vulnerabilities ([70aa0f0](https://github.com/pact-foundation/pact-node/commit/70aa0f0ec8d2c861b1457cc31eb533e5259ba907))
* update standalone to 1.86.0 ([524a7dd](https://github.com/pact-foundation/pact-node/commit/524a7ddb3716e2e76b598e250131531a675899ad))

### [10.9.7](https://github.com/pact-foundation/pact-node/compare/v10.9.6...v10.9.7) (2020-07-17)


### Bug Fixes

* **deps:** update package and package-lock to fix vulnerabilties ([6566680](https://github.com/pact-foundation/pact-node/commit/65666805766e9ae71377351dcbb62b5098e0191c))

### [10.9.6](https://github.com/pact-foundation/pact-node/compare/v10.9.5...v10.9.6) (2020-06-29)


### Bug Fixes

* **deps:** Update vulnerable dependencies ([d210c1b](https://github.com/pact-foundation/pact-node/commit/d210c1bcd3725f617c531b4338054cf1dabbb68a))

## [10.9.5](https://github.com/pact-foundation/pact-node/compare/v10.9.4...v10.9.5) (2020-06-03)


### Bug Fixes

* update standalone to 1.85.0 ([acb9aa9](https://github.com/pact-foundation/pact-node/commit/acb9aa9f8431939670e0dffa6a4a6c75c7f8152c))



## [10.9.4](https://github.com/pact-foundation/pact-node/compare/v10.9.3...v10.9.4) (2020-05-04)


### Bug Fixes

* **options:** Stop validating values for logLevel, pactFileWriteMode and format. This means we'll immediately pick up changes to those options without needing to modify pact-node ([1319a86](https://github.com/pact-foundation/pact-node/commit/1319a86d87d4ffd60a58146150f62a96f4ef9f35))



## [10.9.3](https://github.com/pact-foundation/pact-node/compare/v10.9.2...v10.9.3) (2020-05-02)


### Bug Fixes

* update standalone to 1.84.0 ([9f2eb16](https://github.com/pact-foundation/pact-node/commit/9f2eb1695cbbf2d910a6691f777aa435ea0f1859))



## [10.9.2](https://github.com/pact-foundation/pact-node/compare/v10.9.1...v10.9.2) (2020-04-22)


### Bug Fixes

* update standalone to 1.83.0 ([0cfefb4](https://github.com/pact-foundation/pact-node/commit/0cfefb42d302615b9eb93f064458912f87222734))



## [10.9.1](https://github.com/pact-foundation/pact-node/compare/v10.9.0...v10.9.1) (2020-04-22)


### Bug Fixes

* consumerVersionSelector -> consumerVersionSelectors ([dab9507](https://github.com/pact-foundation/pact-node/commit/dab9507aae9acf00296933e5e0938e9a07cbbbf9))



# [10.9.0](https://github.com/pact-foundation/pact-node/compare/v10.8.1...v10.9.0) (2020-04-10)


### Bug Fixes

* **standalone:** update standalone to 1.82.3 ([#223](https://github.com/pact-foundation/pact-node/issues/223)) ([70fac35](https://github.com/pact-foundation/pact-node/commit/70fac353007e0ebc7b622415cd66bfe25e9c2d2f))


### Features

* **verifier:** Add support for includeWipPactsSince ([c691162](https://github.com/pact-foundation/pact-node/commit/c6911620695435b5e47c22bc0d526ca559e5a356))
* deprecate consumerVersionTag and providerVersionTag. Fixes [#218](https://github.com/pact-foundation/pact-node/issues/218) ([3e932bd](https://github.com/pact-foundation/pact-node/commit/3e932bd7c80a468a68dff21d7e4457732b5af234))



## [10.8.1](https://github.com/pact-foundation/pact-node/compare/v0.0.7...v10.8.1) (2020-04-08)


### Bug Fixes

* **standalone:** update standalone to 1.82.2 ([#220](https://github.com/pact-foundation/pact-node/issues/220)) ([ea85d0b](https://github.com/pact-foundation/pact-node/commit/ea85d0b96dc3f489cfc335ad0b7331e8de0494a2)), closes [pact-foundation/pact-ruby-standalone#49](https://github.com/pact-foundation/pact-ruby-standalone/issues/49)
* correcting the cafile setup for postinstall download ([a07e882](https://github.com/pact-foundation/pact-node/commit/a07e8824d6b5113cbddb4f1767b29020801de407))



# [10.8.0](https://github.com/pact-foundation/pact-node/compare/v10.7.1...v10.8.0) (2020-03-26)


### Features

* add consumer version selectors and pending pacts to verification ([59ab437](https://github.com/pact-foundation/pact-node/commit/59ab437b1155b26b6e25744a9defd507fd80fc70))



## [10.7.1](https://github.com/pact-foundation/pact-node/compare/v10.7.0...v10.7.1) (2020-03-23)


### Bug Fixes

* **standalone:** Bump version of pact-standalone to 1.82.1 (improved json diff, basic auth config improvements) ([bde0287](https://github.com/pact-foundation/pact-node/commit/bde02875b4fed127b3266917b1d38c51b2173255))



# [10.7.0](https://github.com/pact-foundation/pact-node/compare/v10.6.0...v10.7.0) (2020-03-23)


### Bug Fixes

* **deps:** Update vulnerable dependencies ([3c20366](https://github.com/pact-foundation/pact-node/commit/3c203660e157deb0380535fec870de1500a2da0c))


### Features

* **verifier:** Add verbose option to improve debugging during verification ([3f0a5a3](https://github.com/pact-foundation/pact-node/commit/3f0a5a344b0886423d7995605134430f61b52ae4))



# [10.6.0](https://github.com/pact-foundation/pact-node/compare/v10.5.0...v10.6.0) (2020-03-15)


### Bug Fixes

* remove tests, point directly to npm config settings for ca and StrictSSL ([ae36609](https://github.com/pact-foundation/pact-node/commit/ae366098c268339cebf91bc562a611360f0a68b1))
* set strictSSL on custom downloads from NPM config. Fixes [#211](https://github.com/pact-foundation/pact-node/issues/211) ([d264f0b](https://github.com/pact-foundation/pact-node/commit/d264f0b800209a171b320039e7fa3c2dd621606e))


### Features

* **upgrade:** update standalone to 1.82.0 ([92c3af3](https://github.com/pact-foundation/pact-node/commit/92c3af3bb158544ee921a8d0737197c0dd607ba6))



# [10.5.0](https://github.com/pact-foundation/pact-node/compare/v10.4.0...v10.5.0) (2020-03-02)


### Bug Fixes

* lint errors ([3786e13](https://github.com/pact-foundation/pact-node/commit/3786e1301424efd8abf67480dfe6bca7605c3f20))
* remove decompress dependency as it is highly vulnerable. Fixes [#208](https://github.com/pact-foundation/pact-node/issues/208) ([6956544](https://github.com/pact-foundation/pact-node/commit/69565441d5eebabba4db205b608b850f50646636))
* remove extracted binary folders on clean to avoid false positives ([7e8f76b](https://github.com/pact-foundation/pact-node/commit/7e8f76b59b8b375075971db95b7f48486d54d02e))
* use unzipper for .zip files, tar for tar.gz ([f6d8da0](https://github.com/pact-foundation/pact-node/commit/f6d8da07966a8d262aef5e6f21abafbb1a201e96))


### Features

* **upgrade:** update standalone to 1.81.0 ([21a1564](https://github.com/pact-foundation/pact-node/commit/21a1564110726bd9bdf17b734e18eb1fb08223b4))



# [10.4.0](https://github.com/pact-foundation/pact-node/compare/v10.3.1...v10.4.0) (2020-02-18)


### Features

* **upgrade:** update standalone to 1.80.1 ([1a2f517](https://github.com/pact-foundation/pact-node/commit/1a2f517))



## [10.3.1](https://github.com/pact-foundation/pact-node/compare/v10.3.0...v10.3.1) (2020-02-17)


### Bug Fixes

* missing api_key issue in travis https://travis-ci.community/t/missing-api-key-when-deploying-to-github-releases/5761/13 ([8f503b8](https://github.com/pact-foundation/pact-node/commit/8f503b8))



# [10.3.0](https://github.com/pact-foundation/pact-node/compare/v10.2.4...v10.3.0) (2020-02-14)


### Features

* add validation to broker token usage to avoid confusion ([2a4afa3](https://github.com/pact-foundation/pact-node/commit/2a4afa3))
* **upgrade:** update standalone to 1.79.0 ([f33cbb8](https://github.com/pact-foundation/pact-node/commit/f33cbb8))



## [10.2.4](https://github.com/pact-foundation/pact-node/compare/v10.2.3...v10.2.4) (2019-12-17)


### Bug Fixes

* **standalone:** Bump version of pact-standalone to 1.73.0; fixes [#183](https://github.com/pact-foundation/pact-node/issues/183) ([41bafad](https://github.com/pact-foundation/pact-node/commit/41bafad))



## [10.2.3](https://github.com/pact-foundation/pact-node/compare/v10.2.2...v10.2.3) (2019-12-11)


### Bug Fixes

* **spawn:** Improve debug log formatting ([977a845](https://github.com/pact-foundation/pact-node/commit/977a845))
* **spawn:** Now binaries are spawned directly with array arguments, rather than quoted strings. Should fix [#118](https://github.com/pact-foundation/pact-node/issues/118) ([378f256](https://github.com/pact-foundation/pact-node/commit/378f256))



## [10.2.2](https://github.com/pact-foundation/pact-node/compare/v10.2.1...v10.2.2) (2019-11-15)



## [10.2.1](https://github.com/pact-foundation/pact-node/compare/v10.2.0...v10.2.1) (2019-11-10)



# [10.2.0](https://github.com/pact-foundation/pact-node/compare/v10.0.1...v10.2.0) (2019-11-08)


### Features

* add provider version tag during verification ([68b17d8](https://github.com/pact-foundation/pact-node/commit/68b17d8))



# [10.1.0](https://github.com/pact-foundation/pact-node/compare/v10.0.1...v10.1.0) (2019-11-08)


### Features

* add provider version tag during verification ([68b17d8](https://github.com/pact-foundation/pact-node/commit/68b17d8))



## [10.0.1](https://github.com/pact-foundation/pact-node/compare/v10.0.0...v10.0.1) (2019-10-28)


### Bug Fixes

* **install:** Correctly skip downloading the binary archive if it already exists ([1c9a809](https://github.com/pact-foundation/pact-node/commit/1c9a809))
* **install:** Fail installation if binary was not successfully downloaded ([3dfb033](https://github.com/pact-foundation/pact-node/commit/3dfb033))
* **spawn:** The command used to spawn the binary is now debug rather than info (fixes [#184](https://github.com/pact-foundation/pact-node/issues/184)) ([a9f1470](https://github.com/pact-foundation/pact-node/commit/a9f1470))



# [10.0.0](https://github.com/pact-foundation/pact-node/compare/v9.0.7...v10.0.0) (2019-10-28)


### Features

* **can-i-deploy:** Add custom error type CannotDeployError for when the deploy check fails ([635b449](https://github.com/pact-foundation/pact-node/commit/635b449))
* **can-i-deploy:** allow multiple pacticipants to be specified to CanDeploy ([b4b3921](https://github.com/pact-foundation/pact-node/commit/b4b3921))
* **canDeploy:** resolve with output on success ([d20744e](https://github.com/pact-foundation/pact-node/commit/d20744e))
* **CanDeploy:** Set json output as the default for CanDeploy ([200abe7](https://github.com/pact-foundation/pact-node/commit/200abe7))


### BREAKING CHANGES

* **can-i-deploy:** Options for CanDeploy have changed. Now, pacticipants are specified by an array of { name: <string>, latest?: <string | boolean>, version?: <string> }, allowing more than one pacticipant to be specified. You must specify one of latest
or version. If latest is `true`, the latest pact is used. If it is string, then the latest pact with that tag is used.
* **CanDeploy:** CanDeploy now defaults to json output (and returns the parsed object as the result of the promise. If you were using CanDeploy and relied on parsing the logged output, you will need to explicitly set `output: table` in your CanDeploy options.



## [9.0.7](https://github.com/pact-foundation/pact-node/compare/v9.0.6...v9.0.7) (2019-10-23)


### Bug Fixes

* **package.json:** Move snyk to devDependencies ([#193](https://github.com/pact-foundation/pact-node/issues/193)) ([b3d7a8a](https://github.com/pact-foundation/pact-node/commit/b3d7a8a))



## [9.0.6](https://github.com/pact-foundation/pact-node/compare/v9.0.5...v9.0.6) (2019-10-10)


### Bug Fixes

* **verifier:** allow to use progress formatter during verification ([#189](https://github.com/pact-foundation/pact-node/issues/189)) ([2571725](https://github.com/pact-foundation/pact-node/commit/2571725))
* package.json, package-lock.json & .snyk to reduce vulnerabilities ([0dc7a8f](https://github.com/pact-foundation/pact-node/commit/0dc7a8f))



## [9.0.5](https://github.com/pact-foundation/pact-node/compare/v9.0.4...v9.0.5) (2019-10-08)


### Bug Fixes

* upgrade vulnerable dependencies ([e79f929](https://github.com/pact-foundation/pact-node/commit/e79f929))



## [9.0.4](https://github.com/pact-foundation/pact-node/compare/v9.0.3...v9.0.4) (2019-09-11)


### Bug Fixes

* **logging:** print options in json instead of using a helper ([9f09348](https://github.com/pact-foundation/pact-node/commit/9f09348))



## [9.0.3](https://github.com/pact-foundation/pact-node/compare/v9.0.2...v9.0.3) (2019-09-05)


### Bug Fixes

* Upgrade pact-standalone version to v1.70.2 ([3f0f1fc](https://github.com/pact-foundation/pact-node/commit/3f0f1fc))



## [9.0.2](https://github.com/pact-foundation/pact-node/compare/v9.0.1...v9.0.2) (2019-08-06)


### Bug Fixes

* Correct typo in verifier options mapping ([810bd77](https://github.com/pact-foundation/pact-node/commit/810bd77))
* **logging:** Print args for spawn binary correctly in debug output ([2b0ce9d](https://github.com/pact-foundation/pact-node/commit/2b0ce9d))



## [9.0.1](https://github.com/pact-foundation/pact-node/compare/v9.0.0...v9.0.1) (2019-08-05)


### Bug Fixes

* **server:** Maintain a private reference to the global `setTimeout` function in case that function is mocked in a consumer test (e.g. `sinon.useFakeTimers()`) ([#110](https://github.com/pact-foundation/pact-node/issues/110)) ([f4ebfff](https://github.com/pact-foundation/pact-node/commit/f4ebfff))



# [9.0.0](https://github.com/pact-foundation/pact-node/compare/v8.6.2...v9.0.0) (2019-07-16)


### Bug Fixes

* .snyk, package.json & package-lock.json to reduce vulnerabilities ([31e34a1](https://github.com/pact-foundation/pact-node/commit/31e34a1))
* prevent archive extracting as the wrong user when installling as root ([d0941b0](https://github.com/pact-foundation/pact-node/commit/d0941b0))


### Features

* introduce pact binary, and remove pact-cli (BREAKING CHANGE) ([884ce24](https://github.com/pact-foundation/pact-node/commit/884ce24))



## [8.6.2](https://github.com/pact-foundation/pact-node/compare/v8.6.0...v8.6.2) (2019-07-03)


### Bug Fixes

* **standalone:** Update pact-standalone version to obtain fix for https://github.com/pact-foundation/pact_broker-client/issues/50 ([e0a1921](https://github.com/pact-foundation/pact-node/commit/e0a1921))



## [8.6.1](https://github.com/pact-foundation/pact-node/compare/v8.6.0...v8.6.1) (2019-06-28)


### Bug Fixes

* **standalone:** Update pact-standalone version to obtain fix for https://github.com/pact-foundation/pact_broker-client/issues/50 ([e0a1921](https://github.com/pact-foundation/pact-node/commit/e0a1921))



# [8.6.0](https://github.com/pact-foundation/pact-node/compare/v8.5.1...v8.6.0) (2019-06-18)


### Features

* **verifier:** update to latest verifier ([9f328db](https://github.com/pact-foundation/pact-node/commit/9f328db))



## [8.5.1](https://github.com/pact-foundation/pact-node/compare/v8.5.0...v8.5.1) (2019-06-15)


### Bug Fixes

* **verifier:** --monkeypatch flag missing ([b1355bd](https://github.com/pact-foundation/pact-node/commit/b1355bd))



# [8.5.0](https://github.com/pact-foundation/pact-node/compare/v8.4.1...v8.5.0) (2019-06-12)


### Features

* **verifier:** update to latest verifier ([da3d1e3](https://github.com/pact-foundation/pact-node/commit/da3d1e3))



## [8.4.1](https://github.com/pact-foundation/pact-node/compare/v8.4.0...v8.4.1) (2019-06-06)


### Bug Fixes

* **cli:** propagate exit code in node CLI wrapper ([b961b79](https://github.com/pact-foundation/pact-node/commit/b961b79))



# [8.4.0](https://github.com/pact-foundation/pact-node/compare/v8.3.3...v8.4.0) (2019-05-30)


### Bug Fixes

* **mock:** fix q resolver in integration mocks ([6de02db](https://github.com/pact-foundation/pact-node/commit/6de02db))


### Features

* **binstubs:** expose pact standalone binaries as alternative CLI ([02f16cc](https://github.com/pact-foundation/pact-node/commit/02f16cc))
* **binstubs:** expose pact standalone binaries as alternative CLI ([5c164da](https://github.com/pact-foundation/pact-node/commit/5c164da))



## [8.3.3](https://github.com/pact-foundation/pact-node/compare/v8.3.2...v8.3.3) (2019-05-22)



## [8.3.2](https://github.com/pact-foundation/pact-node/compare/v8.3.1...v8.3.2) (2019-05-19)



## [8.3.1](https://github.com/pact-foundation/pact-node/compare/v8.3.0...v8.3.1) (2019-05-16)


### Bug Fixes

* Upgrade Caporal to fix vulnerability (Fixes [#159](https://github.com/pact-foundation/pact-node/issues/159)) ([6efa434](https://github.com/pact-foundation/pact-node/commit/6efa434))



# [8.3.0](https://github.com/pact-foundation/pact-node/compare/v8.2.0...v8.3.0) (2019-05-13)


### Features

* **can-deploy:** add broker token to can-deploy task ([#158](https://github.com/pact-foundation/pact-node/issues/158)) ([fad1e63](https://github.com/pact-foundation/pact-node/commit/fad1e63))



# [8.2.0](https://github.com/pact-foundation/pact-node/compare/v8.1.2...v8.2.0) (2019-04-26)


### Features

* **verifier:** update to latest verifier ([8637cae](https://github.com/pact-foundation/pact-node/commit/8637cae))



## [8.1.2](https://github.com/pact-foundation/pact-node/compare/v8.1.1...v8.1.2) (2019-04-11)


### Bug Fixes

* package.json to reduce vulnerabilities ([#151](https://github.com/pact-foundation/pact-node/issues/151)) ([181e5d8](https://github.com/pact-foundation/pact-node/commit/181e5d8))



## [8.1.1](https://github.com/pact-foundation/pact-node/compare/v8.1.0...v8.1.1) (2019-03-28)


### Bug Fixes

* specify User-Agent when downloading binaries ([a2a1698](https://github.com/pact-foundation/pact-node/commit/a2a1698)), closes [#149](https://github.com/pact-foundation/pact-node/issues/149)



# [8.1.0](https://github.com/pact-foundation/pact-node/compare/v8.0.0...v8.1.0) (2019-03-08)


### Features

* **publish:** add bearer token to publish ([3a411b4](https://github.com/pact-foundation/pact-node/commit/3a411b4))



# [8.0.0](https://github.com/pact-foundation/pact-node/compare/v6.21.4...v8.0.0) (2019-03-07)


### Features

* **verifier:** update to latest verifier ([888209b](https://github.com/pact-foundation/pact-node/commit/888209b))
* **verify:** support broker bearer token ([f060b78](https://github.com/pact-foundation/pact-node/commit/f060b78))


### BREAKING CHANGES

* **verifier:** removal of Broker class



## 7.0.1 (2019-03-06)


### Bug Fixes

* **package:** Update vulnerable packages ([#146](https://github.com/pact-foundation/pact-node/issues/146)) ([e8e5076](https://github.com/pact-foundation/pact-node/commit/e8e5076))



# 7.0.0 (2019-03-04)


### Bug Fixes

* **can-i-deploy:** Fixing can-i-deploy to only have a single participant at a time, but breaking API.  New major release. ([#144](https://github.com/pact-foundation/pact-node/issues/144)) ([2032ba2](https://github.com/pact-foundation/pact-node/commit/2032ba2))



## 6.21.5 (2019-02-26)



<a name="6.21.4"></a>
## [6.21.4](https://github.com/pact-foundation/pact-node/compare/6.21.3...6.21.4) (2019-02-09)



<a name="6.19.11"></a>
## [6.19.11](https://github.com/pact-foundation/pact-node/compare/v6.19.10...v6.19.11) (2018-08-21)



<a name="6.19.10"></a>
## [6.19.10](https://github.com/pact-foundation/pact-node/compare/v6.19.8...v6.19.10) (2018-08-13)



<a name="6.19.8"></a>
## [6.19.8](https://github.com/pact-foundation/pact-node/compare/6.19.7...6.19.8) (2018-07-28)



<a name="6.19.6"></a>
## [6.19.6](https://github.com/pact-foundation/pact-node/compare/v6.19.5...v6.19.6) (2018-07-13)



<a name="6.19.5"></a>
## [6.19.5](https://github.com/pact-foundation/pact-node/compare/6.19.4...6.19.5) (2018-07-13)


### Bug Fixes

* **binary-location:** Fixing failing tests on windows because the path.resolve would add 'C:\' to the front of the path, failing the expectation ([40f4d6d](https://github.com/pact-foundation/pact-node/commit/40f4d6d))



<a name="6.16.4"></a>
## [6.16.4](https://github.com/pact-foundation/pact-node/compare/6.16.3...6.16.4) (2018-05-10)



<a name="6.16.1"></a>
## [6.16.1](https://github.com/pact-foundation/pact-node/compare/6.16.0...6.16.1) (2018-05-08)



<a name="6.14.3"></a>
## [6.14.3](https://github.com/pact-foundation/pact-node/compare/v6.14.2...v6.14.3) (2018-04-17)


### Bug Fixes

* **verifier:** update error message if pactUrls not specified. Fixes [#78](https://github.com/pact-foundation/pact-node/issues/78) ([1e7bfda](https://github.com/pact-foundation/pact-node/commit/1e7bfda))



<a name="6.14.2"></a>
## [6.14.2](https://github.com/pact-foundation/pact-node/compare/v6.14.1...v6.14.2) (2018-04-05)



<a name="6.14.1"></a>
## [6.14.1](https://github.com/pact-foundation/pact-node/compare/v6.14.0...v6.14.1) (2018-04-04)



<a name="6.14.0"></a>
# [6.14.0](https://github.com/pact-foundation/pact-node/compare/v6.13.0...v6.14.0) (2018-03-30)


### Features

* **message:** add spec version to message type ([7839a12](https://github.com/pact-foundation/pact-node/commit/7839a12))



<a name="6.13.0"></a>
# [6.13.0](https://github.com/pact-foundation/pact-node/compare/6.12.3...6.13.0) (2018-03-27)


### Features

* **messages:** add Message Pact support ([980a3f5](https://github.com/pact-foundation/pact-node/commit/980a3f5))



<a name="6.10.0"></a>
# [6.10.0](https://github.com/pact-foundation/pact-node/compare/v6.9.0...v6.10.0) (2018-02-22)


### Features

* **upgrade:** upgrade pact standalone to 3.7.0 ([3b59836](https://github.com/pact-foundation/pact-node/commit/3b59836))



<a name="6.9.0"></a>
# [6.9.0](https://github.com/pact-foundation/pact-node/compare/v6.8.0...v6.9.0) (2018-02-20)


### Features

* **upgrade:** upgrade pact standalone to 3.6.0 ([0aa6f8f](https://github.com/pact-foundation/pact-node/commit/0aa6f8f))



<a name="6.8.0"></a>
# [6.8.0](https://github.com/pact-foundation/pact-node/compare/6.7.4...6.8.0) (2018-02-09)


### Features

* **upgrade:** upgrade pact standalone to 3.5.0 ([82928f1](https://github.com/pact-foundation/pact-node/commit/82928f1))



<a name="6.6.0"></a>
# [6.6.0](https://github.com/pact-foundation/pact-node/compare/v6.5.0...v6.6.0) (2017-12-13)


### Features

* **api:** add removeAll() interface to main API ([9306183](https://github.com/pact-foundation/pact-node/commit/9306183))
* **stub:** add basic stub support ([62185b5](https://github.com/pact-foundation/pact-node/commit/62185b5))



<a name="6.5.0"></a>
# [6.5.0](https://github.com/pact-foundation/pact-node/compare/v6.4.1...v6.5.0) (2017-12-10)


### Features

* **pactFileWriteMode:** add pactFileWriteMode to server. Fixes [#50](https://github.com/pact-foundation/pact-node/issues/50) ([0f8658b](https://github.com/pact-foundation/pact-node/commit/0f8658b))



<a name="6.4.1"></a>
## [6.4.1](https://github.com/pact-foundation/pact-node/compare/v6.4.0...v6.4.1) (2017-12-08)



<a name="6.4.0"></a>
# [6.4.0](https://github.com/pact-foundation/pact-node/compare/v6.3.0...v6.4.0) (2017-12-08)


### Features

* **upgrade:** upgrade pact standalone to 3.4.0 ([a77f9f7](https://github.com/pact-foundation/pact-node/commit/a77f9f7))



<a name="6.3.0"></a>
# [6.3.0](https://github.com/pact-foundation/pact-node/compare/v6.2.0...v6.3.0) (2017-12-04)


### Features

* **custom-headers:** allow user to specify custom headers during provider verification ([3797193](https://github.com/pact-foundation/pact-node/commit/3797193))



<a name="6.2.0"></a>
# [6.2.0](https://github.com/pact-foundation/pact-node/compare/v6.1.0...v6.2.0) (2017-12-04)


### Features

* **types:** re-export out common types for library use ([fa19b57](https://github.com/pact-foundation/pact-node/commit/fa19b57))



<a name="6.1.0"></a>
# [6.1.0](https://github.com/pact-foundation/pact-node/compare/6.0.0...6.1.0) (2017-12-03)


### Bug Fixes

* **lint:** add noImplicitThis to TS configuration ([eb17979](https://github.com/pact-foundation/pact-node/commit/eb17979))
* **lint:** fix noImplicitReturns TS issues ([5c57288](https://github.com/pact-foundation/pact-node/commit/5c57288))


### Features

* **types:** add support for TS 'strictNullChecks' ([76d8c38](https://github.com/pact-foundation/pact-node/commit/76d8c38))
* **types:** feedback from mboudreau ([e756592](https://github.com/pact-foundation/pact-node/commit/e756592))
* **types:** uplift code base to comply with noImplicitAny ([861ae89](https://github.com/pact-foundation/pact-node/commit/861ae89))



# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.
