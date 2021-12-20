import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'safety-slider-arrows',
  styleUrl: 'safety-slider-arrows.css',
  shadow: false,
})
export class SafetySliderArrows {

  @Prop() readonly slideCount: number = 2;
  @Prop() readonly activeSlide: number = 0;
  @Prop() readonly prevArrowInnerHTML: string = '←';
  @Prop() readonly nextArrowInnerHTML: string = '→';
  @Prop() readonly isInfinite: boolean;

  @Event() safetySliderNavigationClick: EventEmitter<number>;

  private prevArrowClick = () => {
    this.safetySliderNavigationClick.emit(this.activeSlide - 1 >= 0 ? this.activeSlide - 1 : this.slideCount - 1);
  }

  private nextArrowClick = () => {
    this.safetySliderNavigationClick.emit(this.activeSlide + 1 < this.slideCount ? this.activeSlide + 1 : 0);
  }

  render() {
    return (
      <Host>
        <button
          class="safety-slider-arrow -prev"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === 0}
          innerHTML={this.prevArrowInnerHTML}
          onClick={this.prevArrowClick}>
        </button>
        <button
          class="safety-slider-arrow -next"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === this.slideCount - 1}
          innerHTML={this.nextArrowInnerHTML}
          onClick={this.nextArrowClick}>
        </button>
      </Host>
    );
  }

}
