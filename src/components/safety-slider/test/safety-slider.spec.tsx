/*global describe, it, expect*/
import { newSpecPage } from '@stencil/core/testing';
import { SliderClasses } from '../enum/safety-slider.selectors';
import { SafetySlider } from '../safety-slider';

describe('safety-slider', () => {
  describe('slot tests', () => {
    it('renders with no content', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html: `<safety-slider></safety-slider>`,
      });
      expect(page.root).toEqualHtml(`
        <safety-slider class="safety-slider">
          <safety-slider-window activeslide="0">
          </safety-slider-window>
        </safety-slider>
      `);
    });
  });

  describe('property tests', () => {
    it('does not render arrow buttons when the no-arrows property is present', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider no-arrows>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      expect(page.root.querySelectorAll(`.${SliderClasses.ArrowButton}`).length).toBe(0);
    });

    it('does not render dot buttons when the no-dots property is present', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider no-dots>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      expect(page.root.querySelectorAll(`.${SliderClasses.Dot}`).length).toBe(0);
    });
  });
});
