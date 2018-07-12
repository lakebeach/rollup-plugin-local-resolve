# rollup-plugin-local-resolving
Resolves Node-style directories with `index.js` files in Rollup. This is forked from [https://github.com/frostney/rollup-plugin-local-resolve](https://github.com/frostney/rollup-plugin-local-resolve).

[![Build Status](https://travis-ci.org/lakebeach/rollup-plugin-local-resolving.svg?branch=master)](https://travis-ci.org/lakebeach/rollup-plugin-local-resolving) [![dependencies Status](https://david-dm.org/lakebeach/rollup-plugin-local-resolving/status.svg)](https://david-dm.org/lakebeach/rollup-plugin-local-resolving) [![devDependencies Status](https://david-dm.org/lakebeach/rollup-plugin-local-resolving/dev-status.svg)](https://david-dm.org/lakebeach/rollup-plugin-local-resolving?type=dev) [![Coverage Status](https://coveralls.io/repos/github/lakebeach/rollup-plugin-local-resolving/badge.svg)](https://coveralls.io/github/lakebeach/rollup-plugin-local-resolving)

Rollup by default doesn't handle resolving `./module` to `./module.js` or `./module/index.js` internally. While there is the `rollup-plugin-node-resolve` plugin which also resolves directories as well as all dependencies from the `node_modules` directory, these may sometimes be too much for the use case at hand.

## Installation
```shell
$ npm install rollup-plugin-local-resolving
```

## Usage
```javascript
import { rollup } from 'rollup';
import localResolve from 'rollup-plugin-local-resolving';

// This will resolve `./files` to `./files.js` or `./files/index.js` if the file exists
rollup({
  entry: './files',
  plugins: [localResolve()],
});
```
### Options: 
```javascript
{
  // `extensions` is an optional array with all extensions expected to be resolved. Defaults to ['.js'] when omited.
  extensions: ['.js', '.jsx']
}
```

## Things to improve on
- Check for `index.js` file asynchronously

## License
MIT, see `LICENSE` for more information
