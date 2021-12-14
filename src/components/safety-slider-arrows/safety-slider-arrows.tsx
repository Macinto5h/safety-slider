import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'safety-slider-arrows',
  styleUrl: 'safety-slider-arrows.css',
  shadow: true,
})
export class SafetySliderArrows {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
