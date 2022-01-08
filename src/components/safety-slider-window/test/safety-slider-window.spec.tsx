import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderWindow } from '../safety-slider-window';

describe('safety-slider-window', () => {

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true, value: 500, writable: true
    });
  });

  it('should render slot content with slide classes', async () => {
    const page = await newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window><img src="https://picsum.photos/100/"></safety-slider-window>`,
    });

    expect(page.body.querySelector('.safety-slider__slide.-active')).not.toBeNull();
  });

  it('should reassign the slide width when a window resize occurs', async () => {
    const page = await newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window><img src="https://picsum.photos/100/"></safety-slider-window>`,
    });

    const component: SafetySliderWindow = page.rootInstance;
    const windowWidth = 375;
    page.root.offsetWidth = windowWidth;

    component.windowResizeHandler();
    await page.waitForChanges();

    expect(component.rootWidth).toEqual(windowWidth);
  });
});
