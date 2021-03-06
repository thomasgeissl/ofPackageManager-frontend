# ofPackageManager frontend

## Description

electron frontend for [ofPackageManager](https://github.com/thomasgeissl/ofPackageManager).
It uses ofPackageManager and ofProjectGenerator under the hood.

```sh
brew tap thomasgeissl/tools
brew install ofpackagemanager
brew install ofprojectgenerator
#brew upgrade ofpackagemanager
#brew upgrade ofprojectgenerator
ofPackageManager config -g
brew cask install ofpackagemanagerfrontend
```
## Trouble shooting
In case the auto config does not work, you can always manually create the json config file `~/.ofPackageManager/frontend.config.json`
e.g.
```
{
  "defaultProjectPath": "~/libs/of_v0.11.0_osx_release/apps/myApps/",
  "ofPackageManagerPath": "/opt/homebrew/bin/ofPackageManager",
  "ofProjectGeneratorPath": "/opt/homebrew/bin/projectGenerator",
  "showAdvancedFeatures": false,
  "verboseOutput": false
}
```

## Build status

[![Build Status](https://travis-ci.com/thomasgeissl/ofPackageManager-frontend.svg?branch=master)](https://travis-ci.com/thomasgeissl/ofPackageManager-frontend)

## Development

- install node: `brew install node`
- install yarn globally: `npm install -g yarn`
- install dependencies: `yarn install`
- run in dev mode: `yarn electron-dev`
- finally build for osx, win, linux: `yarn electron-dist`

small changes in the scripts might be needed to make it build on windows or linux.
