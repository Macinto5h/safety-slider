import { h, Host, createEvent, proxyCustomElement } from '@stencil/core/internal/client';
export { setAssetPath, setPlatformOptions } from '@stencil/core/internal/client';

// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
var getRandomValues;
var rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
    // find the complete implementation of crypto (msCrypto) on IE11.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== 'undefined' && typeof msCrypto.getRandomValues === 'function' && msCrypto.getRandomValues.bind(msCrypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

const REGEX = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

function validate(uuid) {
  return typeof uuid === 'string' && REGEX.test(uuid);
}

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).substr(1));
}

function stringify(arr) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase(); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!validate(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

function v4(options, buf, offset) {
  options = options || {};
  var rnds = options.random || (options.rng || rng)(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (var i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return stringify(rnds);
}

const SLIDER_ID_PREFIX = 'ss-';

const safetySliderCss = "safety-slider{display:block;position:relative;padding:0 3rem 2rem}safety-slider safety-slider-window{display:block}";

const SafetySlider$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.uuid = v4();
    this.activeSlide = 0;
    this.prevArrowInnerHTML = '←';
    this.nextArrowInnerHTML = '→';
  }
  componentWillLoad() {
    this.slideCount = this.root.children.length;
  }
  componentDidLoad() {
    try {
      this.applyActiveSlideChanges(this.activeSlide);
    }
    catch (e) {
      console.error('safety-slider: no content has been provided in the slot.');
    }
  }
  onSafetySliderDotClick(event) {
    this.setActiveSlide(event.detail);
  }
  async setActiveSlide(newActiveSlide) {
    try {
      this.applyActiveSlideChanges(newActiveSlide);
    }
    catch (e) {
      console.error(e);
    }
  }
  applyActiveSlideChanges(newActiveSlide) {
    if (newActiveSlide < 0 || newActiveSlide >= this.slideCount)
      throw 'safety-slider: newActiveSlide index is out of range.';
    this.activeSlide = newActiveSlide;
  }
  render() {
    return (h(Host, { class: "safety-slider", id: SLIDER_ID_PREFIX + this.uuid }, h("safety-slider-window", { activeSlide: this.activeSlide, isInfinite: this.isInfinite, uuid: this.uuid }, h("slot", null)), this.slideCount > 1 && !this.hasNoArrows && (h("safety-slider-arrows", { slideCount: this.slideCount, activeSlide: this.activeSlide, prevArrowInnerHTML: this.prevArrowInnerHTML, nextArrowInnerHTML: this.nextArrowInnerHTML, isInfinite: this.isInfinite, prevAriaLabel: this.prevArrowAriaLabel, nextAriaLabel: this.nextArrowAriaLabel, uuid: this.uuid })), this.slideCount > 1 && !this.hasNoDots && (h("safety-slider-dots", { activeDot: this.activeSlide, dotCount: this.slideCount, dotAriaLabel: this.dotAriaLabel, uuid: this.uuid }))));
  }
  get root() { return this; }
  static get style() { return safetySliderCss; }
};

const SLIDE_CLASS = 'safety-slider-slide';
const SLIDE_CLASS_QUERY = `.${SLIDE_CLASS}`;
const SLIDE_ACTIVE_CLASS = '-active';
const SLIDE_CLONE_CLASS = 'safety-slider-clone';
const SLIDE_TRACK_CLASS = 'safety-slider-track';
const TRACK_TRANSITION_DURATION_CSS_VAR = '--safety-slider-track-transition-duration';
const TRACK_OFFSET_CSS_VAR = '--safety-slider-track-offset';
const WINDOW_ID_PREFIX = 'ssw-';
const WINDOW_WIDTH_CSS_VAR = '--safety-slider-window-width';

const safetySliderArrowsCss = "safety-slider-arrows{width:100%;position:absolute;z-index:1;top:50%;left:0;transform:translateY(-50%);display:flex;justify-content:space-between}.safety-slider-arrow{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:1px solid black;background-color:white;padding:0;color:black;width:2rem;height:2rem;text-align:center;cursor:pointer}.safety-slider-arrow[disabled]{opacity:.5;cursor:not-allowed}";

const SafetySliderArrows$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.safetySliderNavigationClick = createEvent(this, "safetySliderNavigationClick", 7);
    this.slideCount = 2;
    this.activeSlide = 0;
    this.prevArrowInnerHTML = '←';
    this.nextArrowInnerHTML = '→';
    this.prevAriaLabel = "Go to previous slide";
    this.nextAriaLabel = "Go to next slide";
    this.prevArrowClick = () => {
      this.safetySliderNavigationClick.emit(this.activeSlide - 1 >= 0 ? this.activeSlide - 1 : this.slideCount - 1);
    };
    this.nextArrowClick = () => {
      this.safetySliderNavigationClick.emit(this.activeSlide + 1 < this.slideCount ? this.activeSlide + 1 : 0);
    };
  }
  render() {
    return (h(Host, null, h("button", { class: "safety-slider-arrow -prev", type: "button", disabled: this.isInfinite ? false : this.activeSlide === 0, innerHTML: this.prevArrowInnerHTML, onClick: this.prevArrowClick, "aria-label": this.prevAriaLabel, "aria-controls": WINDOW_ID_PREFIX + this.uuid }), h("button", { class: "safety-slider-arrow -next", type: "button", disabled: this.isInfinite ? false : this.activeSlide === this.slideCount - 1, innerHTML: this.nextArrowInnerHTML, onClick: this.nextArrowClick, "aria-label": this.nextAriaLabel, "aria-controls": WINDOW_ID_PREFIX + this.uuid })));
  }
  static get style() { return safetySliderArrowsCss; }
};

