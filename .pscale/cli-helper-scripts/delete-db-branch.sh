#!/bin/bash

. use-pscale-docker-image.sh

. authenticate-ps.sh

BRANCH_NAME="$1"

. set-db-and-org-and-branch-name.sh

pscale branch delete "$DB_NAME" "$BRANCH_NAME" --force --org "$ORG_NAME"

ENV_FILE_PATH=".pscale/env/ps-env-${BRANCH_NAME}.sh"
if [ -f "$ENV_FILE_PATH" ]; then
    echo "Deleting environment file: $ENV_FILE_PATH"
    rm "$ENV_FILE_PATH"
else
    echo "Environment file does not exist: $ENV_FILE_PATH"
fi