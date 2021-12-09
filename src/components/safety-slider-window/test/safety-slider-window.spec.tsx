import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderWindow } from '../safety-slider-window';

describe('safety-slider-window', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window></safety-slider-window>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider-window>
        <safety-slider-slides>
        </safety-slider-slides>
      </safety-slider-window>
    `);
  });
});
