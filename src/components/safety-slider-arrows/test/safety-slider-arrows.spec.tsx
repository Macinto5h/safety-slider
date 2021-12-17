import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderArrows } from '../safety-slider-arrows';

describe('safety-slider-arrows', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SafetySliderArrows],
      html: `<safety-slider-arrows></safety-slider-arrows>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider-arrows>
        <button class="safety-slider-arrow -prev" disabled="" type="button">
          ←
        </button>
        <button class="safety-slider-arrow -next" type="button">
          →
        </button>
      </safety-slider-arrows>
    `);
  });
});
