# hatching.js

任意の要素を複製し、少しだけずらして背面に置くことでハッチングの影を作る、小さな jQuery プラグインです。CSS の `repeating-linear-gradient` で軽く描画します。

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

プラグインは対象要素を複製し、クリックを妨げない背面要素を追加します。`position: static` の要素だけ、自動的に `position: relative` にします。角丸も引き継ぎます。背景色を持つカード、ボタン、見出しなどでハッチングの縁取り・影として使えます。

## Options

| Option | Default | Description |
| --- | --- | --- |
| `color` | `#333333` | ハッチングの基本色 |
| `width` | `1px` | ハッチングの幅 |
| `gap` | `1.5px` | ハッチングの間隔 |
| `angle` | `60deg` | ハッチングの角度 |
| `gradientOverlay` | `''` | 上に重ねる CSS グラデーション |
| `offsetX` | `6px` | 背面コピーの横方向のずれ |
| `offsetY` | `6px` | 背面コピーの縦方向のずれ |
| `className` | `''` | 背面コピーに追加するクラス名 |

## Methods

```js
// 設定を更新する
$('.target-element').hatching({ color: '#f04', gap: '12px' });

// 現在の設定を取得する
const options = $('.target-element').hatching('option');

// 背面コピーを削除する
$('.target-element').hatching('destroy');
```

## License

[MIT](LICENSE)
