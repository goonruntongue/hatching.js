/*! hatching.js v__VERSION__ (Vanilla edition) | MIT License | github.com/goonruntongue/hatching.js */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(); }
  else { root.Hatching = factory(); }
}(typeof window !== 'undefined' ? window : this, function () {
  'use strict';

__CORE__
  // Accepts a selector, an element, or a list of elements (NodeList, array).
  function elements(target) {
    if (typeof target === 'string') { return Array.prototype.slice.call(document.querySelectorAll(target)); }
    if (!target) { return []; }
    if (target.nodeType === 1) { return [target]; }
    return Array.prototype.filter.call(target, function (item) { return item && item.nodeType === 1; });
  }

  return {
    version: '__VERSION__',
    defaults: defaults,

    // Adds hatching, or updates the options of elements that already have it.
    apply: function (target, options) {
      var list = elements(target);
      list.forEach(function (element) {
        var instance = instances.get(element);
        if (!instance) { new Hatching(element, options); }
        else if (options) { instance.option(options); }
      });
      return list;
    },

    // Returns a copy of the first matched element's options, or undefined.
    option: function (target) {
      var instance = instances.get(elements(target)[0]);
      return instance ? instance.option() : undefined;
    },

    destroy: function (target) {
      var list = elements(target);
      list.forEach(function (element) {
        var instance = instances.get(element);
        if (instance) { instance.destroy(); }
      });
      return list;
    }
  };
}));
