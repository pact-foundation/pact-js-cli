#!/bin/sh

set -e

: "${1?Please supply the pact-cli version to upgrade to}"

PACT_CLI_VERSION=$1
TYPE=${2:-fix}
DASHERISED_VERSION=$(echo "${PACT_CLI_VERSION}" | sed 's/\./\-/g')
BRANCH_NAME="chore/upgrade-to-pact-cli-${DASHERISED_VERSION}"

git checkout main
git checkout src/install.ts
git pull origin main

git checkout -b "${BRANCH_NAME}"

cat src/install.ts | sed "s/export const PACT_CLI_VERSION.*/export const PACT_CLI_VERSION = '${PACT_CLI_VERSION}';/" >tmp-install
mv tmp-install src/install.ts

git add src/install.ts
git commit -m "${TYPE}: update standalone to ${PACT_CLI_VERSION}"
git push --set-upstream origin "${BRANCH_NAME}"

gh pr create --title "${TYPE}: update standalone to ${PACT_CLI_VERSION}" --fill

git checkout main
