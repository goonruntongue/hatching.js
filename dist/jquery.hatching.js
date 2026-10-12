/*! hatching.js v1.0.0 | MIT License | github.com/goonruntongue/hatching.js */
(function ($) {
  'use strict';
  if (!$) { throw new Error('hatching.js requires jQuery.'); }

  var pluginName = 'hatching';
  var dataKey = 'plugin.' + pluginName;
  var defaults = {
    color: '#333333', width: '1px', gap: '1.5px', angle: '60deg',
    gradientOverlay: '', offsetX: '6px', offsetY: '6px', className: ''
  };

  function Hatching(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, defaults, options);
    this.$shadow = null;
    this.originalPosition = null;
    this.init();
  }

  Hatching.prototype.init = function () {
    if (this.$element.css('position') === 'static') {
      this.originalPosition = this.$element[0].style.position;
      this.$element.css('position', 'relative');
    }
    this.$element.addClass('hatching-source');
    this.$shadow = this.$element.clone(false)
      .removeAttr('id')
      .removeClass('hatching-source')
      .addClass('hatching-shadow ' + this.options.className)
      .attr('aria-hidden', 'true')
      .insertAfter(this.$element);
    this.render();
  };

  Hatching.prototype.render = function () {
    var o = this.options;
    var width = o.width || defaults.width;
    var gap = o.gap || defaults.gap;
    var angle = o.angle || defaults.angle;
    var pattern = 'repeating-linear-gradient(' + angle + ', ' + o.color + ' 0, ' + o.color + ' ' + width + ', transparent ' + width + ', transparent calc(' + width + ' + ' + gap + '))';
    var background = o.gradientOverlay ? o.gradientOverlay + ', ' + pattern : pattern;

    this.$shadow.css({
      position: 'absolute',
      top: this.$element.position().top,
      left: this.$element.position().left,
      width: this.$element.outerWidth(),
      height: this.$element.outerHeight(),
      display: 'block',
      pointerEvents: 'none',
      borderRadius: 'inherit',
      zIndex: -1,
      transform: 'translate(' + (o.offsetX || defaults.offsetX) + ', ' + (o.offsetY || defaults.offsetY) + ')',
      backgroundImage: background
    });
  };

  Hatching.prototype.option = function (options) {
    if (options === undefined) { return $.extend({}, this.options); }
    this.options = $.extend({}, this.options, options);
    this.render();
  };

  Hatching.prototype.destroy = function () {
    this.$shadow.remove();
    this.$element.removeClass('hatching-source');
    if (this.originalPosition !== null) { this.$element[0].style.position = this.originalPosition; }
    this.$element.removeData(dataKey);
  };

  $.fn[pluginName] = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var result;
    this.each(function () {
      var instance = $.data(this, dataKey);
      if (!instance && typeof option === 'string') { throw new Error('hatching.js is not initialized on this element.'); }
      if (!instance) {
        instance = new Hatching(this, option);
        $.data(this, dataKey, instance);
      } else if (typeof option === 'string') {
        if (typeof instance[option] !== 'function') { throw new Error('Unknown hatching.js method: ' + option); }
        var value = instance[option].apply(instance, args);
        if (value !== undefined && result === undefined) { result = value; }
      } else if (option) { instance.option(option); }
    });
    return result !== undefined ? result : this;
  };
}(jQuery));
