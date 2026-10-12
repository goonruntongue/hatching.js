# Hatching Vanilla

Dependency-free JavaScript edition of [hatching.js](https://github.com/goonruntongue/hatching.js). It draws a hatched (diagonal line) shadow behind boxes, images, and text.

jQueryなしで動く [hatching.js](https://github.com/goonruntongue/hatching.js) の依存なし版です。要素・画像・文字の背面に、斜線ハッチングの影を付けます。

```bash
npm install @goonruntongue/hatching-vanilla
```

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.css">
<script src="https://cdn.jsdelivr.net/npm/@goonruntongue/hatching-vanilla@1/dist/hatching-vanilla.min.js"></script>
<script>
  Hatching.apply('.target-element', {
    color: '#333333',
    width: '1px',
    gap: '4px',
    angle: '60deg',
    offsetX: '6px',
    offsetY: '6px'
  });
</script>
```

`Hatching.apply(target, options)` accepts a selector, an element, or a list of elements. Call it again to update the options. Use `mode: 'text'` to follow glyph outlines; `<img>` elements follow the image's alpha channel automatically.

`Hatching.apply(target, options)` には、セレクター・要素・要素のリストを渡せます。もう一度呼び出すと設定を更新します。`mode: 'text'` で文字の輪郭に、`<img>` 要素では画像の透明部分に沿った影になります。

```js
const options = Hatching.option('.target-element'); // Read / 現在の設定を取得
Hatching.destroy('.target-element'); // Remove / ハッチングを削除
```

See the [full documentation](https://github.com/goonruntongue/hatching.js#readme) and the [live demo](https://goonruntongue.github.io/hatching.js/demo/).

詳しい説明は[ドキュメント](https://github.com/goonruntongue/hatching.js#readme)と[デモサイト](https://goonruntongue.github.io/hatching.js/demo/)をご覧ください。

## License / ライセンス

Released under the [MIT License](./LICENSE). Copyright © 2026 Katsuyori Murakami.

[MITライセンス](./LICENSE)で公開しています。著作権者はKatsuyori Murakamiです。
