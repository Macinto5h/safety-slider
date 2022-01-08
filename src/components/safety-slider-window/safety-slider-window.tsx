import { Component, Host, h, Element, Prop, Watch, State, Listen } from '@stencil/core';

@Component({
  tag: 'safety-slider-window',
  styleUrl: 'safety-slider-window.css',
  shadow: false,
})
export class SafetySliderWindow {

  private slidesOffset: number;

  @Element() root: HTMLSafetySliderWindowElement;

  @State() rootWidth: number;

  @Prop() readonly activeSlide: number = 0;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    const track = this.root.querySelector('.safety-slider-slides');

    track.children[oldActiveSlide].classList.remove('-active');
    track.children[newActiveSlide].classList.add('-active');
  }

  componentWillRender() {
    this.rootWidth = this.root.offsetWidth;
    this.slidesOffset = this.rootWidth * this.activeSlide * -1;
  }

  componentWillLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];

    slides.forEach(slide => slide.classList.add('safety-slider__slide'));

    slides[this.activeSlide]?.classList.add('-active');

    this.rootWidth = this.root.offsetWidth;
  }

  @Listen('resize', {target: 'window'})
  windowResizeHandler() {
    this.rootWidth = this.root.offsetWidth;
  }

  render() {
    return (
      <Host>
        <div class="safety-slider-slides" style={{
          '--safety-slider-view-width': this.rootWidth + 'px',
          '--safety-slider-view-offset': this.slidesOffset + 'px'
          }}>
          <slot></slot>
        </div>
      </Host>
    );
  }

}
