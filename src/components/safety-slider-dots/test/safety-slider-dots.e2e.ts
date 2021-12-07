import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider-dots', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-dots></safety-slider-dots>');

    const element = await page.find('safety-slider-dots');
    expect(element).toHaveClass('hydrated');
  });
});
