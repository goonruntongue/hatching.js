# hatching.js

A tiny library that draws a hatched (diagonal line) shadow behind boxes, images, and text. It is available as a jQuery plugin and as a dependency-free Vanilla JavaScript edition. Both take the same options and render the same result with a CSS `repeating-linear-gradient` on a `::before` pseudo-element, without cloning the DOM.

要素・画像・文字の背面に、斜線ハッチングの影を付ける小さなライブラリです。jQueryプラグイン版と、jQueryなしで動くVanilla JavaScript版があります。どちらも同じオプションで同じ見た目になり、DOMを複製せず、`::before` 疑似要素にCSSの `repeating-linear-gradient` で描画します。

<p align="center">
  <a href="https://goonruntongue.github.io/hatching.js/demo/"><img src="https://raw.githubusercontent.com/goonruntongue/hatching.js/main/assets/hatching-eyecatch.png" alt="Live demo / ライブデモ — hatching.js" width="420" align="middle"></a>&nbsp;&nbsp;
  <a href="https://goonruntongue.github.io/hatching.js/demo/"><img src="https://raw.githubusercontent.com/goonruntongue/hatching.js/main/assets/open-live-demo-button.svg" alt="Open Live Demo / デモサイトへ" width="300" align="middle"></a>
</p>

## Installation / インストール

### jQuery edition / jQuery版

Install jQuery and the plugin with npm.

npmでjQueryとプラグインをインストールします。

```bash
npm install @goonruntongue/hatching jquery
```

Or load the stylesheet, jQuery, and then hatching.js from a CDN.

または、CDNからスタイルシート、jQuery、hatching.jsの順に読み込みます。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching@1/dist/jquery.hatching.css">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching@1/dist/jquery.hatching.min.js"></script>
```

For a fully pinned version, replace `@1` with an exact version such as `@1.2.0`.

特定バージョンへ完全に固定したい場合は、`@1` を `@1.2.0` のような正確なバージョンに置き換えます。

UNPKG: `https://unpkg.com/@goonruntongue/hatching@1/dist/jquery.hatching.min.js` and `https://unpkg.com/@goonruntongue/hatching@1/dist/jquery.hatching.css`

### Vanilla JavaScript edition / 依存なしJavaScript版

For projects that do not use jQuery, install the dependency-free edition.

jQueryを使用しないプロジェクトでは、依存なし版を利用できます。

```bash
npm install @goonruntongue/hatching-vanilla
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.css">
<script src="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.min.js"></script>
<script>
  Hatching.apply('.target-element', {
    color: '#333333',
    gap: '4px'
  });
</script>
```

UNPKG: `https://unpkg.com/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.min.js` and `https://unpkg.com/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.css`

### Bundlers / バンドラー

Import the script and the stylesheet from the package.

パッケージからスクリプトとスタイルシートを読み込みます。

```js
// jQuery edition / jQuery版
require('@goonruntongue/hatching');
require('@goonruntongue/hatching/dist/jquery.hatching.css');

// Vanilla edition / 依存なし版
const Hatching = require('@goonruntongue/hatching-vanilla');
require('@goonruntongue/hatching-vanilla/dist/hatching-vanilla.css');
```

## Usage / 使い方

Call `.hatching()` on the elements that should get a hatched shadow. In the Vanilla edition, pass a selector, an element, or a list of elements to `Hatching.apply()`.

ハッチングの影を付けたい要素に対して `.hatching()` を実行します。依存なし版では、セレクター・要素・要素のリストを `Hatching.apply()` に渡します。

```js
// jQuery edition / jQuery版
$('.target-element').hatching({
  color: '#333333', // Line color / 線の色
  width: '1px', // Line width / 線の幅
  gap: '1.5px', // Space between lines / 線の間隔
  angle: '60deg', // Line angle / 線の角度
  offsetX: '6px', // Horizontal shift / 横方向のずれ
  offsetY: '6px' // Vertical shift / 縦方向のずれ
});

// Vanilla edition / 依存なし版
Hatching.apply('.target-element', {
  color: '#333333',
  width: '1px',
  gap: '1.5px',
  angle: '60deg',
  offsetX: '6px',
  offsetY: '6px'
});
```

The library does not clone the DOM. It draws only the hatching on the target's `::before`, so the shadow matches the outer size including `padding` and `border`, and never copies the text, background, or border.

DOMは複製しません。対象要素の `::before` にハッチングだけを描画するため、`padding` と `border` を含む外寸を正確に引き継ぎ、テキスト内容・背景色・枠線は引き継ぎません。

To place `::before` behind the element, the target's `z-index` is set to `auto` and `isolation` to `unset` while hatching is active, so the target does not create its own stacking context. `destroy` restores the inline `z-index`.

`::before` を元要素より下へ出すため、適用中は対象要素の `z-index` を `auto`、`isolation` を `unset` にします。これにより対象要素自身が新しいスタック文脈を作らず、ハッチングを背面へ置けます。`destroy` 時にはインラインの `z-index` を元へ戻します。

## Options / オプション

Both editions accept the same options. Call again with new options to update an element.

両方の版で同じオプションを指定できます。もう一度呼び出すと設定を更新できます。

| Option | Default | Description / 説明 |
| --- | --- | --- |
| `mode` | `'box'` | `'box'` for the whole element, `'text'` to follow glyph outlines / 要素全体は `'box'`、文字の輪郭は `'text'` |
| `color` | `'#333333'` | Line color / 線の色 |
| `width` | `'1px'` | Line width / 線の幅 |
| `gap` | `'1.5px'` | Space between lines / 線の間隔 |
| `angle` | `'60deg'` | Line angle / 線の角度 |
| `gradient` | `''` | CSS gradient applied to the lines only / 線だけに適用するCSSグラデーション |
| `gradientOverlay` | `''` | CSS gradient painted over the whole shadow / 影全体の上に重ねるCSSグラデーション |
| `offsetX` | `'6px'` | Horizontal shift of the shadow / 影の横方向のずれ |
| `offsetY` | `'6px'` | Vertical shift of the shadow / 影の縦方向のずれ |
| `className` | `''` | Extra class added to the target / 対象要素に追加するクラス名 |

