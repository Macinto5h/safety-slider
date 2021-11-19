/*global describe, it, expect*/
import { newSpecPage } from '@stencil/core/testing';
import { SliderClasses } from '../enum/safety-slider.selectors';
import { SafetySlider } from '../safety-slider';

describe('safety-slider', () => {
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
  it('does not render arrow buttons and dots when there is only one slide', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    const arrows = page.root.querySelectorAll(`.${SliderClasses.ArrowButton}`);
    const dots = page.root.querySelectorAll(`.${SliderClasses.Dot}`);

    expect(arrows.length).toBe(0);
    expect(dots.length).toBe(0);
  })
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

    expect(page.root.querySelectorAll(`.${SliderClasses.ArrowButton}`).length).toBe(0);
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

    expect(page.root.querySelectorAll(`.${SliderClasses.Dot}`).length).toBe(0);
  });
  it('renders an active slide when there is at least one item in the slot', async () => {

    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    expect(page.root.querySelectorAll(`.${SliderClasses.Slide}.${SliderClasses.Active}`).length).toBe(1);
  });
  it('The active slide should be changed when setActiveSlide is called', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    page.rootInstance.setActiveSlide(1);

    expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
  });
  it('The active slide should be changed when a dot button is clicked', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    const secondDotBtn = page.root.querySelectorAll(`.${SliderClasses.Dot}`)[1] as HTMLButtonElement;
    secondDotBtn.click();

    expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
  });
  it('The active slide should change to next slide when the next arrow button is clicked. The previous arrow button should be enabled.', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    (page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement).click();
    await page.waitForChanges();

    const prevArrowBtn = (page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Previous}`) as HTMLButtonElement);

    expect(page.root.querySelector(`.${SliderClasses.SlideContainer}`).children[1]).toHaveClass(SliderClasses.Active);
    expect(prevArrowBtn.disabled).toBeFalsy();
  });
  it('The next arrow button should be disabled when the active slide is the last slide.', async () => {
    const page = await newSpecPage({
      components: [SafetySlider],
      html:
        `<safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>`
    });

    page.rootInstance.setActiveSlide(2);
    await page.waitForChanges();

    const nextBtn = page.root.querySelector(`.${SliderClasses.ArrowButton}.${SliderClasses.Next}`) as HTMLButtonElement

    expect(nextBtn.disabled).toBeTruthy();
  });
});
