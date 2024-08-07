#!/bin/bash -eu
set -eu # Windows bash does not read the #! line above

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
. "$SCRIPT_DIR"/../../lib/robust-bash.sh

require_binary npm

VERSION="$("$SCRIPT_DIR/get-version.sh")"

echo "--> Releasing version ${VERSION}"

echo "--> Releasing artifacts"
echo "    Publishing pact-cli@${VERSION}..."
if [[ ${DRY_RUN:-} == 'true' ]]; then
  echo "publishing in dry run mode"
  # Dry-run Publish os/arch specific npm packages
  make dry_run
  # Update main package.json optional dependencies versions, with those created earlier
  make update_opt_deps
  npm publish --access-public --dry-run
 else
  echo "--> Preparing npmrc file"
  "$SCRIPT_DIR"/create_npmrc_file.sh
  # Publish os/arch specific npm packages
  make publish
  # Update main package.json optional dependencies versions, with those created earlier
  make update_opt_deps
  npm publish --access public --tag latest
fi
echo "    done!"