## Methods / メソッド

```js
// jQuery edition / jQuery版
$('.target-element').hatching({ color: '#f04', gap: '12px' }); // Update / 設定を更新
const options = $('.target-element').hatching('option'); // Read / 現在の設定を取得
$('.target-element').hatching('destroy'); // Remove / ハッチングを削除

// Vanilla edition / 依存なし版
Hatching.apply('.target-element', { color: '#f04', gap: '12px' });
const current = Hatching.option('.target-element');
Hatching.destroy('.target-element');
```

`Hatching.apply()` and `Hatching.destroy()` return the matched elements as an array. `Hatching.defaults` holds the default options.

`Hatching.apply()` と `Hatching.destroy()` は、対象になった要素を配列で返します。`Hatching.defaults` で既定のオプションを参照できます。

## Details / 詳しい使い方

The examples below use the jQuery syntax; the same options work with `Hatching.apply()`.

以下の例はjQuery版の書き方ですが、同じオプションを `Hatching.apply()` でも使えます。

### Line gradient / 線のグラデーション

```js
$('.target-element').hatching({
  gradient: 'linear-gradient(to right, #333, rgba(51, 51, 51, 0.1))',
  width: '2px', gap: '5px'
});
```

`gradient` colors only the lines and keeps the gaps transparent. It works in box, image, and text modes, and takes priority over `color` and `gradientOverlay` while set. Use `gradient: ''` to return to a single color.

左から右へ線だけを濃い色から薄い色へ変化させます。線の間は透明のままです。`to bottom` で上下方向、`transparent` で完全に透明になる終点を指定できます。カード・画像・文字の各モードに対応します。`gradient` が指定されている間は `color` と `gradientOverlay` より優先されます。`gradient: ''` で単色へ戻せます。従来の `gradientOverlay` は面全体への重ね描きなので、線だけのグラデーションには `gradient` を使用してください。

### Shadows that follow text / 文字の輪郭に沿った影

```js
$('.title').hatching({
  mode: 'text',
  color: '#202020', angle: '135deg',
  width: '1px', gap: '3px',
  offsetX: '5px', offsetY: '6px'
});
```

Use `mode: 'text'` on block or inline-block elements that contain only text. The shadow inherits the font, line height, spacing, and wrapping, follows text changes automatically, and leaves the original text selectable.

`mode: 'text'` は文字だけを持つブロック要素・inline-block要素に指定します。元のフォント・行間・字間・折り返しを引き継ぐ疑似要素で、斜線を文字の輪郭に切り抜き、元の文字の背面へずらします。日本語、複数行、Webフォントにも対応し、文字内容の変更を自動反映します。通常の文字は選択・コピーできます。ホバーで変形しても影は文字の背面です。

Mixed inline formatting, `br`, vertical writing, and flex/grid text layout are not supported; apply hatching to each text element separately. Do not use it on elements that already use `::before`.

子要素ごとに異なる書式を持つ文章、`br`、縦書き、flex/gridの文字配置は対象外です。書式ごとのテキスト要素へ個別に適用してください。既存の `::before` を使用する要素には適用しないでください。`destroy` で文字用クラスと属性を元に戻します。既定の `mode: 'box'` は従来の要素全体の影です。

### Shadows that follow images / 画像の輪郭に沿った影

```js
$('img.logo').hatching({ color: '#222', offsetX: '12px', offsetY: '16px' });
```

Transparent PNG, WebP, and SVG images are supported. The image's alpha channel is used as a mask, so holes and curves get a shadow too. Opaque images such as JPEG get a rectangular shadow. Serve the image from the same origin.

透明背景の PNG・WebP・SVG に対応します。画像のアルファ（透明度）をマスクとして使うため、透明な抜けや曲線にも影が付きます。背景まで不透明な JPEG 等は長方形の影になります。画像は同一オリジンで配信してください。

A transparent `span` wrapper is added around the image automatically and removed by `destroy`. Use the image without margin or border, and set its size on the image itself.

画像には透明な `span` ラッパーを自動で追加し、その疑似要素に影を描画します。ラッパー内で元画像を影より前に描くため、画像にホバー時の変形があっても影は背面に保たれます。`destroy` でラッパーを取り除きます。画像は余白・枠線なしで使い、サイズは画像自身に指定してください。

For regular elements, `transform`, `filter`, `opacity: .99`, and similar properties on the target create a stacking context and hide the shadow. Avoid them on hover or selected states as well; use `outline` or similar instead.

通常の要素の疑似要素方式では、対象に `transform`・`filter`・`opacity: .99` 等を指定するとスタック文脈が作られます。ホバーや選択時にもこれらを指定せず、`outline` 等で強調してください。

## Development / 開発

Both editions are generated from `src/`. Edit the sources, then rebuild `dist/` and `vanilla/dist/`.

両方の版は `src/` から生成しています。ソースを編集したら、`dist/` と `vanilla/dist/` を再生成します。

```bash
npm install
npm run build
npm test
```

See [RELEASING.md](./RELEASING.md) for publishing to npm.

npmへの公開手順は [RELEASING.md](./RELEASING.md) を参照してください。

## License / ライセンス

Released under the [MIT License](./LICENSE). Copyright © 2026 Katsuyori Murakami.

[MITライセンス](./LICENSE)で公開しています。著作権者はKatsuyori Murakamiです。