const DOT_CLASS = 'safety-slider-dot';

const safetySliderDotsCss = "safety-slider-dots{display:block;width:100%;height:1rem;position:absolute;z-index:1;left:0;bottom:.25rem;text-align:center}.safety-slider-dot{-webkit-appearance:none;-moz-appearance:none;appearance:none;border:none;background-color:black;padding:0;border-radius:50%;width:.5rem;height:.5rem;margin:auto .25rem 0;cursor:pointer}.safety-slider-dot[disabled]{opacity:.5;cursor:not-allowed}";

const SafetySliderDots$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.safetySliderNavigationClick = createEvent(this, "safetySliderNavigationClick", 7);
    this.dotAriaLabel = "Go to slide {0} of {1}";
    this.dotClick = (event) => {
      const activeSlideValue = event.target.getAttribute('data-slide');
      this.safetySliderNavigationClick.emit(parseInt(activeSlideValue));
    };
  }
  componentWillRender() {
    this.dotButtons = [];
    for (let i = 0; i < this.dotCount; i++)
      this.dotButtons.push(i);
  }
  getFormattedAriaLabel(slideNumber) {
    return this.dotAriaLabel
      .replace('{0}', slideNumber.toString())
      .replace('{1}', this.dotCount.toString());
  }
  render() {
    return (h(Host, null, this.dotButtons.map((i) => h("button", { class: DOT_CLASS, type: "button", disabled: i === this.activeDot, onClick: this.dotClick, "aria-label": this.getFormattedAriaLabel(i + 1), "aria-controls": WINDOW_ID_PREFIX + this.uuid, "data-slide": i }))));
  }
  static get style() { return safetySliderDotsCss; }
};

const safetySliderWindowCss = "safety-slider-window{display:block;position:relative;width:100%;height:100%;overflow:hidden}.safety-slider-track{height:100%;position:relative;z-index:0;display:flex;box-sizing:border-box;transition:transform var(--safety-slider-track-transition-duration) ease;transform:translateX(var(--safety-slider-track-offset))}.safety-slider-slide{min-width:var(--safety-slider-window-width)}";

