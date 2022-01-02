import { newE2EPage } from '@stencil/core/testing';
import { E2EUtils } from '../../../utils/e2e-utils';

describe('safety-slider-dots', () => {
  it('should emit the safetySliderNavigationClick event when a dot is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-dots dot-count="3"></safety-slider-dots>');

    const eventSpy = await E2EUtils.getNavigationClickSpy(page);
    const dotBtn = await page.find('button');

    dotBtn.click();
    await E2EUtils.waitForNavigationClick(page);

    expect(eventSpy).toHaveReceivedEventDetail(0);
  });
});
