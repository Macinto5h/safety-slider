import { Component, Host, h, Prop, Event } from '@stencil/core';
import { WINDOW_ID_PREFIX } from '../safety-slider-window/safety-slider-window.resources';
import { DOT_CLASS } from './safety-slider-dots.resources';
export class SafetySliderDots {
  constructor() {
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
  static get is() { return "safety-slider-dots"; }
  static get originalStyleUrls() { return {
    "$": ["safety-slider-dots.css"]
  }; }
  static get styleUrls() { return {
    "$": ["safety-slider-dots.css"]
  }; }
  static get properties() { return {
    "activeDot": {
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
      "attribute": "active-dot",
      "reflect": false
    },
    "dotCount": {
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
      "attribute": "dot-count",
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
      "reflect": false,
      "defaultValue": "\"Go to slide {0} of {1}\""
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
