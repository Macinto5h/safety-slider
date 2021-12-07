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
      </safety-slider-dots>
    `);
  });

  it('renders a number of dot buttons based on the value passed to dotCount', async () => {
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots dot-count="3"></safety-slider-dots>`,
    });

    const dotBtns = page.root.querySelectorAll('button');

    expect(dotBtns.length).toBe(3);
  });
});
