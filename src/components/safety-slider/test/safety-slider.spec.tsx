import { newSpecPage } from '@stencil/core/testing';
import { SafetySlider } from '../safety-slider';
import { SLIDER_ID_PREFIX } from '../safety-slider.resources';
import { v4 as uuidv4 } from 'uuid';

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

      expect(safetySliderId.startsWith(SLIDER_ID_PREFIX)).toBeTruthy();
      expect(safetySliderId.length).toEqual(SLIDER_ID_PREFIX.length + uuidLength);
    });

    it('should set the uuid property of arrows, dots, and window to the same value', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const sliderWindow = page.root.querySelector('safety-slider-window');
      const sliderDots = page.root.querySelector('safety-slider-dots');
      const sliderArrows = page.root.querySelector('safety-slider-arrows');

      expect(sliderWindow.getAttribute('uuid').length).toEqual(uuidv4().length);
      expect(sliderWindow.getAttribute('uuid')).toEqual(sliderDots.getAttribute('uuid'));
      expect(sliderWindow.getAttribute('uuid')).toEqual(sliderArrows.getAttribute('uuid'));
    });
  });

  it('should change the active slide when setActiveSlide is called', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    const safetySlider = page.rootInstance;
    safetySlider.setActiveSlide(1);

    await page.waitForChanges();

    expect(safetySlider.activeSlide).toEqual(1);
  });

  it('should render with no dots and arrows if only one item is provided', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100/ alt="Randomly generated image">
        </safety-slider>`
    });

    const arrows = page.root.querySelector('safety-slider-arrows');
    const dots = page.root.querySelector('safety-slider-dots');

    expect(arrows).toBeNull();
    expect(dots).toBeNull();
  });

  it('should render with dots and arrows if there are more than one items in the slot', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    const arrows = page.root.querySelector('safety-slider-arrows');
    const dots = page.root.querySelector('safety-slider-dots');

    expect(arrows).not.toBeNull();
    expect(dots).not.toBeNull();
  });
});
