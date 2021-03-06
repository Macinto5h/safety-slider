import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';
import { SLIDE_TRACK_CLASS_QUERY, SLIDE_CLASS_QUERY, SLIDE_ACTIVE_CLASS } from '../safety-slider-window.resources';

describe('safety-slider-window', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('should assign the slide the same width as the window element', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(1));

    await page.waitForChanges();

    const windowElement = await E2EUtils.getWindowElement(page);
    const slideElement = await E2EUtils.getActiveSlideElement(page);

    const slideWidth = await slideElement.getProperty('offsetWidth');
    const slideWindowWidth = await windowElement.getProperty('offsetWidth');

    expect(slideWidth).toBe(slideWindowWidth);
  });

  it('should translate safety-slider-track to the position of the active slide', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(2));

    const windowElement = await E2EUtils.getWindowElement(page);
    const slidesElement = await windowElement.find(SLIDE_TRACK_CLASS_QUERY);

    windowElement.setProperty('activeSlide', 1);
    await page.waitForChanges();
    await page.waitForTimeout(250);

    const activeSlideElement = await E2EUtils.getActiveSlideElement(page);

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slidesElementStyle = await slidesElement.getComputedStyle();

    expect(slidesElementStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });

  it('should translate safety-slider-track to the position of the active slide when considering clone elements', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(2), 'is-infinite');

    const windowElement = await E2EUtils.getWindowElement(page);
    const slidesElement = await windowElement.find(SLIDE_TRACK_CLASS_QUERY);

    const activeSlideElement = await E2EUtils.getActiveSlideElement(page);

    const activeSlideWidth = await activeSlideElement.getProperty('offsetWidth');
    const slidesElementStyle = await slidesElement.getComputedStyle();

    expect(slidesElementStyle.transform).toContain(`${activeSlideWidth * -1}`);
  });

  it('should change the assigned active class and attributes when a value is passed to the property', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(2));

    await page.$eval('safety-slider-window', (elm: HTMLSafetySliderWindowElement) => {
      elm.activeSlide = 1;
    });

    await page.waitForChanges();

    const children = await page.findAll(SLIDE_CLASS_QUERY);
    const prevActiveSlide = children[0];
    const currentActiveSlide = children[1];

    expect(prevActiveSlide.classList.contains(SLIDE_ACTIVE_CLASS)).toBeFalsy();
    expect(prevActiveSlide.tabIndex).toEqual(-1);
    expect(prevActiveSlide.getAttribute('aria-hidden')).toBe('true');

    expect(currentActiveSlide.classList.contains(SLIDE_ACTIVE_CLASS)).toBeTruthy();
    expect(currentActiveSlide.tabIndex).toEqual(0);
    expect(currentActiveSlide.getAttribute('aria-hidden')).toBe('false');
  });

  it('should emit the infinite slider adjustment events when moving from the last slide to the first slide', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(3), 'is-infinite active-slide="2"');
    const window = await page.find('safety-slider-window');

    const cloneShiftEventSpy = await window.spyOnEvent('safetySliderInfiniteLoopAdjustment');
    const applyDurationEventSpy = await window.spyOnEvent('safetySliderApplyTransitionDuration');

    window.setProperty('activeSlide', 0);

    await page.waitForChanges();
    await page.waitForTimeout(500);

    expect(cloneShiftEventSpy).toHaveReceivedEventTimes(1);
    expect(applyDurationEventSpy).toHaveReceivedEventTimes(1);
  });

  it('should emit the infinite slider adjustment events when moving from the first slide to the last slide', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(3), 'is-infinite');
    const window = await page.find('safety-slider-window');

    const cloneShiftEventSpy = await window.spyOnEvent('safetySliderInfiniteLoopAdjustment');
    const applyDurationEventSpy = await window.spyOnEvent('safetySliderApplyTransitionDuration');

    window.setProperty('activeSlide', 2);

    await page.waitForChanges();
    await page.waitForTimeout(500);

    expect(cloneShiftEventSpy).toHaveReceivedEventTimes(1);
    expect(applyDurationEventSpy).toHaveReceivedEventTimes(1);
  });

  it('should set the track transition duration when the window property changes value', async () => {
    await E2EUtils.setWindowContent(page, E2EUtils.buildWindowContent(3));
    const window = await page.find('safety-slider-window');
    const transitionDurationInMilliseconds = 100;
    const transitionDurationInSeconds = transitionDurationInMilliseconds / 1000;

    window.setProperty('trackTransitionDuration', transitionDurationInMilliseconds);
    await page.waitForChanges();

    const track = await page.find('.safety-slider-track');
    const trackStyle = await track.getComputedStyle();

    expect(trackStyle.transitionDuration).toBe(transitionDurationInSeconds + 's');
  });
});
