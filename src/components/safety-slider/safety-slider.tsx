/*global HTMLSafetySliderElement*/
import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: false,
})
export class SafetySlider {

  private hasSlides: boolean;
  private slideCount: number;

  @Element() root: HTMLSafetySliderElement;

  @Prop() readonly noArrows: boolean;
  @Prop() readonly noDots: boolean;

  componentWillLoad() {
    this.slideCount = this.root.children.length;
    this.hasSlides = this.slideCount > 0;
  }

  componentDidLoad() {
    if (this.hasSlides)
      this.assignSlideClasses();
  }

  @Method()
  async setActiveSlide(activeSlide: number) {
    this.root.querySelector('.safety-slider__slide.-active').classList.remove('-active');
    this.root.querySelector('.safety-slider__slides').children[activeSlide].classList.add('-active');
  }

  private assignSlideClasses() {
    const slides = this.root.querySelector('.safety-slider__slides').children;

    for (let i = 0; i < this.slideCount; i++)
      slides[i].classList.add('safety-slider__slide');

    slides[0].classList.add('-active');
  }

  render() {
    return (
      <Host>
        <div class="safety-slider__slides">
          <slot></slot>
        </div>

        {this.hasSlides && !this.noArrows && (
          <div class="safety-slider__arrows">
            <button class="safety-slider__arrow" type="button">Left arrow</button>
            <button class="safety-slider__arrow" type="button">Right arrow</button>
          </div>
        )}

        {this.hasSlides && !this.noDots && (
          <div class="safety-slider__dots">
            {[...new Array(this.slideCount)].map((x, i) =>
              <button class="safety-slider__dot" type="button">{i}</button>
            )}
          </div>
        )}
      </Host>
    );
  }

}
