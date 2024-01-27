#!/bin/bash
export ORG_NAME="chameleon-la"
echo "::set-output name=ORG_NAME::chameleon-la"

export DB_NAME="chameleon"
echo "::set-output name=DB_NAME::chameleon"

export BRANCH_NAME="01-25-test-actions"
echo "::set-output name=BRANCH_NAME::01-25-test-actions"

export DEPLOY_REQUEST_NUMBER="2"
echo "::set-output name=DEPLOY_REQUEST_NUMBER::2"

export DEPLOY_REQUEST_URL="https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/2"
echo "::set-output name=DEPLOY_REQUEST_URL::https://app.planetscale.com/chameleon-la/chameleon/deploy-requests/2"

export BRANCH_URL="https://app.planetscale.com/chameleon-la/chameleon/01-25-test-actions"
echo "::set-output name=BRANCH_URL::https://app.planetscale.com/chameleon-la/chameleon/01-25-test-actions"

