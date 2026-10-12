const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const build = require('../scripts/build.js');

const read = (file) => fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
const source = read('dist/jquery.hatching.js');
const vanilla = read('dist/hatching-vanilla.js');
const css = read('dist/jquery.hatching.css');

test('built files are up to date with src (run `npm run build`)', async () => {
  const files = await build();
  for (const [file, content] of Object.entries(files)) {
    assert.equal(read(file), content, file + ' is stale');
  }
});

test('publishes the jQuery hatching plugin', () => {
  assert.match(source, /\$\.fn\[pluginName\]/);
  assert.match(css, /repeating-linear-gradient/);
  assert.match(source, /Hatching\.prototype\.destroy/);
});

test('publishes a Vanilla edition that does not reference jQuery', () => {
  assert.doesNotMatch(vanilla, /jQuery|\$\(|\$\./);
  const api = require('../dist/hatching-vanilla.js');
  assert.deepEqual(Object.keys(api).sort(), ['apply', 'defaults', 'destroy', 'option', 'version']);
  assert.equal(api.version, require('../vanilla/package.json').version);
  assert.equal(api.defaults.angle, '60deg');
});

test('both editions share the same stylesheet', () => {
  assert.equal(read('dist/hatching-vanilla.css'), css);
  assert.equal(read('vanilla/dist/hatching-vanilla.css'), css);
});

test('every file listed in the package manifests exists', () => {
  for (const dir of ['.', 'vanilla']) {
    const pkg = require('../' + dir + '/package.json');
    for (const file of [pkg.main, pkg.style, pkg.jsdelivr, pkg.unpkg]) {
      assert.ok(fs.existsSync(dir + '/' + file), dir + '/' + file);
    }
  }
});

test('uses source-level CSS variables rather than cloning content', () => {
  assert.match(source, /--hatching-border-top/);
  assert.doesNotMatch(source, /\.clone\(/);
  assert.match(source, /ResizeObserver/);
});

test('does not create a stacking context on the source element', () => {
  assert.match(source, /style\.zIndex = 'auto'/);
  assert.match(css, /isolation: unset/);
  assert.match(css, /z-index: auto/);
});

test('pseudo-element has no copied background, border, or text content', () => {
  assert.match(css, /\.hatching-source::before/);
  assert.match(css, /content: ''/);
  assert.match(css, /background-color: transparent !important/);
  assert.match(css, /border: none !important/);
  assert.match(css, /z-index: -1/);
});
