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
        <safety-slider>
          <div class="safety-slider__slides"></div>
        </safety-slider>
      `);
    });

    it('renders arrow buttons and dots when there is more than 1 items in the slot, left arrow by default is disabled', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const arrows = page.root.querySelectorAll(`.${SliderClasses.ArrowButton}`);

      expect(arrows.length).toBe(2);
      expect(page.root.querySelectorAll(`.${SliderClasses.Dot}`).length).toBe(3);
      expect((arrows[0] as HTMLButtonElement).disabled).toBeTruthy();
    });

    it('renders active slide with no dots and arrows if only one item is provided', async () => {
      const page = await newSpecPage({
        components: [SafetySlider],
        html:
          `<safety-slider>
            <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          </safety-slider>`
      });

      const arrows = page.root.querySelectorAll(`.${SliderClasses.ArrowButton}`);
      const dots = page.root.querySelectorAll(`.${SliderClasses.Dot}`);
      const activeSlide = page.root.querySelector(`.${SliderClasses.Slide}.${SliderClasses.Active}`);

      expect(arrows.length).toBe(0);
      expect(dots.length).toBe(0);
      expect(activeSlide).not.toBeNull();
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

  describe('public method tests', () => {
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

    it('The active slide should be changed when setActiveSlide is called', async () => {
      page.rootInstance.setActiveSlide(1);

      expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
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

    it('The active slide should be changed when a dot button is clicked. The dot should be disabled afterwards.', async () => {
      const secondDotBtn = page.root.querySelectorAll(`.${SliderClasses.Dot}`)[1] as HTMLButtonElement;
      secondDotBtn.click();

      expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
      expect(secondDotBtn.disabled).toBeTruthy();
    });

    it('The active slide should change to next slide when the next arrow button is clicked. The previous arrow button should be enabled.', async () => {
      (page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement).click();
      await page.waitForChanges();

      const prevArrowBtn = (page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Previous}`) as HTMLButtonElement);

      expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
      expect(prevArrowBtn.disabled).toBeFalsy();
    });

    it('The next arrow button should be disabled when the active slide is the last slide.', async () => {
      page.rootInstance.setActiveSlide(2);
      await page.waitForChanges();

      const nextBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement

      expect(nextBtn.disabled).toBeTruthy();
    });

    it('should change the active slide when the previous button is clicked', async () => {
      const nextBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement;
      const prevBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Previous}`) as HTMLButtonElement;

      nextBtn.click();
      await page.waitForChanges();

      prevBtn.click();
      await page.waitForChanges();

      expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[0]).toHaveClass(SliderClasses.Active);
      expect(prevBtn.disabled).toBeTruthy();
    });
  });
});
