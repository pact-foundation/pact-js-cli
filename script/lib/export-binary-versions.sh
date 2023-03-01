#!/bin/bash -eu
LIB_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")"; pwd)" # Figure out where the script is running
PROJECT_DIR="${LIB_DIR}"/../../

export STANDALONE_VERSION=$(grep "PACT_STANDALONE_VERSION = '" "$PROJECT_DIR"/standalone/install.ts | grep -E -o "'(.*)'" | cut -d"'" -f2)