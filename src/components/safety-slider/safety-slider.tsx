import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: true,
})
export class SafetySlider {

  @Element() root : HTMLElement;

  hasSlides: boolean;

  componentWillLoad() {
    this.hasSlides = this.root.children.length > 0;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.hasSlides && [
          <button class="safety-slider__arrow" type="button">Left arrow</button>,
          <button class="safety-slider__arrow" type="button">Right arrow</button>
        ]}
      </Host>
    );
  }

}
