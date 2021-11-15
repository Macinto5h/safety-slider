import { Component, Host, h, Element } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: true,
})
export class SafetySlider {

  @Element() root : HTMLElement;

  hasSlides: boolean;
  slideCount: number;

  componentWillLoad() {
    this.slideCount = this.root.children.length;
    this.hasSlides = this.slideCount > 0;
  }

  render() {
    return (
      <Host>
        <slot></slot>
        {this.hasSlides && [
          <button class="safety-slider__arrow" type="button">Left arrow</button>,
          <button class="safety-slider__arrow" type="button">Right arrow</button>,
          <div class="safety-slider__dots">
            {[...new Array(this.slideCount)].map((x, i) =>
              <button class="safety-slider__dot" type="button">{i}</button>
            )}
          </div>
        ]}
      </Host>
    );
  }

}
