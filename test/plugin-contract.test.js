const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const source = fs.readFileSync('dist/jquery.hatching.js', 'utf8');
const css = fs.readFileSync('dist/jquery.hatching.css', 'utf8');

test('publishes the jQuery hatching plugin', () => {
  assert.match(source, /\$\.fn\[pluginName\]/);
  assert.match(css, /repeating-linear-gradient/);
  assert.match(source, /Hatching\.prototype\.destroy/);
});

test('uses source-level CSS variables rather than cloning content', () => {
  assert.match(source, /--hatching-border-top/);
  assert.doesNotMatch(source, /\.clone\(/);
  assert.match(source, /ResizeObserver/);
});

test('pseudo-element has no copied background, border, or text content', () => {
  assert.match(css, /\.hatching-source::before/);
  assert.match(css, /content: ''/);
  assert.match(css, /background-color: transparent !important/);
  assert.match(css, /border: none !important/);
  assert.match(css, /z-index: -1/);
});
