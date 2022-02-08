import { Component, Host, h, Element, Prop, Method, State, Listen } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import { SLIDER_ID_PREFIX } from './safety-slider.resources';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: false,
})
export class SafetySlider {

  private uuid: string = uuidv4();
  private slideCount: number;

  @Element() root: HTMLSafetySliderElement;

  @State() activeSlide = 0;

  @Prop({attribute: 'infinite'}) readonly isInfinite: boolean;
  @Prop({attribute: 'prev-arrow'}) readonly prevArrowInnerHTML: string = '←';
  @Prop({attribute: 'no-arrows'}) readonly hasNoArrows: boolean;
  @Prop({attribute: 'no-dots'}) readonly hasNoDots: boolean;
  @Prop({attribute: 'next-arrow'}) readonly nextArrowInnerHTML: string = '→';
  @Prop() readonly prevArrowAriaLabel: string;
  @Prop() readonly nextArrowAriaLabel: string;
  @Prop() readonly dotAriaLabel: string;

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

  @Listen('safetySliderNavigationClick')
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

    this.activeSlide = newActiveSlide;
  }

  render() {
    return (
      <Host class="safety-slider" id={SLIDER_ID_PREFIX + this.uuid}>
        <safety-slider-window activeSlide={this.activeSlide} isInfinite={this.isInfinite} uuid={this.uuid}>
          <slot></slot>
        </safety-slider-window>

        {this.slideCount > 1 && !this.hasNoArrows && (
          <safety-slider-arrows
            slideCount={this.slideCount}
            activeSlide={this.activeSlide}
            prevArrowInnerHTML={this.prevArrowInnerHTML}
            nextArrowInnerHTML={this.nextArrowInnerHTML}
            isInfinite={this.isInfinite}
            prevAriaLabel={this.prevArrowAriaLabel}
            nextAriaLabel={this.nextArrowAriaLabel}
            uuid={this.uuid}>
          </safety-slider-arrows>
        )}

        {this.slideCount > 1 && !this.hasNoDots && (
          <safety-slider-dots
            activeDot={this.activeSlide}
            dotCount={this.slideCount}
            dotAriaLabel={this.dotAriaLabel}
            uuid={this.uuid}>
          </safety-slider-dots>
        )}
      </Host>
    );
  }
}
