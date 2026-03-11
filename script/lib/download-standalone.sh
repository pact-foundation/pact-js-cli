#!/bin/bash -eu
set -e
set -u
LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
. "${LIB_DIR}/robust-bash.sh"
. "${LIB_DIR}/download-file.sh"

require_binary curl
require_binary unzip
require_env_var STANDALONE_VERSION

BASEURL=https://github.com/pact-foundation/pact-cli/releases/download
STANDALONE_DIR="${LIB_DIR}/../../standalone"

function download_standalone {
  if [ -z "${1:-}" ]; then
    error "${FUNCNAME[0]} requires the filename to download from"
    exit 1
  fi

  if [ -z "${2:-}" ]; then
    error "${FUNCNAME[0]} requires the filename to save the download in"
    exit 1
  fi
  STANDALONE_FILENAME="$2"

  URL="${BASEURL}/v${STANDALONE_VERSION}/${1}"
  DOWNLOAD_LOCATION="$STANDALONE_DIR/${STANDALONE_FILENAME}"


  log "Downloading standalone version $STANDALONE_VERSION to $DOWNLOAD_LOCATION"
  download_to "$URL" "$DOWNLOAD_LOCATION"
  # Set executable permission if not a Windows binary
  if [[ ! "$STANDALONE_FILENAME" =~ windows ]]; then
    chmod +x "$DOWNLOAD_LOCATION"
  fi
}

log "Downloading Pact CLI standalone ${STANDALONE_VERSION}"

if [[ $(find "${STANDALONE_DIR}" -name "*${STANDALONE_VERSION}") ]]; then
  log "Skipping download of Pact CLI standalone, as it exists"
  exit 0
fi

if [ -z "${ONLY_DOWNLOAD_PACT_FOR_WINDOWS:-}" ]; then
  download_standalone "pact-x86_64-macos"           "pact-darwin-x64"
  download_standalone "pact-aarch64-macos"           "pact-darwin-arm64"
  download_standalone "pact-x86_64-linux-musl"           "pact-linux-x64"
  download_standalone "pact-aarch64-linux-musl"           "pact-linux-arm64"
  download_standalone "pact-x86_64-windows"           "pact-windows-x64"
  download_standalone "pact-aarch64-windows"           "pact-windows-arm64"
fi

# Write readme in the ffi folder
cat << EOF > "$STANDALONE_DIR/README.md"
# Standalone binaries

This folder is automatically populated during build by /script/download-standalone.sh
EOF