const SafetySliderWindow$1 = class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.safetySliderInfiniteLoopAdjustment = createEvent(this, "safetySliderInfiniteLoopAdjustment", 7);
    this.safetySliderApplyTransitionDuration = createEvent(this, "safetySliderApplyTransitionDuration", 7);
    this.infiniteLoopToFront = false;
    this.infiniteLoopToBack = false;
    this.trackTransitionDuration = 250;
    this.activeSlide = 0;
    this.isInfinite = false;
  }
  activeSlideChanged(newActiveSlide, oldActiveSlide) {
    this.moveActiveSlideClass(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToFront(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToBack(newActiveSlide, oldActiveSlide);
  }
  componentWillRender() {
    this.slidesOffset = this.calculateTrackOffset();
  }
  componentWillLoad() {
    var _a, _b, _c;
    const slides = Array.from(this.root.children);
    slides.forEach(slide => slide.classList.add(SLIDE_CLASS));
    (_a = slides[this.activeSlide]) === null || _a === void 0 ? void 0 : _a.classList.add(SLIDE_ACTIVE_CLASS);
    this.rootWidth = this.root.offsetWidth;
    this.slideCount = this.root.children.length;
    this.beginningClone = (_b = this.root.children[this.slideCount - 1]) === null || _b === void 0 ? void 0 : _b.outerHTML;
    this.endingClone = (_c = this.root.children[0]) === null || _c === void 0 ? void 0 : _c.outerHTML;
  }
  componentDidUpdate() {
    if (this.infiniteLoopToFront || this.infiniteLoopToBack) {
      setTimeout(() => this.safetySliderInfiniteLoopAdjustment.emit(), this.trackTransitionDuration);
    }
  }
  windowResizeHandler() {
    this.rootWidth = this.root.offsetWidth;
  }
  infiniteLoopAdjustmentHandler() {
    this.setCSSProperty(TRACK_TRANSITION_DURATION_CSS_VAR, `0ms`);
    this.setCSSProperty(TRACK_OFFSET_CSS_VAR, `${this.rootWidth * (this.activeSlide + 1) * -1}px`);
    setTimeout(() => this.safetySliderApplyTransitionDuration.emit(), this.trackTransitionDuration);
  }
  applyTransitionDurationHandler() {
    this.setCSSProperty(TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);
  }
  calculateTrackOffset() {
    if (this.infiniteLoopToFront) {
      return this.rootWidth * (this.slideCount + 1) * -1;
    }
    else if (this.infiniteLoopToBack) {
      return 0;
    }
    else if (this.isInfinite) {
      return this.rootWidth * (this.activeSlide + 1) * -1;
    }
    else {
      return this.rootWidth * this.activeSlide * -1;
    }
  }
  setCSSProperty(key, value) {
    this.root.style.setProperty(key, value);
  }
  setInfiniteLoopToFront(newActiveSlide, oldActiveSlide) {
    this.infiniteLoopToFront = this.isInfinite
      && newActiveSlide === 0
      && oldActiveSlide === this.slideCount - 1;
  }
  setInfiniteLoopToBack(newActiveSlide, oldActiveSlide) {
    this.infiniteLoopToBack = this.isInfinite
      && newActiveSlide === this.slideCount - 1
      && oldActiveSlide === 0;
  }
  moveActiveSlideClass(newActiveSlide, oldActiveSlide) {
    this.trackElement.querySelectorAll(SLIDE_CLASS_QUERY)[oldActiveSlide].classList.remove(SLIDE_ACTIVE_CLASS);
    this.trackElement.querySelectorAll(SLIDE_CLASS_QUERY)[newActiveSlide].classList.add(SLIDE_ACTIVE_CLASS);
  }
  render() {
    return (h(Host, { id: WINDOW_ID_PREFIX + this.uuid, style: {
        [WINDOW_WIDTH_CSS_VAR]: this.rootWidth + 'px',
        [TRACK_OFFSET_CSS_VAR]: this.slidesOffset + 'px',
        [TRACK_TRANSITION_DURATION_CSS_VAR]: this.trackTransitionDuration + 'ms'
      } }, h("div", { class: SLIDE_TRACK_CLASS, ref: (el) => this.trackElement = el }, this.isInfinite && this.slideCount > 1 && (h("div", { class: SLIDE_CLONE_CLASS, innerHTML: this.beginningClone })), h("slot", null), this.isInfinite && this.slideCount > 1 && (h("div", { class: SLIDE_CLONE_CLASS, innerHTML: this.endingClone })))));
  }
  get root() { return this; }
  static get watchers() { return {
    "activeSlide": ["activeSlideChanged"]
  }; }
  static get style() { return safetySliderWindowCss; }
};

const SafetySlider = /*@__PURE__*/proxyCustomElement(SafetySlider$1, [4,"safety-slider",{"isInfinite":[4,"infinite"],"prevArrowInnerHTML":[1,"prev-arrow"],"hasNoArrows":[4,"no-arrows"],"hasNoDots":[4,"no-dots"],"nextArrowInnerHTML":[1,"next-arrow"],"prevArrowAriaLabel":[1,"prev-arrow-aria-label"],"nextArrowAriaLabel":[1,"next-arrow-aria-label"],"dotAriaLabel":[1,"dot-aria-label"],"activeSlide":[32]},[[0,"safetySliderNavigationClick","onSafetySliderDotClick"]]]);
const SafetySliderArrows = /*@__PURE__*/proxyCustomElement(SafetySliderArrows$1, [0,"safety-slider-arrows",{"slideCount":[2,"slide-count"],"activeSlide":[2,"active-slide"],"prevArrowInnerHTML":[1,"prev-arrow"],"nextArrowInnerHTML":[1,"next-arrow"],"isInfinite":[4,"is-infinite"],"prevAriaLabel":[1,"prev-aria-label"],"nextAriaLabel":[1,"next-aria-label"],"uuid":[1]}]);
const SafetySliderDots = /*@__PURE__*/proxyCustomElement(SafetySliderDots$1, [0,"safety-slider-dots",{"activeDot":[2,"active-dot"],"dotCount":[2,"dot-count"],"dotAriaLabel":[1,"dot-aria-label"],"uuid":[1]}]);
const SafetySliderWindow = /*@__PURE__*/proxyCustomElement(SafetySliderWindow$1, [4,"safety-slider-window",{"activeSlide":[2,"active-slide"],"isInfinite":[516,"is-infinite"],"uuid":[1],"rootWidth":[32]},[[9,"resize","windowResizeHandler"],[0,"safetySliderInfiniteLoopAdjustment","infiniteLoopAdjustmentHandler"],[0,"safetySliderApplyTransitionDuration","applyTransitionDurationHandler"]]]);
const defineCustomElements = (opts) => {
  if (typeof customElements !== 'undefined') {
    [
      SafetySlider,
  SafetySliderArrows,
  SafetySliderDots,
  SafetySliderWindow
    ].forEach(cmp => {
      if (!customElements.get(cmp.is)) {
        customElements.define(cmp.is, cmp, opts);
      }
    });
  }
};

export { SafetySlider, SafetySliderArrows, SafetySliderDots, SafetySliderWindow, defineCustomElements };
