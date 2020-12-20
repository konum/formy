#!/bin/bash

rm -rf dist/formy
ng build formy --prod
cd dist/formy
npm login
npm publish