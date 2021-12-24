import { newE2EPage } from '@stencil/core/testing';

describe('safety-slider-slides', () => {
  it('should change the assigned active class when a value is passed to the property', async () => {
    const page = await newE2EPage();
    await page.setContent('<safety-slider-slides><img src="https://picsum.photos/100/"><img src="https://picsum.photos/100/"></safety-slider-slides>');

    await page.$eval('safety-slider-slides', (elm: HTMLSafetySliderSlidesElement) => {
      elm.activeSlide = 1;
    });

    await page.waitForChanges();
    const children = await page.findAll('.safety-slider__slide');

    expect(children[1].classList.contains('-active')).toBeTruthy();
  })
});
