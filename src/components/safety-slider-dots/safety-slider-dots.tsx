import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'safety-slider-dots',
  shadow: false,
})
export class SafetySliderDots {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
