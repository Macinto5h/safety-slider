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

    const windowElement = await page.find('.safety-slider__window');
    const activeSlideElement = await page.find('.safety-slider__slide.-active');

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slideWindowWidth = await windowElement.getProperty('offsetWidth');

    expect(slideWindowWidth).toBe(activeSlideWidth);
  });
  it('should translate the slides container to the position of the active slide', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider><img src="https://picsum.photos/100/"><img src="https://picsum.photos/100/"></safety-slider>');

    const slideContainerElement = await page.find('.safety-slider__slides');
    const nextBtn = await page.find('.safety-slider__arrow.-next');

    nextBtn.click();
    await page.waitForChanges();
    await page.waitForTimeout(250);


    const activeSlideElement = await page.find('.safety-slider__slide.-active');

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slideContainerStyle = await slideContainerElement.getComputedStyle();

    expect(slideContainerStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });
});
