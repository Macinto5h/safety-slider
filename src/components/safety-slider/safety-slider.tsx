/*global HTMLSafetySliderElement*/
import { Component, Host, h, Element, Prop, Method, State, Listen } from '@stencil/core';
import { SliderClasses } from './enum/safety-slider.selectors';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.scss',
  shadow: false,
})
export class SafetySlider {

  private slideCount: number;
  private activeSlide = 0;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;

  @Element() root: HTMLSafetySliderElement;

  @State() containerActiveSlide = 0;

  @Prop({attribute: 'infinite'}) readonly isInfinite: boolean;
  @Prop({attribute: 'left-arrow'}) readonly leftArrowInnerHTML: string = '←';
  @Prop({attribute: 'no-arrows'}) readonly hasNoArrows: boolean;
  @Prop({attribute: 'no-dots'}) readonly hasNoDots: boolean;
  @Prop({attribute: 'right-arrow'}) readonly rightArrowInnerHTML: string = '→';

  componentWillLoad() {
    this.slideCount = this.root.children.length;
  }

  componentDidLoad() {
    try {
      this.applyActiveSlideChanges(this.activeSlide);
    } catch(e) {
      console.error('safety-slider: no content has been provided in the slot.');
    }
  }

  @Listen('safetySliderDotClick')
  onSafetySliderDotClick(event: CustomEvent<number>) {
    this.setActiveSlide(event.detail);
  }

  @Method()
  async setActiveSlide(newActiveSlide: number) {
    try {
      this.applyActiveSlideChanges(newActiveSlide);
    } catch(e) {
      console.error(e);
    }
  }

  private applyActiveSlideChanges(newActiveSlide: number) {
    if (newActiveSlide < 0 || newActiveSlide >= this.slideCount)
      throw 'safety-slider: newActiveSlide index is out of range.';

    this.setArrowBtnDisability(newActiveSlide);
    this.activeSlide = newActiveSlide;
    this.containerActiveSlide = newActiveSlide;
  }

  private setArrowBtnDisability(newActiveSlide: number) {
    if (this.slideCount > 1 && !this.hasNoArrows && !this.isInfinite) {
      this.prevBtn.disabled = newActiveSlide === 0;
      this.nextBtn.disabled = newActiveSlide === this.slideCount - 1;
    }
  }

  private prevArrowClick = () => {
    try {
      this.applyActiveSlideChanges(this.activeSlide - 1);
    } catch(e) {
      this.applyActiveSlideChanges(this.slideCount - 1);
    }
  }

  private nextArrowClick = () => {
    try {
      this.applyActiveSlideChanges(this.activeSlide + 1);
    } catch(e) {
      this.applyActiveSlideChanges(0);
    }
  }

  render() {
    return (
      <Host class="safety-slider">
        <safety-slider-window activeSlide={this.containerActiveSlide}>
          <slot></slot>
        </safety-slider-window>

        {this.slideCount > 1 && !this.hasNoArrows && (
          <div class={SliderClasses.ArrowContainer}>
            <button class={SliderClasses.ArrowButton + ' ' + SliderClasses.Previous}
              type="button"
              onClick={this.prevArrowClick}
              ref={(el) => this.prevBtn = el as HTMLButtonElement}
              innerHTML={this.leftArrowInnerHTML}>
            </button>
            <button class={SliderClasses.ArrowButton + ' ' + SliderClasses.Next}
              type="button"
              onClick={this.nextArrowClick}
              ref={(el) => this.nextBtn = el as HTMLButtonElement}
              innerHTML={this.rightArrowInnerHTML}>
            </button>
          </div>
        )}

        {this.slideCount > 1 && !this.hasNoDots && (
          <safety-slider-dots activeDot={this.containerActiveSlide} dotCount={this.slideCount}></safety-slider-dots>
        )}
      </Host>
    );
  }
}
