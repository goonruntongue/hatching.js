# hatching.js

対象要素の `::before` 疑似要素を、元の要素と同じ外寸で少しだけずらして背面に置く、小さな jQuery プラグインです。CSS の `repeating-linear-gradient` で軽く描画します。

## Demo

`demo/index.html` をブラウザで開くと、3種類の設定例を確認できます。

## Install

```html
<link rel="stylesheet" href="dist/jquery.hatching.css">
<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<script src="dist/jquery.hatching.js"></script>
```

## Usage

```js
$('.target-element').hatching({
  color: '#333333',
  width: '1px',
  gap: '1.5px',
  angle: '60deg',
  gradientOverlay: 'linear-gradient(90deg, #000, #888)'
});
```

プラグインはDOMを複製しません。対象要素の `::before` にハッチングだけを描画するため、元の `padding` と `border` を含む外寸を正確に引き継ぎ、テキスト内容・背景色・枠線は引き継ぎません。疑似要素は `background-color: transparent` と `border: none` に固定されています。

`::before` を元要素より下へ出すため、初期化中は対象要素の `z-index` を `auto`、`isolation` を `unset` にします。これにより対象要素自身が新しいスタック文脈を作らず、`z-index: -1` のハッチングを同じスタック文脈の背面へ置けます。`destroy` 時にはインラインの `z-index` を元へ戻します。

## Options

### 文字の輪郭に沿った影

```js
$('.title').hatching({
  mode: 'text',
  color: '#202020', angle: '135deg',
  width: '1px', gap: '3px',
  offsetX: '5px', offsetY: '6px'
});
```

`mode: 'text'` は文字だけを持つブロック要素・inline-block要素に指定します。元のフォント・行間・字間・折り返しを引き継ぐ疑似要素で、斜線を文字の輪郭に切り抜き、元の文字の背面へずらします。日本語、複数行、Webフォントにも対応し、文字内容の変更を自動反映します。通常の文字は選択・コピーできます。ホバーで変形しても影は文字の背面です。

子要素ごとに異なる書式を持つ文章、`br`、縦書き、flex/gridの文字配置は対象外です。書式ごとのテキスト要素へ個別に適用してください。既存の `::before` を使用する要素には適用しないでください。`destroy` で文字用クラスと属性を元に戻します。既定の `mode: 'box'` は従来の要素全体の影です。

### 画像の輪郭に沿った影

```js
$('img.logo').hatching({ color: '#222', offsetX: '12px', offsetY: '16px' });
```

透明背景の PNG・WebP・SVG に対応します。画像のアルファ（透明度）をマスクとして使うため、透明な抜けや曲線にも影が付きます。背景まで不透明な JPEG 等は長方形の影になります。画像は同一オリジンで配信してください。

画像には透明な `span` ラッパーを自動で追加し、その疑似要素に影を描画します。ラッパー内で元画像を影より前に描くため、画像にホバー時の変形があっても影は背面に保たれます。`destroy` でラッパーを取り除きます。画像は余白・枠線なしで使い、サイズは画像自身に指定してください。

通常の要素の疑似要素方式では、対象に `transform`・`filter`・`opacity: .99` 等を指定するとスタック文脈が作られます。ホバーや選択時にもこれらを指定せず、`outline` 等で強調してください。

| Option | Default | Description |
| --- | --- | --- |
| `color` | `#333333` | ハッチングの基本色 |
| `width` | `1px` | ハッチングの幅 |
| `gap` | `1.5px` | ハッチングの間隔 |
| `angle` | `60deg` | ハッチングの角度 |
| `gradientOverlay` | `''` | 上に重ねる CSS グラデーション |
| `offsetX` | `6px` | 疑似要素の横方向のずれ |
| `offsetY` | `6px` | 疑似要素の縦方向のずれ |
| `className` | `''` | 対象要素に追加するクラス名 |

## Methods

```js
// 設定を更新する
$('.target-element').hatching({ color: '#f04', gap: '12px' });

// 現在の設定を取得する
const options = $('.target-element').hatching('option');

// ハッチング用のクラスと設定を削除する
$('.target-element').hatching('destroy');
```

## License

[MIT](LICENSE)
