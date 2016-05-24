# IFC Demand Tool

## Overview


## Development environment
To set up the development environment for this website, you'll need to install the following on your system:

- Node (v4.2.x) & Npm ([nvm](https://github.com/creationix/nvm) usage is advised)

> The versions mentioned are the ones used during development. It could work with newer ones.

After these basic requirements are met, run the following commands in the website's folder:
```
$ npm install
```

## Gulp for building

There are two commands, both run via npm.

- `npm run build` or `gulp` - clean & build everything and put it into dist folder
- `npm run serve` or `gulp serve` - serve the pages and utilize live reload on changes to styles, fonts, images, scripts and HTML.

## semistandard for linting
We're using [standard](https://github.com/feross/standard) for linting.

- `npm run lint` - will run linter and warn of any errors.
