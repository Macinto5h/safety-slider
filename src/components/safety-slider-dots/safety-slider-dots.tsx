import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'safety-slider-dots',
  shadow: true,
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
