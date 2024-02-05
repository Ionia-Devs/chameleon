#!/bin/bash
export ORG_NAME="chameleon-la"
echo "::set-output name=ORG_NAME::chameleon-la"

export DB_NAME="chameleon"
echo "::set-output name=DB_NAME::chameleon"

export BRANCH_NAME="1-test-branch"
echo "::set-output name=BRANCH_NAME::1-test-branch"

export DEPLOY_REQUEST_NUMBER="16"
echo "::set-output name=DEPLOY_REQUEST_NUMBER::16"

export DEPLOY_REQUEST_URL="https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/16"
echo "::set-output name=DEPLOY_REQUEST_URL::https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/16"

export BRANCH_URL="https://app.planetscale.com/chameleon-la/chameleon/1-test-branch"
echo "::set-output name=BRANCH_URL::https://app.planetscale.com/chameleon-la/chameleon/1-test-branch"

