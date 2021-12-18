import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'safety-slider-slides',
  styleUrl: 'safety-slider-slides.scss',
  shadow: false,
})
export class SafetySliderSlides {

  private readonly activeClass = '-active';

  @Element() root: HTMLSafetySliderSlidesElement;

  @Prop() readonly activeSlide: number = 0;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.root.children[oldActiveSlide].classList.remove(this.activeClass);
    this.root.children[newActiveSlide].classList.add(this.activeClass);
  }

  componentDidLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];

    slides.forEach((slide) => {
      slide.classList.add('safety-slider__slide');
    });

    slides[this.activeSlide]?.classList.add(this.activeClass);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
