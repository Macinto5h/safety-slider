import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';

describe('safety-slider-window', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await E2EUtils.setWindowContent(page);

    const element = await E2EUtils.getWindowElement(page);
    expect(element).toHaveClass('hydrated');
  });

  it('should assign the slide the same width as the window element', async () => {
    await E2EUtils.setWindowContent(page, '<img src="https://picsum.photos/100/">');

    const windowElement = await E2EUtils.getWindowElement(page);
    const slideElement = await E2EUtils.getActiveSlideElement(page);

    const slideWidth = await slideElement.getProperty('offsetWidth');
    const slideWindowWidth = await windowElement.getProperty('offsetWidth');

    expect(slideWindowWidth).toBe(slideWidth);
  });

  it('should translate safety-slider-slides to the position of the active slide', async () => {
    await E2EUtils.setWindowContent(page, '<img src="https://picsum.photos/100"><img src="https://picsum.photos/100">');

    const windowElement = await E2EUtils.getWindowElement(page);
    const slidesElement = await E2EUtils.getSlidesElement(page);

    windowElement.setProperty('activeSlide', 1);
    await page.waitForChanges();
    await page.waitForTimeout(250);

    const activeSlideElement = await E2EUtils.getActiveSlideElement(page);

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slidesElementStyle = await slidesElement.getComputedStyle();

    expect(slidesElementStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });
});
