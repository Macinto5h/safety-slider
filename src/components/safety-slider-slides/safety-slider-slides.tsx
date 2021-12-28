import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'safety-slider-slides',
  styleUrl: 'safety-slider-slides.css',
  shadow: false,
})
export class SafetySliderSlides {

  private readonly SLIDE_CLASS: string = 'safety-slider__slide';
  private readonly SLIDE_CLASS_ACTIVE: string = '-active';

  @Element() root: HTMLSafetySliderSlidesElement;

  @Prop() readonly activeSlide: number = 0;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.root.children[oldActiveSlide].classList.remove(this.SLIDE_CLASS_ACTIVE);
    this.root.children[newActiveSlide].classList.add(this.SLIDE_CLASS_ACTIVE);
  }

  componentDidLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];

    slides.forEach((slide) => {
      slide.classList.add(this.SLIDE_CLASS);
    });

    slides[this.activeSlide]?.classList.add(this.SLIDE_CLASS_ACTIVE);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
