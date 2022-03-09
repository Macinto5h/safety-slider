import { Component, Host, h, Element, Prop, Watch, State, Listen, Event } from '@stencil/core';
import { SLIDE_ACTIVE_CLASS, SLIDE_CLASS, SLIDE_CLASS_QUERY, SLIDE_CLONE_CLASS, SLIDE_TRACK_CLASS, WINDOW_ID_PREFIX, TRACK_TRANSITION_DURATION_CSS_VAR, TRACK_OFFSET_CSS_VAR, WINDOW_WIDTH_CSS_VAR } from './safety-slider-window.resources';
export class SafetySliderWindow {
  constructor() {
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
      } },
      h("div", { class: SLIDE_TRACK_CLASS, ref: (el) => this.trackElement = el },
        this.isInfinite && this.slideCount > 1 && (h("div", { class: SLIDE_CLONE_CLASS, innerHTML: this.beginningClone })),
        h("slot", null),
        this.isInfinite && this.slideCount > 1 && (h("div", { class: SLIDE_CLONE_CLASS, innerHTML: this.endingClone })))));
  }
  static get is() { return "safety-slider-window"; }
  static get originalStyleUrls() { return {
    "$": ["safety-slider-window.css"]
  }; }
  static get styleUrls() { return {
    "$": ["safety-slider-window.css"]
  }; }
  static get properties() { return {
    "activeSlide": {
      "type": "number",
      "mutable": false,
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "active-slide",
      "reflect": false,
      "defaultValue": "0"
    },
    "isInfinite": {
      "type": "boolean",
      "mutable": false,
      "complexType": {
        "original": "boolean",
        "resolved": "boolean",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "is-infinite",
      "reflect": true,
      "defaultValue": "false"
    },
    "uuid": {
      "type": "string",
      "mutable": false,
      "complexType": {
        "original": "string",
        "resolved": "string",
        "references": {}
      },
      "required": false,
      "optional": false,
      "docs": {
        "tags": [],
        "text": ""
      },
      "attribute": "uuid",
      "reflect": false
    }
  }; }
  static get states() { return {
    "rootWidth": {}
  }; }
  static get events() { return [{
      "method": "safetySliderInfiniteLoopAdjustment",
      "name": "safetySliderInfiniteLoopAdjustment",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }, {
      "method": "safetySliderApplyTransitionDuration",
      "name": "safetySliderApplyTransitionDuration",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "any",
        "resolved": "any",
        "references": {}
      }
    }]; }
  static get elementRef() { return "root"; }
  static get watchers() { return [{
      "propName": "activeSlide",
      "methodName": "activeSlideChanged"
    }]; }
  static get listeners() { return [{
      "name": "resize",
      "method": "windowResizeHandler",
      "target": "window",
      "capture": false,
      "passive": true
    }, {
      "name": "safetySliderInfiniteLoopAdjustment",
      "method": "infiniteLoopAdjustmentHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }, {
      "name": "safetySliderApplyTransitionDuration",
      "method": "applyTransitionDurationHandler",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
