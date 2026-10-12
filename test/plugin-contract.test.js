const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('dist/jquery.hatching.js', 'utf8');

test('publishes the jQuery hatching plugin', () => {
  assert.match(source, /\$\.fn\[pluginName\]/);
  assert.match(source, /repeating-linear-gradient/);
  assert.match(source, /Hatching\.prototype\.destroy/);
});

test('keeps the cloned hatching element input-transparent and below the source', () => {
  assert.match(source, /pointerEvents: 'none'/);
  assert.match(source, /borderRadius: 'inherit'/);
  assert.match(source, /zIndex: -1/);
});
