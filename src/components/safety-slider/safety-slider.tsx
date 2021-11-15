import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: true,
})
export class SafetySlider {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
