import { SpecUtils } from '../../../utils/spec-utils';
import { SafetySliderWindow } from '../safety-slider-window';
import {
  SLIDE_CLASS_QUERY,
  SLIDE_CLONE_CLASS_QUERY,
  WINDOW_ID_PREFIX,
  SLIDE_ACTIVE_CLASS
} from '../safety-slider-window.resources';
import { v4 as uuidv4 } from 'uuid';

describe('safety-slider-window', () => {

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true, value: 500, writable: true
    });
  });

  it('should render slot content with slide classes and attributes', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const slides = page.body.querySelectorAll(SLIDE_CLASS_QUERY);

    slides.forEach(element => {
      if (element.classList.contains(SLIDE_ACTIVE_CLASS)) {
        expect(element.tabIndex).toEqual(0);
        expect(element.getAttribute('aria-hidden')).toBe('false');
      } else {
        expect(element.tabIndex).toEqual(-1);
        expect(element.getAttribute('aria-hidden')).toBe('true');
      }
    });
  });

  it('should reassign the slide width when a window resize occurs', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

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

  it('should add an id to the window using the uuid defined in the uuid property', async () => {
    const uuid = uuidv4();
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(), `uuid="${uuid}"`);

    expect(page.root.id).toEqual(WINDOW_ID_PREFIX + uuid);
  });
});
