import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider', () => {
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

    const arrows = await page.findAll(`.safety-slider-arrow`);
    const dots = await page.find('safety-slider-dots');

    const dotCount = await dots.getProperty('dotCount');
    const activeDot = await dots.getProperty('activeDot');

    expect(arrows.length).toBe(2);
    expect(dotCount).toBe(3);
    expect(activeDot).toBe(0);
  });
});
