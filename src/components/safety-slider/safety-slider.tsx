/*global HTMLSafetySliderElement*/
import { Component, Host, h, Element, Prop, Method } from '@stencil/core';
import { SliderClasses } from './enum/safety-slider.selectors';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.css',
  shadow: false,
})
export class SafetySlider {

  private slideCount: number;
  private slideContainer: HTMLDivElement;
  private activeSlide = 0;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;

  @Element() root: HTMLSafetySliderElement;

  @Prop() readonly noArrows: boolean;
  @Prop() readonly noDots: boolean;

  componentWillLoad() {
    this.slideCount = this.root.children.length;
  }

  componentDidLoad() {
    this.assignSlideClasses();
    this.setActiveSlide(this.activeSlide);
  }

  @Method()
  async setActiveSlide(newActiveSlide: number) {
    if (this.slideCount > 0) {
      this.slideContainer.children[this.activeSlide].classList.remove(SliderClasses.Active);
      this.slideContainer.children[newActiveSlide].classList.add(SliderClasses.Active);

      if (this.slideCount > 1 && !this.noArrows)
        this.setArrowBtnDisability(newActiveSlide);

      this.activeSlide = newActiveSlide;
    }
  }

  private assignSlideClasses() {
    for (let i = 0; i < this.slideCount; i++)
      this.slideContainer.children[i].classList.add(SliderClasses.Slide);
  }

  private setArrowBtnDisability(newActiveSlide: number) {
    this.prevBtn.disabled = newActiveSlide === 0;
    this.nextBtn.disabled = newActiveSlide === this.slideCount - 1;
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
        <div class={SliderClasses.SlideContainer} ref={(el) => this.slideContainer = el as HTMLDivElement}>
          <slot></slot>
        </div>

        {this.slideCount > 1 && !this.noArrows && (
          <div class={SliderClasses.ArrowContainer}>
            <button class={SliderClasses.ArrowButton + ' ' + SliderClasses.Previous}
              type="button"
              ref={(el) => this.prevBtn = el as HTMLButtonElement}>
                Previous arrow
            </button>
            <button class={SliderClasses.ArrowButton + ' ' + SliderClasses.Next}
              type="button"
              onClick={this.nextArrowClick}
              ref={(el) => this.nextBtn = el as HTMLButtonElement}>
                Next arrow
            </button>
          </div>
        )}

        {this.slideCount > 1 && !this.noDots && (
          <div class={SliderClasses.DotContainer}>
            {[...new Array(this.slideCount)].map((x, i) =>
              <button class={SliderClasses.Dot} type="button" onClick={this.dotClick} data-slide={i}>
                {i}
              </button>
            )}
          </div>
        )}
      </Host>
    );
  }
}
