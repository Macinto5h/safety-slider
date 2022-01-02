import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';

describe('safety-slider-window', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should assign the slide the same width as the window element', async () => {
    await E2EUtils.setWindowContent(page, '<img src="https://picsum.photos/100/">');

    await page.waitForChanges();

    const windowElement = await E2EUtils.getWindowElement(page);
    const slideElement = await E2EUtils.getActiveSlideElement(page);

    const slideWidth = await slideElement.getProperty('offsetWidth');
    const slideWindowWidth = await windowElement.getProperty('offsetWidth');

    expect(slideWidth).toBe(slideWindowWidth);
  });

  it('should translate safety-slider-slides to the position of the active slide', async () => {
    await E2EUtils.setWindowContent(page, '<img src="https://picsum.photos/100"><img src="https://picsum.photos/100">');

    const windowElement = await E2EUtils.getWindowElement(page);
    const slidesElement = await windowElement.find('.safety-slider-slides');

    windowElement.setProperty('activeSlide', 1);
    await page.waitForChanges();
    await page.waitForTimeout(250);

    const activeSlideElement = await E2EUtils.getActiveSlideElement(page);

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slidesElementStyle = await slidesElement.getComputedStyle();

    expect(slidesElementStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });

  it('should change the assigned active class when a value is passed to the property', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-window><img src="https://picsum.photos/100/"><img src="https://picsum.photos/100/"></safety-slider-window>');

    await page.$eval('safety-slider-window', (elm: HTMLSafetySliderWindowElement) => {
      elm.activeSlide = 1;
    });

    await page.waitForChanges();
    const children = await page.findAll('.safety-slider__slide');

    expect(children[0].classList.contains('-active')).toBeFalsy();
    expect(children[1].classList.contains('-active')).toBeTruthy();
  });
});
