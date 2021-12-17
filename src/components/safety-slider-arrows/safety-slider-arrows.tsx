import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'safety-slider-arrows',
  styleUrl: 'safety-slider-arrows.css',
  shadow: false,
})
export class SafetySliderArrows {

  @Prop() readonly slideCount = 2;
  @Prop() readonly activeSlide = 0;
  @Prop() readonly prevArrowInnerHTML: string = '←';
  @Prop() readonly nextArrowInnerHTML: string = '→';
  @Prop() readonly isInfinite: boolean;

  render() {
    return (
      <Host>
        <button
          class="safety-slider-arrow -prev"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === 0}
          innerHTML={this.prevArrowInnerHTML}>
        </button>
        <button
          class="safety-slider-arrow -next"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === this.slideCount - 1}
          innerHTML={this.nextArrowInnerHTML}>
        </button>
      </Host>
    );
  }

}
