#!/usr/bin/env node

import { spawnSync, standalone } from '../src/pact-standalone';

const brokerArgs = process.argv.slice(2);
const { error, status } = spawnSync(standalone().pactFullPath, [
  'verifier',
  ...brokerArgs,
]);
if (error) throw error;
process.exit(status as number);
