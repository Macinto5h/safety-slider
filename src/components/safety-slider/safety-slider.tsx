/*global HTMLSafetySliderElement*/
import { Component, Host, h, Element, Prop, Method, State } from '@stencil/core';
import { SliderClasses } from './enum/safety-slider.selectors';

@Component({
  tag: 'safety-slider',
  styleUrl: 'safety-slider.scss',
  shadow: false,
})
export class SafetySlider {

  private slideCount: number;
  private slideContainer: HTMLSafetySliderSlidesElement;
  private activeSlide = 0;
  private prevBtn: HTMLButtonElement;
  private nextBtn: HTMLButtonElement;
  private dotBtns: Array<HTMLButtonElement>;

  @Element() root: HTMLSafetySliderElement;

  @State() containerActiveSlide = 0;

  @Prop({attribute: 'infinite'}) readonly isInfinite: boolean;
  @Prop({attribute: 'left-arrow'}) readonly leftArrowInnerHTML: string = '←';
  @Prop({attribute: 'no-arrows'}) readonly hasNoArrows: boolean;
  @Prop({attribute: 'no-dots'}) readonly hasNoDots: boolean;
  @Prop({attribute: 'right-arrow'}) readonly rightArrowInnerHTML: string = '→';

  componentWillLoad() {
    this.slideCount = this.root.children.length;
    this.dotBtns = new Array<HTMLButtonElement>();
  }

  componentDidLoad() {
    try {
      this.applyActiveSlideChanges(this.activeSlide);
    } catch(e) {
      console.error('safety-slider: no content has been provided in the slot.');
    }
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
    this.setDotBtnDisability(newActiveSlide);
    this.setSlideViewOffset(newActiveSlide);
    this.activeSlide = newActiveSlide;
    this.containerActiveSlide = newActiveSlide;
  }

  private setArrowBtnDisability(newActiveSlide: number) {
    if (this.slideCount > 1 && !this.hasNoArrows && !this.isInfinite) {
      this.prevBtn.disabled = newActiveSlide === 0;
      this.nextBtn.disabled = newActiveSlide === this.slideCount - 1;
    }
  }

  private setDotBtnDisability(newActiveSlide: number) {
    if (this.slideCount > 1 && !this.hasNoDots) {
      this.dotBtns[this.activeSlide].disabled = false;
      this.dotBtns[newActiveSlide].disabled = true;
    }
  }

  private setSlideViewOffset(newActiveSlide: number) {
    const viewWidth = this.slideContainer.offsetWidth;
    this.root.style.setProperty('--safety-slider-view-width', viewWidth + 'px');
    this.root.style.setProperty('--safety-slider-view-offset', `${viewWidth * newActiveSlide * -1}px`);
  }

  private dotClick = (event: MouseEvent) => {
    const activeSlide = parseInt((event.target as HTMLButtonElement).getAttribute('data-slide'));
    this.setActiveSlide(activeSlide);
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
        <div class="safety-slider__window">
          <safety-slider-slides ref={(el) => this.slideContainer = el as HTMLSafetySliderSlidesElement} activeSlide={this.containerActiveSlide}>
            <slot></slot>
          </safety-slider-slides>
        </div>

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
          <div class={SliderClasses.DotContainer}>
            {[...new Array(this.slideCount)].map((x, i) =>
              <button class={SliderClasses.Dot}
                type="button"
                onClick={this.dotClick}
                data-slide={i}
                ref={(el) => this.dotBtns = [...this.dotBtns, el as HTMLButtonElement]}>
              </button>
            )}
          </div>
        )}
      </Host>
    );
  }
}
