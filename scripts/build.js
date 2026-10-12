// Builds both editions from src/ into dist/ and vanilla/dist/.
// Run with `npm run build`; `npm test` fails when the output is stale.
const fs = require('node:fs');
const path = require('node:path');
const { minify } = require('terser');

const root = path.join(__dirname, '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n');
const core = read('src/core.js');
const css = read('src/hatching.css');

const editions = [
  { source: 'src/jquery.js', version: require('../package.json').version, out: ['dist/jquery.hatching'] },
  { source: 'src/vanilla.js', version: require('../vanilla/package.json').version, out: ['dist/hatching-vanilla', 'vanilla/dist/hatching-vanilla'] }
];

async function build() {
  const files = {};
  for (const edition of editions) {
    // Function replacements keep `$` sequences in the sources literal.
    const code = read(edition.source).replace('__CORE__\n', () => core).replace(/__VERSION__/g, () => edition.version);
    const min = (await minify(code, { format: { comments: /^!/ } })).code + '\n';
    for (const base of edition.out) {
      files[base + '.js'] = code;
      files[base + '.min.js'] = min;
      files[base + '.css'] = css;
    }
  }
  files['vanilla/LICENSE'] = read('LICENSE');
  return files;
}

module.exports = build;

if (require.main === module) {
  build().then((files) => {
    for (const [file, content] of Object.entries(files)) {
      fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
      fs.writeFileSync(path.join(root, file), content);
      console.log(file);
    }
  });
}
