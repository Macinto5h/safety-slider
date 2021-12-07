import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderDots } from '../safety-slider-dots';

describe('safety-slider-dots', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots></safety-slider-dots>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider-dots>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </safety-slider-dots>
    `);
  });
});
