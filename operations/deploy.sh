#!/usr/bin/env bash

# 
# Script used to deploy to isen.daan.codes
# 
set -e

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

ERROR="${RED}[ERROR]${NC}"
SUCCESS="${GREEN}[SUCCESS]${NC}"

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[:space:]')

# Decrypt secrets.tar.gz.enc
gpg --output operations/secrets.tar.gz --decrypt operations/secrets.tar.gz.enc
echo -e "\n${SUCCESS} Decrypted secrets \n"
# Extract secrets.tar.gz
tar xvf operations/secrets.tar.gz -C operations/
echo -e "\n${SUCCESS} Extracted secrets \n"
# Rsync docker-compose.production.yml and .env to isen.daan.codes
rsync -e "ssh -F operations/ssh_config" -avz operations/docker-compose.production.yml .env.production isen:/home/isen/.deploy/
echo -e "\n${SUCCESS} Synced files to /home/isen/.deploy/ \n"
# Connect to isen.daan.codes && docker-compose up -d
ssh -F operations/ssh_config isen "cd .deploy; \
							  mv .env.production .env; 
							  COMPOSE_PROJECT_NAME=isen VERSION=$PACKAGE_VERSION docker-compose -f docker-compose.production.yml config; \
            				  COMPOSE_PROJECT_NAME=isen VERSION=$PACKAGE_VERSION docker-compose -f docker-compose.production.yml pull --parallel; \
            				  COMPOSE_PROJECT_NAME=isen VERSION=$PACKAGE_VERSION docker-compose -f docker-compose.production.yml up -d;"

echo -e "\n${SUCCESS} Deployed \n"
# Cleanup
rm -r operations/secrets operations/secrets.tar.gz
echo -e "\n${SUCCESS} Cleanup successful \n"