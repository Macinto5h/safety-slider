import { SLIDER_ID_PREFIX } from '../safety-slider.resources';
import { v4 as uuidv4 } from 'uuid';
import { SpecUtils } from '../../../utils/spec-utils';

describe('safety-slider', () => {
  it('does not render arrow buttons when the no-arrows property is present', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(), 'no-arrows');

    expect(SpecUtils.getArrowsComponent(page)).toBeNull();
  });

  it('does not render dot buttons when the no-dots property is present', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(), 'no-dots');

    expect(SpecUtils.getDotsComponent(page)).toBeNull();
  });

  it('should render the safety slider with a unique id', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData());

    const safetySliderId = page.root.id;

    expect(safetySliderId.startsWith(SLIDER_ID_PREFIX)).toBeTruthy();
    expect(safetySliderId.length).toEqual(SLIDER_ID_PREFIX.length + uuidv4().length);
  });

  it('should set the uuid property of arrows, dots, and window to the same value', async () => {
    const minimumSlideCount = 1;
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(minimumSlideCount));

    const sliderWindow = SpecUtils.getWindowComponent(page);
    const sliderDots = SpecUtils.getDotsComponent(page);
    const sliderArrows = SpecUtils.getArrowsComponent(page);

    expect(sliderWindow.getAttribute('uuid').length).toEqual(uuidv4().length);
    expect(sliderWindow.getAttribute('uuid')).toEqual(sliderDots.getAttribute('uuid'));
    expect(sliderWindow.getAttribute('uuid')).toEqual(sliderArrows.getAttribute('uuid'));
  });

  it('should change the active slide when setActiveSlide is called', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(2));

    const safetySlider = page.rootInstance;
    safetySlider.setActiveSlide(1);

    await page.waitForChanges();

    expect(safetySlider.activeSlide).toEqual(1);
  });

  it('should render with no dots and arrows if only one item is provided', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(1, 1));

    const arrows = SpecUtils.getArrowsComponent(page);
    const dots = SpecUtils.getDotsComponent(page);

    expect(arrows).toBeNull();
    expect(dots).toBeNull();
  });

  it('should render with dots and arrows if there are more than one items in the slot', async () => {
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(2));

    const arrows = SpecUtils.getArrowsComponent(page);
    const dots = SpecUtils.getDotsComponent(page);

    expect(arrows).not.toBeNull();
    expect(dots).not.toBeNull();
  });

  it('should render with custom track transition duration if a value is given', async () => {
    const trackTransitionDuration = 100;
    const page = await SpecUtils.buildSliderSpecPage(SpecUtils.buildRandomSlotData(), `track-transition-duration="${trackTransitionDuration}"`);

    const window = SpecUtils.getWindowComponent(page);

    expect(window.getAttribute('tracktransitionduration')).toEqual(`${trackTransitionDuration}`);
  });
});
