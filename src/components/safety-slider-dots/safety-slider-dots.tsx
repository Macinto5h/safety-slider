import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'safety-slider-dots',
  styleUrl: 'safety-slider-dots.css',
  shadow: false,
})
export class SafetySliderDots {

  private dotButtons: number[];

  @Prop() readonly activeDot: number
  @Prop() readonly dotCount: number;

  @Event() safetySliderNavigationClick: EventEmitter<number>;

  componentWillRender() {
    this.dotButtons = [];
    for (let i = 0; i < this.dotCount; i++)
      this.dotButtons.push(i);
  }

  private dotClick = (event: MouseEvent) => {
    const activeSlideValue = (event.target as HTMLButtonElement).getAttribute('data-slide');

    this.safetySliderNavigationClick.emit(parseInt(activeSlideValue));
  };

  render() {
    return (
      <Host>
        {this.dotButtons.map((i) =>
          <button
            class="dot"
            type="button"
            disabled={i === this.activeDot}
            onClick={this.dotClick}
            aria-label={`Go to slide ${i} of ${this.dotCount}`}
            data-slide={i}
          >
          </button>
        )}
      </Host>
    );
  }
}
