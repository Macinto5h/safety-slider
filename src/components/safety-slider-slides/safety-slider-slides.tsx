import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { SliderClasses } from '../safety-slider/enum/safety-slider.selectors';

@Component({
  tag: 'safety-slider-slides',
  styleUrl: 'safety-slider-slides.scss',
  shadow: false,
})
export class SafetySliderSlides {

  @Element() root: HTMLSafetySliderSlidesElement;

  @Prop() readonly activeSlide: number = 0;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.root.children[oldActiveSlide].classList.remove(SliderClasses.Active);
    this.root.children[newActiveSlide].classList.add(SliderClasses.Active);
  }

  componentDidLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];

    slides.forEach((slide) => {
      slide.classList.add(SliderClasses.Slide);
    });

    slides[this.activeSlide]?.classList.add(SliderClasses.Active);
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
