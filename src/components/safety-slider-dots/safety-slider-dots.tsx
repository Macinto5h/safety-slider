import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';
import { WINDOW_ID_PREFIX } from '../safety-slider-window/safety-slider-window.resources';
import { DOT_CLASS } from './safety-slider-dots.resources';

@Component({
  tag: 'safety-slider-dots',
  styleUrl: 'safety-slider-dots.css',
  shadow: false,
})
export class SafetySliderDots {
  private dotButtons: number[];

  @Prop() readonly activeDot: number;
  @Prop() readonly dotCount: number;
  @Prop() readonly dotAriaLabel: string = 'Go to slide {0} of {1}';
  @Prop() readonly uuid: string;

  @Event() safetySliderNavigationClick: EventEmitter<number>;

  componentWillRender() {
    this.dotButtons = [];
    for (let i = 0; i < this.dotCount; i++) this.dotButtons.push(i);
  }

  private getFormattedAriaLabel(slideNumber: number) {
    return this.dotAriaLabel.replace('{0}', slideNumber.toString()).replace('{1}', this.dotCount.toString());
  }

  private dotClick = (event: MouseEvent) => {
    const activeSlideValue = (event.target as HTMLButtonElement).getAttribute('data-slide');

    this.safetySliderNavigationClick.emit(parseInt(activeSlideValue));
  };

  render() {
    return (
      <Host>
        {this.dotButtons.map(i => (
          <button
            class={DOT_CLASS}
            type="button"
            disabled={i === this.activeDot}
            onClick={this.dotClick}
            aria-label={this.getFormattedAriaLabel(i + 1)}
            aria-controls={WINDOW_ID_PREFIX + this.uuid}
            data-slide={i}
          ></button>
        ))}
      </Host>
    );
  }
}
