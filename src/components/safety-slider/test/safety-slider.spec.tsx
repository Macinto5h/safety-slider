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
  it('renders arrow buttons and dots when content is in the slot', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    expect(page.root.shadowRoot.querySelectorAll('.safety-slider__arrow').length).toBe(2);
    expect(page.root.shadowRoot.querySelectorAll('.safety-slider__dot').length).toBe(3);
  });
  it('does not render arrow buttons when the no-arrows attribute is present', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider no-arrows>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    expect(page.root.shadowRoot.querySelectorAll('.safety-slider__arrow').length).toBe(0);
  });
  it('does not render dot buttons when the no-dots attribute is present', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider no-dots>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    expect(page.root.shadowRoot.querySelectorAll('.safety-slider__dot').length).toBe(0);
  });
});
