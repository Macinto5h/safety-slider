import { EventEmitter } from '../../stencil-public-runtime';
export declare class SafetySliderArrows {
  readonly slideCount: number;
  readonly activeSlide: number;
  readonly prevArrowInnerHTML: string;
  readonly nextArrowInnerHTML: string;
  readonly isInfinite: boolean;
  readonly prevAriaLabel: string;
  readonly nextAriaLabel: string;
  readonly uuid: string;
  safetySliderNavigationClick: EventEmitter<number>;
  private prevArrowClick;
  private nextArrowClick;
  render(): any;
}
