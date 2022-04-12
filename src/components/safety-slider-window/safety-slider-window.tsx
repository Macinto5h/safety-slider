import { Component, Host, h, Element, Prop, Watch, State, Listen, Event, EventEmitter } from '@stencil/core';
import {
  SLIDE_ACTIVE_CLASS,
  SLIDE_CLASS,
  SLIDE_CLASS_QUERY,
  SLIDE_CLONE_CLASS,
  SLIDE_TRACK_CLASS,
  WINDOW_ID_PREFIX,
  TRACK_TRANSITION_DURATION_CSS_VAR,
  TRACK_OFFSET_CSS_VAR,
  WINDOW_WIDTH_CSS_VAR
} from './safety-slider-window.resources';

@Component({
  tag: 'safety-slider-window',
  styleUrl: 'safety-slider-window.css',
  shadow: false,
})
export class SafetySliderWindow {

  private slidesOffset: number;
  private slideCount: number;
  private trackElement: HTMLDivElement;
  private beginningClone: string;
  private endingClone: string;
  private infiniteLoopToFront = false;
  private infiniteLoopToBack = false;
  private trackTransitionDuration = 250;

  @Element() root: HTMLSafetySliderWindowElement;

  @State() rootWidth: number;

  @Prop() readonly activeSlide: number = 0;
  @Prop({reflect: true}) readonly isInfinite: boolean = false;
  @Prop() readonly uuid: string;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.moveActiveSlideClass(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToFront(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToBack(newActiveSlide, oldActiveSlide);
  }

  @Event() safetySliderInfiniteLoopAdjustment: EventEmitter;
  @Event() safetySliderApplyTransitionDuration: EventEmitter;

  componentWillRender() {
    this.slidesOffset = this.calculateTrackOffset();
  }

  componentWillLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];
    slides.forEach(slide => slide.classList.add(SLIDE_CLASS));
    slides[this.activeSlide]?.classList.add(SLIDE_ACTIVE_CLASS);
    slides[this.activeSlide]?.tabIndex = "0";

    this.rootWidth = this.root.offsetWidth;
    this.slideCount = this.root.children.length;
    this.beginningClone = this.root.children[this.slideCount - 1]?.outerHTML;
    this.endingClone = this.root.children[0]?.outerHTML;
  }

  componentDidUpdate() {
    if (this.infiniteLoopToFront || this.infiniteLoopToBack) {
      setTimeout(() => this.safetySliderInfiniteLoopAdjustment.emit(), this.trackTransitionDuration);
    }
  }

  @Listen('resize', {target: 'window'})
  windowResizeHandler() {
    this.rootWidth = this.root.offsetWidth;
  }

  @Listen('safetySliderInfiniteLoopAdjustment')
  infiniteLoopAdjustmentHandler() {
    this.setCSSProperty(TRACK_TRANSITION_DURATION_CSS_VAR, `0ms`);
    this.setCSSProperty(TRACK_OFFSET_CSS_VAR, `${this.rootWidth * (this.activeSlide + 1) * -1}px`);

    setTimeout(() => this.safetySliderApplyTransitionDuration.emit(), this.trackTransitionDuration);
  }

  @Listen('safetySliderApplyTransitionDuration')
  applyTransitionDurationHandler() {
    this.setCSSProperty(TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);
  }

  private calculateTrackOffset() {
    if (this.infiniteLoopToFront) {
      return this.rootWidth * (this.slideCount + 1) * -1;
    } else if (this.infiniteLoopToBack) {
      return 0;
    } else if (this.isInfinite) {
      return this.rootWidth * (this.activeSlide + 1) * -1;
    } else {
      return this.rootWidth * this.activeSlide * -1;
    }
  }

  private setCSSProperty(key: string, value: string) {
    this.root.style.setProperty(key, value);
  }

  private setInfiniteLoopToFront(newActiveSlide: number, oldActiveSlide: number) {
    this.infiniteLoopToFront = this.isInfinite
      && newActiveSlide === 0
      && oldActiveSlide === this.slideCount - 1;
  }

  private setInfiniteLoopToBack(newActiveSlide: number, oldActiveSlide: number) {
    this.infiniteLoopToBack = this.isInfinite
      && newActiveSlide === this.slideCount - 1
      && oldActiveSlide === 0;
  }

  private moveActiveSlideClass(newActiveSlide: number, oldActiveSlide: number) {
    const slides = this.trackElement.querySelectorAll(SLIDE_CLASS_QUERY);

    this.updateSlideToBeInactive(slides[oldActiveSlide]);
    this.updateSlideToBeActive(slides[newActiveSlide]);
  }

  private updateSlideToBeInactive(slide: HTMLElement) {
    slide.classList.remove(SLIDE_ACTIVE_CLASS);
    slide.tabIndex = "-1";
    slide.setAttribute('aria-hidden', true);
  }

  private updateSlideToBeActive(slide: HTMLElement) {
    slide.classList.add(SLIDE_ACTIVE_CLASS);
    slide.tabIndex = '0';
    slide.setAttribute('aria-hidden', false);
  }

  render() {
    return (
      <Host id={WINDOW_ID_PREFIX + this.uuid} style={{
        [WINDOW_WIDTH_CSS_VAR]: this.rootWidth + 'px',
        [TRACK_OFFSET_CSS_VAR]: this.slidesOffset + 'px',
        [TRACK_TRANSITION_DURATION_CSS_VAR]: this.trackTransitionDuration + 'ms'
        }}>
        <div class={SLIDE_TRACK_CLASS} ref={(el) => this.trackElement = el as HTMLDivElement}>
          {this.isInfinite && this.slideCount > 1 && (
            <div class={SLIDE_CLONE_CLASS} innerHTML={this.beginningClone}></div>
          )}
          <slot></slot>
          {this.isInfinite && this.slideCount > 1 && (
            <div class={SLIDE_CLONE_CLASS} innerHTML={this.endingClone}></div>
          )}
        </div>
      </Host>
    );
  }
}
