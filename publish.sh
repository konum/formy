#!/bin/bash

rm -rf dist/formy
ng build formy 
cd dist/formy
npm login
npm publish