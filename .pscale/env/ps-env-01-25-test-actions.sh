#!/bin/bash
export ORG_NAME="chameleon-la"
echo "::set-output name=ORG_NAME::chameleon-la"

export DB_NAME="chameleon"
echo "::set-output name=DB_NAME::chameleon"

export BRANCH_NAME="testbranch"
echo "::set-output name=BRANCH_NAME::testbranch"

export DEPLOY_REQUEST_NUMBER="5"
echo "::set-output name=DEPLOY_REQUEST_NUMBER::5"

export DEPLOY_REQUEST_URL="https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/5"
echo "::set-output name=DEPLOY_REQUEST_URL::https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/5"

export BRANCH_URL="https://app.planetscale.com/chameleon-la/chameleon/testbranch"
echo "::set-output name=BRANCH_URL::https://app.planetscale.com/chameleon-la/chameleon/testbranch"

