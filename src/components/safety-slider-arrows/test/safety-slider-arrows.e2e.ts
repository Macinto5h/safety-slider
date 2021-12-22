import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';

describe('safety-slider-arrows', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await E2EUtils.setArrowContent(page);

    const element = await page.find('safety-slider-arrows');
    expect(element).toHaveClass('hydrated');
  });

  it('should change the active slide to the preceding slide when the previous arrow is clicked', async () => {
    await E2EUtils.setArrowContent(page, 'active-slide="1"');

    const prevArrow = await E2EUtils.getPrevArrowElement(page);
    const eventSpy = await E2EUtils.getNavigationClickSpy(page);

    prevArrow.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(0);
  });

  it('should change the active slide to the next slide when the next arrow button is clicked', async () => {
    await E2EUtils.setArrowContent(page);

    const nextArrow = await E2EUtils.getNextArrowElement(page);
    const eventSpy = await E2EUtils.getNavigationClickSpy(page);

    nextArrow.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(1);
  });

  it('should change the active slide to the first slide when active slide is last, infinite is enabled, and next button is clicked', async () => {
    await E2EUtils.setArrowContent(page, 'slide-count="3" active-slide="2" is-infinite');

    const nextArrow = await E2EUtils.getNextArrowElement(page);
    const eventSpy = await E2EUtils.getNavigationClickSpy(page);

    nextArrow.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(0);
  });

  it('should change the active slide to the last slide when active slide is first, infinite is enabled, and previous button is clicked', async () => {
    await E2EUtils.setArrowContent(page, 'slide-count="3" active-slide="0" is-infinite');

    const prevArrow = await E2EUtils.getPrevArrowElement(page);
    const eventSpy = await E2EUtils.getNavigationClickSpy(page);

    prevArrow.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(2);
  });
});
