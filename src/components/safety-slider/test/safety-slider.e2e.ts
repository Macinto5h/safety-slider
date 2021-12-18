import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider></safety-slider>');

    const element = await page.find('safety-slider');
    expect(element).toHaveClass('hydrated');
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

    const nextBtn = await page.find('.safety-slider-arrow.-next');
    const prevBtn = await page.find('.safety-slider-arrow.-prev');
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

    const prevBtn = await page.find('.safety-slider-arrow.-prev');
    const nextBtn = await page.find('.safety-slider-arrow.-next');
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
    const nextBtn = await page.find('.safety-slider-arrow.-next');
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

    const prevBtn = await page.find('.safety-slider-arrow.-prev');
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

    const arrows = await page.findAll(`.safety-slider-arrow`);
    const dots = await page.find('safety-slider-dots');

    const dotCount = await dots.getProperty('dotCount');
    const activeDot = await dots.getProperty('activeDot');

    expect(arrows.length).toBe(2);
    expect(dotCount).toBe(3);
    expect(activeDot).toBe(0);
  });

  it('should render left arrow content based on the value given to the left-arrow property', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<safety-slider left-arrow="<i class='fa fa-chevron-left'></i>">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
      </safety-slider>`
    );

    const prevArrowBtn = await page.find(`.safety-slider-arrow.-prev`);

    expect(prevArrowBtn.innerHTML).toEqualHtml("<i class='fa fa-chevron-left'></i>");
  });


  it('should render right arrow content based on the value given to the right-arrow property', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<safety-slider right-arrow="<i class='fa fa-chevron-right'></i>">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
      </safety-slider>`
    );

    const nextArrowBtn = await page.find(`.safety-slider-arrow.-next`);

    expect(nextArrowBtn.innerHTML).toEqualHtml("<i class='fa fa-chevron-right'></i>");
  });

  it('The next arrow button should be disabled when the active slide is the last slide.', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<safety-slider right-arrow="<i class='fa fa-chevron-right'></i>">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
      </safety-slider>`
    );

    const safetySlider = await page.find('safety-slider');

    await safetySlider.callMethod('setActiveSlide', '2');

    const nextBtn = page.find(`.safety-slider-arrow.-next[disabled]`)

    expect(nextBtn).not.toBeNull();
  });

  it('should render default values of the left and right arrow content if properties are not set', async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<safety-slider>
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
        <img src="https://picsum.photos/100/100" alt="Randomly generated image">
      </safety-slider>`
    );

    const prevArrowBtn = await page.find(`.safety-slider-arrow.-prev`);
    const nextArrowBtn = await page.find(`.safety-slider-arrow.-next`);

    expect(prevArrowBtn.innerHTML).toEqual('←');
    expect(nextArrowBtn.innerHTML).toEqual('→');
  });
});
