export declare class SafetySlider {
  private uuid;
  private slideCount;
  root: HTMLSafetySliderElement;
  activeSlide: number;
  readonly isInfinite: boolean;
  readonly prevArrowInnerHTML: string;
  readonly hasNoArrows: boolean;
  readonly hasNoDots: boolean;
  readonly nextArrowInnerHTML: string;
  readonly prevArrowAriaLabel: string;
  readonly nextArrowAriaLabel: string;
  readonly dotAriaLabel: string;
  componentWillLoad(): void;
  componentDidLoad(): void;
  onSafetySliderDotClick(event: CustomEvent<number>): void;
  setActiveSlide(newActiveSlide: number): Promise<void>;
  private applyActiveSlideChanges;
  render(): any;
}
