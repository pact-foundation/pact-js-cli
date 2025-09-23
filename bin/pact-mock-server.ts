#!/usr/bin/env node

import { spawnSync, standalone } from '../src/pact-standalone';

const { error, status } = spawnSync(
  standalone().mockServerFullPath,
  process.argv.slice(2)
);
if (error) throw error;
process.exit(status as number);
