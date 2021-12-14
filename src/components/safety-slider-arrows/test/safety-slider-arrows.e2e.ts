import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider-arrows', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-arrows></safety-slider-arrows>');

    const element = await page.find('safety-slider-arrows');
    expect(element).toHaveClass('hydrated');
  });
});
