import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderWindow } from '../safety-slider-window';

describe('safety-slider-window', () => {
  it('should render slot content with slide classes', async () => {
    const page = await newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window><img src="https://picsum.photos/100/"></safety-slider-window>`,
    });

    expect(page.body.querySelector('.safety-slider__slide.-active')).not.toBeNull();
  });
});
