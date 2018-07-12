import test from 'ava';
import path from 'path';
import { rollup } from 'rollup';
import localResolve from '../dist/rollup-plugin-local-resolving';

// tests for faild file lookup
test(t => t.throws(rollup({
  input: path.resolve(__dirname, './files/index.js'),
  plugins: [localResolve()],
})));

// tests for folder lookup using default extension
test(t => rollup({
  input: path.resolve(__dirname, './folders/index.js'),
  plugins: [localResolve()],
}).then((stats) => {
  t.is(stats.modules[0].id.endsWith('/folders/index.js'), true);
  t.is(stats.modules[1].id.endsWith('/folders/folder/index.js'), true);
  t.is(stats.modules.length, 2);
}));

// tests for folder lookup using provided extension
test(t => rollup({
  input: path.resolve(__dirname, './folders/index.js'),
  plugins: [localResolve({ extensions: ['.jsx'] })],
}).then((stats) => {
  t.is(stats.modules[0].id.endsWith('/folders/index.js'), true);
  t.is(stats.modules[1].id.endsWith('/folders/folder/index.jsx'), true);
  t.is(stats.modules.length, 2);
}));

// tests for file lookup
test((t) => {
  const retVal = rollup({
    input: path.resolve(__dirname, './files/index.js'),
    plugins: [localResolve({ extensions: ['.jsx'] })],
  }).then((stats) => {
    t.is(stats.modules[0].id.endsWith('/files/index.js'), true);
    t.is(stats.modules[1].id.endsWith('/files/App.jsx'), true);
    t.is(stats.modules.length, 2);
  });
  return retVal;
});
