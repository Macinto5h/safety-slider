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
  WINDOW_WIDTH_CSS_VAR,
} from './safety-slider-window.resources';
import { setCssProperty } from '../../utils/css-utils';

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
  private mouseInitialXOffset: number;
  private mouseCurrentXOffset: number;
  private mouseDragIsActive = false;

  @Element() root: HTMLSafetySliderWindowElement;

  @State() rootWidth: number;

  @Prop() readonly activeSlide: number = 0;
  @Prop({ reflect: true }) readonly isInfinite: boolean = false;
  @Prop() readonly uuid: string;
  @Prop() readonly trackTransitionDuration: number = 250;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.moveActiveSlideClass(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToFront(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToBack(newActiveSlide, oldActiveSlide);
  }

  @Event() safetySliderInfiniteLoopAdjustment: EventEmitter;
  @Event() safetySliderApplyTransitionDuration: EventEmitter;
  @Event() safetySliderNavigationClick: EventEmitter<number>;

  componentWillRender() {
    this.slidesOffset = this.calculateTrackOffset();
  }

  componentWillLoad() {
    const slides = Array.from(this.root.children) as HTMLElement[];
    slides.forEach(slide => {
      slide.classList.add(SLIDE_CLASS);
      slide.setAttribute('draggable', 'false');
      this.updateSlideToBeInactive(slide);
    });

    this.updateSlideToBeActive(slides[this.activeSlide]);

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

  @Listen('resize', { target: 'window' })
  windowResizeHandler() {
    this.rootWidth = this.root.offsetWidth;
  }

  @Listen('safetySliderInfiniteLoopAdjustment')
  infiniteLoopAdjustmentHandler() {
    this.disableTrackTransitionDuration();
    setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.rootWidth * (this.activeSlide + 1) * -1}px`);

    setTimeout(() => this.safetySliderApplyTransitionDuration.emit(), this.trackTransitionDuration);
  }

  @Listen('safetySliderApplyTransitionDuration')
  applyTransitionDurationHandler() {
    setCssProperty(this.root, TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);
  }

  @Listen('mousedown')
  mouseDownHandler(event: MouseEvent) {
    this.mouseInitialXOffset = event.offsetX;
    this.mouseDragIsActive = true;
    this.disableTrackTransitionDuration();
  }

  @Listen('mousemove')
  mouseMoveHandler(event: MouseEvent) {
    if (!this.mouseDragIsActive) return null;

    this.mouseCurrentXOffset = event.offsetX;
    setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset + (this.mouseCurrentXOffset - this.mouseInitialXOffset)}px`);

    return this.mouseCurrentXOffset;
  }

  @Listen('mouseleave')
  mouseLeaveHandler() {
    this.mouseDragIsActive = false;
    setCssProperty(this.root, TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);
    setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset}px`);
  }

  @Listen('mouseup')
  mouseUpHandler(event: MouseEvent) {
    this.mouseCurrentXOffset = event.offsetX;

    let activeSlideAfterDrag = this.activeSlideAfterDrag();

    if (this.mouseDragIsActive && activeSlideAfterDrag != this.activeSlide) {
      this.safetySliderNavigationClick.emit(activeSlideAfterDrag);
    } else {
      setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset}px`);
    }

    this.mouseDragIsActive = false;
    setCssProperty(this.root, TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);
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

  private setInfiniteLoopToFront(newActiveSlide: number, oldActiveSlide: number) {
    this.infiniteLoopToFront = this.isInfinite && newActiveSlide === 0 && oldActiveSlide === this.slideCount - 1;
  }

  private setInfiniteLoopToBack(newActiveSlide: number, oldActiveSlide: number) {
    this.infiniteLoopToBack = this.isInfinite && newActiveSlide === this.slideCount - 1 && oldActiveSlide === 0;
  }

  private moveActiveSlideClass(newActiveSlide: number, oldActiveSlide: number) {
    const slides = this.trackElement.querySelectorAll<HTMLElement>(SLIDE_CLASS_QUERY);

    this.updateSlideToBeInactive(slides[oldActiveSlide]);
    this.updateSlideToBeActive(slides[newActiveSlide]);
  }

  private updateSlideToBeInactive(slide: HTMLElement) {
    slide.classList.remove(SLIDE_ACTIVE_CLASS);
    slide.tabIndex = -1;
    slide.setAttribute('aria-hidden', 'true');
  }

  private updateSlideToBeActive(slide: HTMLElement) {
    slide.classList.add(SLIDE_ACTIVE_CLASS);
    slide.tabIndex = 0;
    slide.setAttribute('aria-hidden', 'false');
  }

  private disableTrackTransitionDuration() {
    setCssProperty(this.root, TRACK_TRANSITION_DURATION_CSS_VAR, '0ms');
  }

  private activeSlideAfterDrag() {
    let dragChangeThreshold = Math.floor(this.rootWidth / 4);

    if (this.mouseInitialXOffset - this.mouseCurrentXOffset >= dragChangeThreshold) {
      return this.activeSlide + 1;
    }

    return this.activeSlide;
  }

  render() {
    return (
      <Host
        id={WINDOW_ID_PREFIX + this.uuid}
        style={{
          [WINDOW_WIDTH_CSS_VAR]: this.rootWidth + 'px',
          [TRACK_OFFSET_CSS_VAR]: this.slidesOffset + 'px',
          [TRACK_TRANSITION_DURATION_CSS_VAR]: this.trackTransitionDuration + 'ms',
        }}
      >
        <div class={SLIDE_TRACK_CLASS} ref={el => (this.trackElement = el as HTMLDivElement)} aria-live="polite">
          {this.isInfinite && this.slideCount > 1 && <div class={SLIDE_CLONE_CLASS} innerHTML={this.beginningClone}></div>}
          <slot></slot>
          {this.isInfinite && this.slideCount > 1 && <div class={SLIDE_CLONE_CLASS} innerHTML={this.endingClone}></div>}
        </div>
      </Host>
    );
  }
}
