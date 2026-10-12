/*! hatching.js v__VERSION__ (jQuery edition) | MIT License | github.com/goonruntongue/hatching.js */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(require('jquery')); }
  else { factory(root.jQuery); }
}(typeof window !== 'undefined' ? window : this, function ($) {
  'use strict';
  if (!$) { throw new Error('hatching.js requires jQuery.'); }

  var pluginName = 'hatching';
__CORE__
  $.fn[pluginName] = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var result;
    this.each(function () {
      var instance = instances.get(this);
      if (!instance && typeof option === 'string') { throw new Error('hatching.js is not initialized on this element.'); }
      if (!instance) { new Hatching(this, option); }
      else if (typeof option === 'string') {
        if (typeof instance[option] !== 'function') { throw new Error('Unknown hatching.js method: ' + option); }
        var value = instance[option].apply(instance, args);
        if (value !== undefined && result === undefined) { result = value; }
      } else if (option) { instance.option(option); }
    });
    return result !== undefined ? result : this;
  };
  $.fn[pluginName].defaults = defaults;

  return $;
}));
