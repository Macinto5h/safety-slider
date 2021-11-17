/*global describe, it, expect*/
import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider></safety-slider>');

    const element = await page.find('safety-slider');
    expect(element).toHaveClass('hydrated');
  });
});
