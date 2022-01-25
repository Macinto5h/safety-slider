import { newSpecPage } from '@stencil/core/testing';
import { SafetySlider } from '../safety-slider';

describe('safety-slider', () => {
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

      expect(page.root.querySelectorAll(`.safety-slider-arrow`).length).toBe(0);
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

      expect(page.root.querySelectorAll(`.safety-slider-dot`).length).toBe(0);
    });

    it('should render the safety slider with a unique id', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const safetySliderId = page.root.id;
      const uuidLength = 36;
      const idPrefix = 'ss-';

      expect(safetySliderId.startsWith(idPrefix)).toBeTruthy();
      expect(safetySliderId.length).toEqual(idPrefix.length + uuidLength);
    });
  });
});
