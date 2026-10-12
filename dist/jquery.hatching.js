/*! hatching.js v1.2.0 (jQuery edition) | MIT License | github.com/goonruntongue/hatching.js */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) { module.exports = factory(require('jquery')); }
  else { factory(root.jQuery); }
}(typeof window !== 'undefined' ? window : this, function ($) {
  'use strict';
  if (!$) { throw new Error('hatching.js requires jQuery.'); }

  var pluginName = 'hatching';
  var defaults = { mode: 'box', color: '#333333', width: '1px', gap: '1.5px', angle: '60deg', gradient: '', gradientOverlay: '', offsetX: '6px', offsetY: '6px', className: '' };
  var variables = ['--hatching-color', '--hatching-width', '--hatching-gap', '--hatching-angle', '--hatching-gradient', '--hatching-offset-x', '--hatching-offset-y', '--hatching-border-top', '--hatching-border-right', '--hatching-border-bottom', '--hatching-border-left'];
  var instances = new WeakMap();

  // Like Object.assign, but an undefined value never overwrites an earlier one.
  function extend(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      if (source) { Object.keys(source).forEach(function (key) { if (source[key] !== undefined) { target[key] = source[key]; } }); }
    }
    return target;
  }

  function toggleClasses(element, names, force) {
    String(names).split(/\s+/).forEach(function (name) { if (name) { element.classList.toggle(name, force); } });
  }

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
    this.element = element;
    this.options = extend({}, defaults, options);
    this.original = { position: element.style.position, zIndex: element.style.zIndex, overflow: element.style.overflow, variables: {} };
    this.observer = null;
    this.originalTextAttribute = element.getAttribute('data-hatching-text');
    this.originalLineGradient = element.style.getPropertyValue('--hatching-line-gradient');
    var self = this;
    this.textObserver = new MutationObserver(function () { self.render(); });
    this.textObserver.observe(element, { childList: true, characterData: true, subtree: true });
    this.init();
    if (this.image) {
      this.onLoad = function () { self.render(); };
      this.image.addEventListener('load', this.onLoad);
    }
    instances.set(this.target, this);
  }

  Hatching.prototype.init = function () {
    var self = this;
    variables.forEach(function (name) { self.original.variables[name] = self.element.style.getPropertyValue(name); });
    this.element.classList.add('hatching-source');
    if (window.getComputedStyle(this.element).position === 'static') { this.element.style.position = 'relative'; }
    this.element.style.zIndex = 'auto';
    this.element.style.overflow = 'visible';
    if (this.options.className) { toggleClasses(this.element, this.options.className, true); }
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
    this.element.classList.toggle('hatching-gradient', !!o.gradient);
    this.element.style.setProperty('--hatching-line-gradient', o.gradient || 'none');
    this.element.classList.toggle('hatching-text', textMode);
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
    if (options === undefined) { return extend({}, this.options); }
    if (options.className !== undefined && options.className !== this.options.className) {
      if (this.options.className) { toggleClasses(this.element, this.options.className, false); }
      if (options.className) { toggleClasses(this.element, options.className, true); }
    }
    this.options = extend({}, this.options, options);
    this.render();
  };

  Hatching.prototype.destroy = function () {
    var self = this;
    if (this.observer) { this.observer.disconnect(); }
    this.textObserver.disconnect();
    toggleClasses(this.element, 'hatching-source hatching-disabled hatching-text hatching-gradient', false);
    this.element.style.setProperty('--hatching-line-gradient', this.originalLineGradient);
    if (this.originalTextAttribute === null) { this.element.removeAttribute('data-hatching-text'); }
    else { this.element.setAttribute('data-hatching-text', this.originalTextAttribute); }
    if (this.options.className) { toggleClasses(this.element, this.options.className, false); }
    this.element.style.position = this.original.position;
    this.element.style.zIndex = this.original.zIndex;
    this.element.style.overflow = this.original.overflow;
    variables.forEach(function (name) { self.element.style.setProperty(name, self.original.variables[name]); });
    if (this.image) {
      this.image.removeEventListener('load', this.onLoad);
      this.element.parentNode.insertBefore(this.image, this.element);
      this.element.remove();
    }
    instances.delete(this.target);
  };
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
