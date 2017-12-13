#!/usr/bin/env bash
####################################
#
# S E T U P
#
#####################################

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

####################################
#
# C O D E
#
#####################################

set -e

# build
docker build --no-cache -t badmuts/isen:$PACKAGE_VERSION -f operations/Dockerfile.production .
docker tag badmuts/isen:$PACKAGE_VERSION badmuts/isen:latest
echo -e "\n${SUCCESS} Build badmuts/isen:$PACKAGE_VERSION \n"
# push
docker push badmuts/isen:$PACKAGE_VERSION
docker push badmuts/isen:latest
echo -e "\n${SUCCESS} Pushed badmuts/isen:$PACKAGE_VERSION \n"