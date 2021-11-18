/*global HTMLSafetySliderElement*/
import { Component, Host, h, Element, Prop, Method } from '@stencil/core';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: false,
})
export class SafetySlider {

  private slideCount: number;
  private slideContainer: HTMLDivElement;
  private activeSlide: number = 0;
  private prevBtn: HTMLButtonElement;

  @Element() root: HTMLSafetySliderElement;

  @Prop() readonly noArrows: boolean;
  @Prop() readonly noDots: boolean;

  componentWillLoad() {
    this.slideCount = this.root.children.length;
  }

  componentDidLoad() {
    this.slideContainer = this.root.querySelector('.safety-slider__slides');
    this.prevBtn = this.root.querySelector('.safety-slider__arrow.-prev');

    this.assignSlideClasses();
    this.setActiveSlide(this.activeSlide);
  }

  @Method()
  async setActiveSlide(activeSlide: number) {
    if (this.slideCount > 0) {
      this.slideContainer.children[this.activeSlide].classList.remove('-active');
      this.slideContainer.children[activeSlide].classList.add('-active');

      this.setArrowBtnDisability(this.activeSlide, activeSlide);
      this.activeSlide = activeSlide;
    }
  }

  private assignSlideClasses() {
    for (let i = 0; i < this.slideCount; i++)
      this.slideContainer.children[i].classList.add('safety-slider__slide');
  }

  private setArrowBtnDisability(oldActiveSlide: number, newActiveSlide: number) {
    if (oldActiveSlide !== newActiveSlide && oldActiveSlide === 0) {
      this.prevBtn.disabled = false;
    }
  }

  private dotClick = (event: MouseEvent) => {
    const activeSlide = parseInt((event.target as HTMLButtonElement).getAttribute('data-slide'));
    this.setActiveSlide(activeSlide);
  }

  private nextArrowClick = () => {
    this.setActiveSlide(this.activeSlide + 1);
  }

  render() {
    return (
      <Host>
        <div class="safety-slider__slides">
          <slot></slot>
        </div>

        {this.slideCount > 1 && !this.noArrows && (
          <div class="safety-slider__arrows">
            <button class="safety-slider__arrow -prev" type="button" disabled>Previous arrow</button>
            <button class="safety-slider__arrow -next" type="button" onClick={this.nextArrowClick}>Next arrow</button>
          </div>
        )}

        {this.slideCount > 1 && !this.noDots && (
          <div class="safety-slider__dots">
            {[...new Array(this.slideCount)].map((x, i) =>
              <button class="safety-slider__dot" type="button" onClick={this.dotClick} data-slide={i}>
                {i}
              </button>
            )}
          </div>
        )}
      </Host>
    );
  }

}
