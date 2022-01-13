import { newSpecPage } from '@stencil/core/testing';
import { SpecUtils } from '../../../utils/spec-utils';
import { SafetySliderWindow } from '../safety-slider-window';
import { SLIDE_CLASS_QUERY, SLIDE_CLONE_CLASS_QUERY } from '../safety-slider-window.constants';

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

  it('should create clone slides when set to infinite and at least two slides in the window', async () => {
    const slideCount = SpecUtils.buildRandomSlotData(2,2);
    const page = await SpecUtils.buildWindowSpecPage(slideCount, 'is-infinite');

    await page.waitForChanges();

    const clones = page.root.querySelectorAll(SLIDE_CLONE_CLASS_QUERY);
    const allSlides = page.root.querySelectorAll(SLIDE_CLASS_QUERY);

    expect(clones.length).toEqual(2);
    expect(allSlides.length).toEqual(4);
  });

  it('should not generate clone slides when there is only one slide in the window and set to infinite', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1,1), 'is-infinite');

    const clones = page.root.querySelectorAll(SLIDE_CLONE_CLASS_QUERY);

    expect(clones.length).toEqual(0);
  });

  it('should not generate clone slides when infinite is not set', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(2));
    const clones = page.root.querySelectorAll(SLIDE_CLONE_CLASS_QUERY);
    expect(clones.length).toEqual(0);
  });
});
