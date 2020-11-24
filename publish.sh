#!/bin/bash


ng build formy
cd dist/formy
npm pack
npm login -scope=@konum -registry=https://npm.pkg.github.com
npm publish