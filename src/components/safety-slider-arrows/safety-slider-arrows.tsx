import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { WINDOW_ID_PREFIX } from '../safety-slider-window/safety-slider-window.resources';

@Component({
  tag: 'safety-slider-arrows',
  styleUrl: 'safety-slider-arrows.css',
  shadow: false,
})
export class SafetySliderArrows {

  @Prop() readonly slideCount: number = 2;
  @Prop() readonly activeSlide: number = 0;
  @Prop({attribute: 'prev-arrow'}) readonly prevArrowInnerHTML: string = '←';
  @Prop({attribute: 'next-arrow'}) readonly nextArrowInnerHTML: string = '→';
  @Prop() readonly isInfinite: boolean;
  @Prop() readonly prevAriaLabel: string = "Go to previous slide";
  @Prop() readonly nextAriaLabel: string = "Go to next slide";
  @Prop() readonly uuid: string;

  @Event() safetySliderNavigationClick: EventEmitter<number>;

  private prevArrowClick = () => {
    this.safetySliderNavigationClick.emit(this.getPrevSlideNumber());
  }

  private getPrevSlideNumber() {
    return this.activeSlide - 1 >= 0
      ? this.activeSlide - 1
      : this.slideCount - 1;
  }

  private nextArrowClick = () => {
    this.safetySliderNavigationClick.emit(this.getNextSlideNumber());
  }

  private getNextSlideNumber() {
    return this.activeSlide + 1 < this.slideCount ? this.activeSlide + 1 : 0;
  }

  render() {
    return (
      <Host>
        <button
          class="safety-slider-arrow -prev"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === 0}
          innerHTML={this.prevArrowInnerHTML}
          onClick={this.prevArrowClick}
          aria-label={this.prevAriaLabel}
          aria-controls={WINDOW_ID_PREFIX + this.uuid}>
        </button>
        <button
          class="safety-slider-arrow -next"
          type="button"
          disabled={this.isInfinite ? false : this.activeSlide === this.slideCount - 1}
          innerHTML={this.nextArrowInnerHTML}
          onClick={this.nextArrowClick}
          aria-label={this.nextAriaLabel}
          aria-controls={WINDOW_ID_PREFIX + this.uuid}>
        </button>
      </Host>
    );
  }

}
