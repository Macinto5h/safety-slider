import { Component, Host, h, Element, Prop } from '@stencil/core';

@Component({
  tag: 'safety-slider-window',
  styleUrl: 'safety-slider-window.scss',
  shadow: false,
})
export class SafetySliderWindow {

  private slidesOffset: number;

  @Prop() activeSlide: number = 0;

  @Element() root: HTMLSafetySliderWindowElement;

  componentDidRender() {
    const windowWidth = this.root.offsetWidth;
    this.slidesOffset = windowWidth * this.activeSlide * -1;
    this.root.style.setProperty('--safety-slider-view-width', windowWidth + 'px');
    this.root.style.setProperty('--safety-slider-view-offset', this.slidesOffset + 'px');
  }

  render() {
    return (
      <Host>
        <safety-slider-slides activeSlide={this.activeSlide}>
          <slot></slot>
        </safety-slider-slides>
      </Host>
    );
  }

}
