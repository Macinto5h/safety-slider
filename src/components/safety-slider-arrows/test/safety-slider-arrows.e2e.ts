import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';

describe('safety-slider-arrows', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage();
  });

  it('renders', async () => {
    await page.setContent('<safety-slider-arrows></safety-slider-arrows>');

    const element = await page.find('safety-slider-arrows');
    expect(element).toHaveClass('hydrated');
  });

  it('should change the active slide to the preceding slide when the previous arrow is clicked', async () => {
    await page.setContent('<safety-slider-arrows active-slide="1"><img src="https://picsum.photos/100/"><img src="https://picsum.photos/100/"></safety-slider-arrows>');

    const prevArrow = await page.find('.safety-slider-arrow.-prev');
    const eventSpy = await E2EUtils.getNavigationClickSpy(page);

    prevArrow.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(0);
  });
});
