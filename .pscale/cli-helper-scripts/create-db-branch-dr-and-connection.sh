#!/bin/bash

. use-pscale-docker-image.sh
. wait-for-branch-readiness.sh

. authenticate-ps.sh

BRANCH_NAME="$1"
DDL_STATEMENTS="$2" 

. set-db-and-org-and-branch-name.sh

. ps-create-helper-functions.sh
create-db-branch "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "recreate"

. create-branch-connection-string.sh
create-branch-connection-string "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "creds-${BRANCH_NAME}" 

. ps-create-helper-functions.sh
create-schema-change "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME" "$DDL_STATEMENTS" "$MY_DB_URL"
create-deploy-request "$DB_NAME" "$BRANCH_NAME" "$ORG_NAME"

