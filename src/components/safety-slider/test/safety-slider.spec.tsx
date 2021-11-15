import { newSpecPage } from '@stencil/core/testing';
import { SafetySlider } from '../safety-slider';

describe('safety-slider', () => {
  it('renders with no content', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html: `<safety-slider></safety-slider>`,
    });
    expect(page.root).toEqualHtml(`
      <safety-slider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </safety-slider>
    `);
  });
  it('renders two arrow buttons when content is in the slot', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html: `<safety-slider><img src="https://picsum.photos/100/100" alt="Randomly generated image"></safety-slider>`
    });
    expect(page.root.querySelectorAll('safety-slider__btn').length).toBe(2);
  });
});
