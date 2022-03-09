import { Component, Host, h, Prop, Event } from '@stencil/core';
import { WINDOW_ID_PREFIX } from '../safety-slider-window/safety-slider-window.resources';
export class SafetySliderArrows {
  constructor() {
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
    return (h(Host, null,
      h("button", { class: "safety-slider-arrow -prev", type: "button", disabled: this.isInfinite ? false : this.activeSlide === 0, innerHTML: this.prevArrowInnerHTML, onClick: this.prevArrowClick, "aria-label": this.prevAriaLabel, "aria-controls": WINDOW_ID_PREFIX + this.uuid }),
      h("button", { class: "safety-slider-arrow -next", type: "button", disabled: this.isInfinite ? false : this.activeSlide === this.slideCount - 1, innerHTML: this.nextArrowInnerHTML, onClick: this.nextArrowClick, "aria-label": this.nextAriaLabel, "aria-controls": WINDOW_ID_PREFIX + this.uuid })));
  }
  static get is() { return "safety-slider-arrows"; }
  static get originalStyleUrls() { return {
    "$": ["safety-slider-arrows.css"]
  }; }
  static get styleUrls() { return {
    "$": ["safety-slider-arrows.css"]
  }; }
  static get properties() { return {
    "slideCount": {
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
      "attribute": "slide-count",
      "reflect": false,
      "defaultValue": "2"
    },
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
    "prevArrowInnerHTML": {
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
      "attribute": "prev-arrow",
      "reflect": false,
      "defaultValue": "'\u2190'"
    },
    "nextArrowInnerHTML": {
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
      "attribute": "next-arrow",
      "reflect": false,
      "defaultValue": "'\u2192'"
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
      "reflect": false
    },
    "prevAriaLabel": {
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
      "attribute": "prev-aria-label",
      "reflect": false,
      "defaultValue": "\"Go to previous slide\""
    },
    "nextAriaLabel": {
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
      "attribute": "next-aria-label",
      "reflect": false,
      "defaultValue": "\"Go to next slide\""
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
  static get events() { return [{
      "method": "safetySliderNavigationClick",
      "name": "safetySliderNavigationClick",
      "bubbles": true,
      "cancelable": true,
      "composed": true,
      "docs": {
        "tags": [],
        "text": ""
      },
      "complexType": {
        "original": "number",
        "resolved": "number",
        "references": {}
      }
    }]; }
}
