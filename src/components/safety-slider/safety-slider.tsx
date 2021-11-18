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
  private slideContainer: HTMLDivElement;
  private activeSlide: number = 0;

  @Element() root: HTMLSafetySliderElement;

  @Prop() readonly noArrows: boolean;
  @Prop() readonly noDots: boolean;

  componentWillLoad() {
    this.slideCount = this.root.children.length;
    this.hasSlides = this.slideCount > 0;
  }

  componentDidLoad() {
    this.slideContainer = this.root.querySelector('.safety-slider__slides');

    if (this.hasSlides) {
      this.assignSlideClasses();
      this.setActiveSlide(this.activeSlide);
    }
  }

  @Method()
  async setActiveSlide(activeSlide: number) {
    this.slideContainer.children[this.activeSlide].classList.remove('-active');
    this.slideContainer.children[activeSlide].classList.add('-active');

    this.activeSlide = activeSlide;
  }

  private assignSlideClasses() {
    for (let i = 0; i < this.slideCount; i++)
      this.slideContainer.children[i].classList.add('safety-slider__slide');
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
