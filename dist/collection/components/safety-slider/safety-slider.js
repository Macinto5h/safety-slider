import { Component, Host, h, Element, Prop, Method, State, Listen } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import { SLIDER_ID_PREFIX } from './safety-slider.resources';
export class SafetySlider {
  constructor() {
    this.uuid = uuidv4();
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
    return (h(Host, { class: "safety-slider", id: SLIDER_ID_PREFIX + this.uuid },
      h("safety-slider-window", { activeSlide: this.activeSlide, isInfinite: this.isInfinite, uuid: this.uuid },
        h("slot", null)),
      this.slideCount > 1 && !this.hasNoArrows && (h("safety-slider-arrows", { slideCount: this.slideCount, activeSlide: this.activeSlide, prevArrowInnerHTML: this.prevArrowInnerHTML, nextArrowInnerHTML: this.nextArrowInnerHTML, isInfinite: this.isInfinite, prevAriaLabel: this.prevArrowAriaLabel, nextAriaLabel: this.nextArrowAriaLabel, uuid: this.uuid })),
      this.slideCount > 1 && !this.hasNoDots && (h("safety-slider-dots", { activeDot: this.activeSlide, dotCount: this.slideCount, dotAriaLabel: this.dotAriaLabel, uuid: this.uuid }))));
  }
  static get is() { return "safety-slider"; }
  static get originalStyleUrls() { return {
    "$": ["safety-slider.css"]
  }; }
  static get styleUrls() { return {
    "$": ["safety-slider.css"]
  }; }
  static get properties() { return {
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
      "attribute": "infinite",
      "reflect": false
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
    "hasNoArrows": {
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
      "attribute": "no-arrows",
      "reflect": false
    },
    "hasNoDots": {
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
      "attribute": "no-dots",
      "reflect": false
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
    "prevArrowAriaLabel": {
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
      "attribute": "prev-arrow-aria-label",
      "reflect": false
    },
    "nextArrowAriaLabel": {
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
      "attribute": "next-arrow-aria-label",
      "reflect": false
    },
    "dotAriaLabel": {
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
      "attribute": "dot-aria-label",
      "reflect": false
    }
  }; }
  static get states() { return {
    "activeSlide": {}
  }; }
  static get methods() { return {
    "setActiveSlide": {
      "complexType": {
        "signature": "(newActiveSlide: number) => Promise<void>",
        "parameters": [{
            "tags": [],
            "text": ""
          }],
        "references": {
          "Promise": {
            "location": "global"
          }
        },
        "return": "Promise<void>"
      },
      "docs": {
        "text": "",
        "tags": []
      }
    }
  }; }
  static get elementRef() { return "root"; }
  static get listeners() { return [{
      "name": "safetySliderNavigationClick",
      "method": "onSafetySliderDotClick",
      "target": undefined,
      "capture": false,
      "passive": false
    }]; }
}
