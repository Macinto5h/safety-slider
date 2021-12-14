import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderWindow } from '../safety-slider-window';

describe('safety-slider-window', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window></safety-slider-window>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider-window style="--safety-slider-view-width: ${page.root.offsetWidth}px; --safety-slider-view-offset: ${page.root.offsetWidth * 0}px;">
        <safety-slider-slides activeslide="0">
        </safety-slider-slides>
      </safety-slider-window>
    `);
  });
});
