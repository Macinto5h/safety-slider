import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'safety-slider-dots',
  shadow: false,
})
export class SafetySliderDots {

  private dotButtons: Array<HTMLButtonElement>;

  @Prop() readonly activeDot: number
  @Prop() readonly dotCount: number;

  componentWillLoad() {
    this.dotButtons = new Array<HTMLButtonElement>();
  }

  render() {
    return (
      <Host>
        {[...new Array(this.dotCount)].map((x, i) =>
          <button
            class="safety-slider__dot"
            type="button"
            disabled={i === this.activeDot}
            data-slide={i}
            ref={(el) => this.dotButtons = [...this.dotButtons, el]}
          >
          </button>
        )}
      </Host>
    );
  }

}
