import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'safety-slider-window',
  styleUrl: 'safety-slider-window.scss',
  shadow: false,
})
export class SafetySliderWindow {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
