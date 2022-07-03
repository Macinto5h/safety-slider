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
  private dragOrSwipeStart: number;
  private dragOrSwipeCurrentPosition: number;
  private dragOrSwipeIsActive = false;

  @Element() root: HTMLSafetySliderWindowElement;

  @State() rootWidth: number;

  @Prop() readonly activeSlide: number = 0;
  @Prop({ reflect: true }) readonly isInfinite: boolean = false;
  @Prop() readonly uuid: string;
  @Prop() readonly trackTransitionDuration: number = 250;
  @Prop() readonly isDraggable: boolean = true;
  @Prop() readonly isSwipeable: boolean = true;

  @Watch('activeSlide')
  activeSlideChanged(newActiveSlide: number, oldActiveSlide: number) {
    this.moveActiveSlideClass(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToFront(newActiveSlide, oldActiveSlide);
    this.setInfiniteLoopToBack(newActiveSlide, oldActiveSlide);
  }

  @Event() safetySliderInfiniteLoopAdjustment: EventEmitter;
  @Event() safetySliderApplyTransitionDuration: EventEmitter;
  @Event() safetySliderSlideChange: EventEmitter<number>;

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
    if (this.isDraggable) {
      this.dragOrSwipeStartHandler(event.offsetX);
    }
  }

  @Listen('touchstart')
  touchStartHandler(event: TouchEvent) {
    if (this.isSwipeable) {
      const touch = event.touches[0] || event.changedTouches[0];
      this.dragOrSwipeStartHandler(touch.pageX);
    }
  }

  @Listen('mousemove')
  mouseMoveHandler(event: MouseEvent) {
    if (!this.dragOrSwipeIsActive) return null;

    this.dragOrSwipeCurrentPosition = event.offsetX;
    setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset + (this.dragOrSwipeCurrentPosition - this.dragOrSwipeStart)}px`);

    return this.dragOrSwipeCurrentPosition;
  }

  @Listen('touchmove')
  touchMoveHandler(event: TouchEvent) {
    if (!this.dragOrSwipeIsActive) return null;

    const touch = event.touches[0] || event.changedTouches[0];
    this.dragOrSwipeCurrentPosition = touch.pageX;
    setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset + (this.dragOrSwipeCurrentPosition - this.dragOrSwipeStart)}px`);
    return this.dragOrSwipeCurrentPosition;
  }

  @Listen('mouseleave')
  mouseLeaveHandler(event: MouseEvent) {
    this.dragEndHandler(event);
  }

  @Listen('mouseup')
  mouseUpHandler(event: MouseEvent) {
    this.dragEndHandler(event);
  }

  @Listen('touchend')
  touchEndHandler(event: TouchEvent) {
    const touch = event.touches[0] || event.changedTouches[0];
    this.dragOrSwipeCurrentPosition = touch.pageX;
    this.safetySliderSlideChange.emit(this.activeSlideAfterDrag());
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
    const dragChangeThreshold = Math.floor(this.rootWidth / 4);

    if (this.dragOrSwipeStart - this.dragOrSwipeCurrentPosition >= dragChangeThreshold) {
      return this.fetchNextSlideIndex();
    } else if (this.dragOrSwipeCurrentPosition - this.dragOrSwipeStart >= dragChangeThreshold) {
      return this.fetchPreviousSlideIndex();
    }

    return this.activeSlide;
  }

  private fetchPreviousSlideIndex() {
    const previousSlideIndex = this.activeSlide - 1;
    const previousSlideIndexIsValid = previousSlideIndex >= 0;

    if (previousSlideIndexIsValid) {
      return previousSlideIndex;
    } else if (this.isInfinite) {
      return this.slideCount - 1;
    }

    return 0;
  }

  private fetchNextSlideIndex() {
    const nextSlideIndex = this.activeSlide + 1;
    const nextSlideIndexIsValid = nextSlideIndex <= this.slideCount - 1;

    if (nextSlideIndexIsValid) {
      return nextSlideIndex;
    } else if (this.isInfinite) {
      return 0;
    }

    return this.slideCount - 1;
  }

  private dragEndHandler(event: MouseEvent) {
    if (this.dragOrSwipeIsActive) {
      this.dragOrSwipeCurrentPosition = event.offsetX;

      const activeSlideAfterDrag = this.activeSlideAfterDrag();

      this.dragOrSwipeIsActive = false;
      setCssProperty(this.root, TRACK_TRANSITION_DURATION_CSS_VAR, `${this.trackTransitionDuration}ms`);

      if (activeSlideAfterDrag != this.activeSlide) {
        this.safetySliderSlideChange.emit(activeSlideAfterDrag);
      } else {
        setCssProperty(this.root, TRACK_OFFSET_CSS_VAR, `${this.slidesOffset}px`);
      }
    }
  }

  private dragOrSwipeStartHandler(startPosition: number) {
    this.dragOrSwipeStart = startPosition;
    this.dragOrSwipeIsActive = true;
    this.disableTrackTransitionDuration();
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
