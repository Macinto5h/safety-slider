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

    it('should render left arrow content based on the value given to the left-arrow property', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider left-arrow="<i class='fa fa-chevron-left'></i>">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const prevArrowBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Previous}`);

      expect(prevArrowBtn.innerHTML).toEqualHtml("<i class='fa fa-chevron-left'></i>");
    });

    it('should render right arrow content based on the value given to the right-arrow property', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider right-arrow="<i class='fa fa-chevron-left'></i>">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const nextArrowBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`);

      expect(nextArrowBtn.innerHTML).toEqualHtml("<i class='fa fa-chevron-left'></i>");
    });

    it('should render default values of the left and right arrow content if properties are not set', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const prevArrowBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Previous}`);
      const nextArrowBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`);

      expect(prevArrowBtn.innerHTML).toEqual('←');
      expect(nextArrowBtn.innerHTML).toEqual('→');
    });

  });

  describe('event tests', () => {
    let page;

    beforeEach(async () => {
      page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });
    });

    it('The next arrow button should be disabled when the active slide is the last slide.', async () => {
      page.rootInstance.setActiveSlide(2);
      await page.waitForChanges();

      const nextBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement

      expect(nextBtn.disabled).toBeTruthy();
    });
  });
});
