/*! hatching.js v1.1.0 | MIT License | github.com/goonruntongue/hatching.js */
(function ($) {
  'use strict';
  if (!$) { throw new Error('hatching.js requires jQuery.'); }

  var pluginName = 'hatching';
  var dataKey = 'plugin.' + pluginName;
  var defaults = { mode: 'box', color: '#333333', width: '1px', gap: '1.5px', angle: '60deg', gradientOverlay: '', offsetX: '6px', offsetY: '6px', className: '' };
  var variables = ['--hatching-color', '--hatching-width', '--hatching-gap', '--hatching-angle', '--hatching-gradient', '--hatching-offset-x', '--hatching-offset-y', '--hatching-border-top', '--hatching-border-right', '--hatching-border-bottom', '--hatching-border-left'];

  function Hatching(element, options) {
    this.target = element;
    this.image = element.tagName === 'IMG' ? element : null;
    if (this.image) {
      var wrapper = document.createElement('span');
      wrapper.className = 'hatching-image';
      element.parentNode.insertBefore(wrapper, element);
      wrapper.appendChild(element);
      element = wrapper;
    }
    this.$element = $(element);
    this.element = element;
    this.options = $.extend({}, defaults, options);
    this.original = { position: element.style.position, zIndex: element.style.zIndex, overflow: element.style.overflow, variables: {} };
    this.observer = null;
    this.originalTextAttribute = element.getAttribute('data-hatching-text');
    var self = this;
    this.textObserver = new MutationObserver(function () { self.render(); });
    this.textObserver.observe(element, { childList: true, characterData: true, subtree: true });
    this.init();
    if (this.image) {
      var self = this;
      this.onLoad = function () { self.render(); };
      this.image.addEventListener('load', this.onLoad);
    }
  }

  Hatching.prototype.init = function () {
    var self = this;
    variables.forEach(function (name) { self.original.variables[name] = self.element.style.getPropertyValue(name); });
    this.$element.addClass('hatching-source');
    if (this.$element.css('position') === 'static') { this.$element.css('position', 'relative'); }
    this.$element.css('z-index', 'auto');
    this.$element.css('overflow', 'visible');
    if (this.options.className) { this.$element.addClass(this.options.className); }
    this.render();
    if (window.ResizeObserver) {
      this.observer = new ResizeObserver(function () { self.render(); });
      this.observer.observe(this.element);
    }
  };

  Hatching.prototype.render = function () {
    var o = this.options;
    var style = window.getComputedStyle(this.element);
    var textMode = !this.image && o.mode === 'text';
    this.$element.toggleClass('hatching-text', textMode);
    if (textMode) {
      this.element.setAttribute('data-hatching-text', this.element.textContent);
    } else if (this.originalTextAttribute === null) {
      this.element.removeAttribute('data-hatching-text');
    } else {
      this.element.setAttribute('data-hatching-text', this.originalTextAttribute);
    }
    var values = {
      '--hatching-color': o.color || defaults.color,
      '--hatching-width': o.width || defaults.width,
      '--hatching-gap': o.gap || defaults.gap,
      '--hatching-angle': o.angle || defaults.angle,
      '--hatching-gradient': o.gradientOverlay || 'none',
      '--hatching-offset-x': o.offsetX || defaults.offsetX,
      '--hatching-offset-y': o.offsetY || defaults.offsetY,
      '--hatching-border-top': style.borderTopWidth,
      '--hatching-border-right': style.borderRightWidth,
      '--hatching-border-bottom': style.borderBottomWidth,
      '--hatching-border-left': style.borderLeftWidth
    };
    Object.keys(values).forEach(function (name) { this.element.style.setProperty(name, values[name]); }, this);
    if (this.image) {
      this.element.style.setProperty('--hatching-image', 'url(' + JSON.stringify(this.image.currentSrc || this.image.src) + ')');
    }
  };

  Hatching.prototype.option = function (options) {
    if (options === undefined) { return $.extend({}, this.options); }
    if (options.className !== undefined && options.className !== this.options.className) {
      if (this.options.className) { this.$element.removeClass(this.options.className); }
      if (options.className) { this.$element.addClass(options.className); }
    }
    this.options = $.extend({}, this.options, options);
    this.render();
  };

  Hatching.prototype.destroy = function () {
    var self = this;
    if (this.observer) { this.observer.disconnect(); }
    this.textObserver.disconnect();
    this.$element.removeClass('hatching-source hatching-disabled hatching-text');
    if (this.originalTextAttribute === null) { this.element.removeAttribute('data-hatching-text'); }
    else { this.element.setAttribute('data-hatching-text', this.originalTextAttribute); }
    if (this.options.className) { this.$element.removeClass(this.options.className); }
    this.element.style.position = this.original.position;
    this.element.style.zIndex = this.original.zIndex;
    this.element.style.overflow = this.original.overflow;
    variables.forEach(function (name) { self.element.style.setProperty(name, self.original.variables[name]); });
    this.$element.removeData(dataKey);
    if (this.image) {
      this.image.removeEventListener('load', this.onLoad);
      this.element.parentNode.insertBefore(this.image, this.element);
      this.element.remove();
    }
    $(this.target).removeData(dataKey);
  };

  $.fn[pluginName] = function (option) {
    var args = Array.prototype.slice.call(arguments, 1);
    var result;
    this.each(function () {
      var instance = $.data(this, dataKey);
      if (!instance && typeof option === 'string') { throw new Error('hatching.js is not initialized on this element.'); }
      if (!instance) { instance = new Hatching(this, option); $.data(this, dataKey, instance); }
      else if (typeof option === 'string') {
        if (typeof instance[option] !== 'function') { throw new Error('Unknown hatching.js method: ' + option); }
        var value = instance[option].apply(instance, args);
        if (value !== undefined && result === undefined) { result = value; }
      } else if (option) { instance.option(option); }
    });
    return result !== undefined ? result : this;
  };
}(jQuery));
