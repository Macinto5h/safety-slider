/*global describe, it, expect*/
import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider></safety-slider>');

    const element = await page.find('safety-slider');
    expect(element).toHaveClass('hydrated');
  });

  it('renders and the active slide has the same width as the slide window', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider><img src="https://picsum.photos/100/"></safety-slider>');

    const windowElement = await page.find('safety-slider-window');
    const activeSlideElement = await page.find('.safety-slider__slide.-active');

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slideWindowWidth = await windowElement.getProperty('offsetWidth');

    expect(slideWindowWidth).toBe(activeSlideWidth);
  });

  it('should translate the slides container to the position of the active slide', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider><img src="https://picsum.photos/100/"><img src="https://picsum.photos/100/"></safety-slider>');

    const slideContainerElement = await page.find('safety-slider-slides');
    const nextBtn = await page.find('.safety-slider__arrow.-next');

    nextBtn.click();
    await page.waitForChanges();
    await page.waitForTimeout(250);


    const activeSlideElement = await page.find('.safety-slider__slide.-active');

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slideContainerStyle = await slideContainerElement.getComputedStyle();

    expect(slideContainerStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });

  it('should change the active slide when the previous button is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const nextBtn = await page.find('.safety-slider__arrow.-next');
    const prevBtn = await page.find('.safety-slider__arrow.-prev');
    const slides = await page.find('safety-slider-slides');

    nextBtn.click();
    await page.waitForChanges();

    prevBtn.click();
    await page.waitForChanges();

    const activeSlide = await slides.getProperty('activeSlide');

    expect(activeSlide).toBe(0);
  });

  it('should change the active slide when setActiveSlide is called', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const safetySlider = await page.find('safety-slider');
    await safetySlider.callMethod('setActiveSlide', 1);

    await page.waitForChanges();

    const slides = await page.find('safety-slider-slides');
    const activeSlide = await slides.getProperty('activeSlide');

    expect(activeSlide).toBe(1);
  });

  it('should change the active slide when the next arrow button is clicked. The previous button should be enabled.', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const prevBtn = await page.find('.safety-slider__arrow.-prev');
    const nextBtn = await page.find('.safety-slider__arrow.-next');
    const slides = await page.find('safety-slider-slides');

    nextBtn.click();
    await page.waitForChanges();

    const prevBtnDisabled = await prevBtn.getProperty('disabled');
    const activeSlide = await slides.getProperty('activeSlide');

    expect(activeSlide).toEqual(1);
    expect(prevBtnDisabled).toBeFalsy();
  });

  it('should change the active slide when a dot button is clicked. The dot should be disabled afterwards.', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const dots = await page.findAll('.dot');
    const slides = await page.find('safety-slider-slides');

    dots[1].click();
    await page.waitForChanges();

    const activeSlide = await slides.getProperty('activeSlide');
    const secondDotDisabled = await dots[1].getProperty('disabled');

    expect(activeSlide).toEqual(1);
    expect(secondDotDisabled).toBeTruthy();
  });

  it('should go to the first slide when the next button is clicked and infinite property is present', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider infinite>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const safetySlider = await page.find('safety-slider');
    const nextBtn = await page.find('.safety-slider__arrow.-next');
    const slides = await page.find('safety-slider-slides');

    await safetySlider.callMethod('setActiveSlide', 2);

    nextBtn.click();
    await page.waitForChanges();

    const activeSlide = await slides.getProperty('activeSlide');

    expect(activeSlide).toBe(0);
  });

  it('should go to the last slide when previous button is clicked and infinite property is present', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider infinite>
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const prevBtn = await page.find('.safety-slider__arrow.-prev');
    const slides = await page.find('safety-slider-slides');

    prevBtn.click();
    await page.waitForChanges();

    const activeSlide = await slides.getProperty('activeSlide');

    expect(activeSlide).toEqual(2);
  });

  it('renders active slide with no dots and arrows if only one item is provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <safety-slider infinite>
        <img src="https://picsum.photos/100/">
      </safety-slider>
    `);

    const arrows = await page.findAll('.safety-slider__arrow');
    const dots = await page.findAll('.safety-slider__dot');

    expect(arrows.length).toBe(0);
    expect(dots.length).toBe(0);
  });

  it('renders arrow buttons and dots when there is more than 1 items in the slot, left arrow by default is disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
        <safety-slider>
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
          <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        </safety-slider>
    `);

    const arrows = await page.findAll(`.safety-slider__arrow`);
    const dots = await page.find('safety-slider-dots');

    const dotCount = await dots.getProperty('dotCount');
    const activeDot = await dots.getProperty('activeDot');

    expect(arrows.length).toBe(2);
    expect(dotCount).toBe(3);
    expect(activeDot).toBe(0);
  });
});
