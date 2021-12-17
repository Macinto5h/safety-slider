import { Component, Host, h, Element, Prop, Method, State, Listen } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.scss',
  shadow: false,
})
export class SafetySlider {

  private slideCount: number;
  private activeSlide = 0;

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

  @Listen('safetySliderButtonClick')
  onSafetySliderButtonClick(event: CustomEvent<number>) {
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

    this.activeSlide = newActiveSlide;
    this.containerActiveSlide = newActiveSlide;
  }

  render() {
    return (
      <Host class="safety-slider">
        <safety-slider-window activeSlide={this.containerActiveSlide}>
          <slot></slot>
        </safety-slider-window>

        {this.slideCount > 1 && !this.hasNoArrows && (
          <safety-slider-arrows
            slideCount={this.slideCount}
            activeSlide={this.containerActiveSlide}
            prevArrowInnerHTML={this.leftArrowInnerHTML}
            nextArrowInnerHTML={this.rightArrowInnerHTML}
            isInfinite={this.isInfinite}>
          </safety-slider-arrows>
        )}

        {this.slideCount > 1 && !this.hasNoDots && (
          <safety-slider-dots activeDot={this.containerActiveSlide} dotCount={this.slideCount}></safety-slider-dots>
        )}
      </Host>
    );
  }
}
