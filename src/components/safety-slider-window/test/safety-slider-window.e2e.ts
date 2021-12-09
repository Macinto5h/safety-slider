import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider-window', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-window></safety-slider-window>');

    const element = await page.find('safety-slider-window');
    expect(element).toHaveClass('hydrated');
  });
});
