import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderSlides } from '../safety-slider-slides';

describe('safety-slider-slides', () => {
  it('should render slot content with slide classes', async () => {
    const page = await newSpecPage({
      components: [SafetySliderSlides],
      html: `<safety-slider-slides><img src="https://picsum.photos/100/"></safety-slider-slides>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider-slides>
        <img src="https://picsum.photos/100/" class="safety-slider__slide -active">
      </safety-slider-slides>
    `);
  });
});
