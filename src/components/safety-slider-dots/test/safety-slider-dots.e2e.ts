import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider-dots', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-dots></safety-slider-dots>');

    const element = await page.find('safety-slider-dots');
    expect(element).toHaveClass('hydrated');
  });

  it('should emit the safetySliderDotClick event when a dot is clicked', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-dots dot-count="3"></safety-slider-dots>');

    const eventSpy = await page.spyOnEvent('safetySliderDotClick');
    const dotBtn = await page.find('button');

    dotBtn.click();
    await page.waitForEvent('safetySliderDotClick');

    expect(eventSpy).toHaveReceivedEventDetail(0);
  });
});
