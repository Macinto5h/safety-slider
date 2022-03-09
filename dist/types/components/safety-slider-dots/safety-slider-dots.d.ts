import { EventEmitter } from '../../stencil-public-runtime';
export declare class SafetySliderDots {
  private dotButtons;
  readonly activeDot: number;
  readonly dotCount: number;
  readonly dotAriaLabel: string;
  readonly uuid: string;
  safetySliderNavigationClick: EventEmitter<number>;
  componentWillRender(): void;
  private getFormattedAriaLabel;
  private dotClick;
  render(): any;
}
