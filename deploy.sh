#!/bin/bash

#PRODUCTION
git checkout master
git reset  --hard
git pull origin master
yarn global add serve
npm i yarn -g
yarn
yarn run build
pm2 start "yarn run start:prod" --name=Shopsy-react

#DEVELOPMENT
# npm i yarn -g
# yarn 
# pm2 start "yarn run start" --name=Shopsy-react
