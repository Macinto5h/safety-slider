import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
  tag: 'safety-slider-dots',
  styleUrl: 'safety-slider-dots.scss',
  shadow: false,
})
export class SafetySliderDots {

  private dotButtons: Array<HTMLButtonElement>;

  @Prop() readonly activeDot: number
  @Prop() readonly dotCount: number;

  @Event() safetySliderNavigationClick: EventEmitter<number>;

  componentWillLoad() {
    this.dotButtons = new Array<HTMLButtonElement>();
  }

  render() {
    return (
      <Host>
        {[...new Array(this.dotCount)].map((x, i) =>
          <button
            class="dot"
            type="button"
            disabled={i === this.activeDot}
            onClick={() => this.safetySliderNavigationClick.emit(i)}
            ref={(el) => this.dotButtons = [...this.dotButtons, el]}
          >
          </button>
        )}
      </Host>
    );
  }
}
