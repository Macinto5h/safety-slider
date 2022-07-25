import { SpecUtils } from '../../../utils/spec-utils';
import { SafetySliderWindow } from '../safety-slider-window';
import {
  SLIDE_CLASS_QUERY,
  SLIDE_CLONE_CLASS_QUERY,
  WINDOW_ID_PREFIX,
  SLIDE_ACTIVE_CLASS,
  SLIDE_TRACK_CLASS_QUERY,
  TRACK_TRANSITION_DURATION_CSS_VAR,
  TRACK_OFFSET_CSS_VAR,
} from '../safety-slider-window.resources';
import { v4 as uuidv4 } from 'uuid';
import { setCssProperty } from '../../../utils/css-utils';
import { Component, SpecPage } from '@stencil/core/internal';
import { Chance } from 'chance';

describe('safety-slider-window', () => {
  const chance = new Chance();

  beforeEach(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', {
      configurable: true,
      value: 500,
      writable: true,
    });

    setCssProperty = jest.fn();
  });

  it('should render slot content with slide classes and attributes', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const slides = page.body.querySelectorAll(SLIDE_CLASS_QUERY) as NodeListOf<HTMLElement>;

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
    await setComponentOffsetWidth(component, page, windowWidth);

    component.windowResizeHandler();
    await page.waitForChanges();

    expect(component.rootWidth).toEqual(windowWidth);
  });

  it('should create clone slides when set to infinite and at least two slides in the window', async () => {
    const slideCount = SpecUtils.buildRandomSlotData(2, 2);
    const page = await SpecUtils.buildWindowSpecPage(slideCount, 'is-infinite');

    await page.waitForChanges();

    const clones = page.root.querySelectorAll(SLIDE_CLONE_CLASS_QUERY);
    const allSlides = page.root.querySelectorAll(SLIDE_CLASS_QUERY);

    expect(clones.length).toEqual(2);
    expect(allSlides.length).toEqual(4);
  });

  it('should not generate clone slides when there is only one slide in the window and set to infinite', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1, 1), 'is-infinite');

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

  it('should render the track element with aria-live set to polite', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

    const track = page.root.querySelector(SLIDE_TRACK_CLASS_QUERY);

    expect(track.getAttribute('aria-live')).toBe('polite');
  });


  it('should unset the transition duration when a mousedown event occurs', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const window: SafetySliderWindow = page.rootInstance;

    await setComponentOffsetWidth(window, page, 500);

    window.mouseDownHandler({} as MouseEvent);
    await page.waitForChanges();

    expect(setCssProperty).toHaveBeenNthCalledWith(1, expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '0ms');
  });

  it('should unset the transition duration when a touchstart event occurs', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const window: SafetySliderWindow = page.rootInstance;

    const touchEvent = { touches: [ { pageX: chance.natural() }] as any } as TouchEvent;

    window.touchStartHandler(touchEvent);
    await page.waitForChanges();

    expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '0ms');
  });

  it('should do nothing when a mousedown event occurs and the window is not draggable', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1), 'is-draggable="false"');
    const component: SafetySliderWindow = page.rootInstance;

    setComponentOffsetWidth(component, page, 500);

    component.mouseDownHandler({} as MouseEvent);
    await page.waitForChanges();

    expect(setCssProperty).not.toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '0ms');
  });

  it('should do nothing when a touchstart event occurs and the window is not swipeable', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1), 'is-swipeable="false"');
    const component: SafetySliderWindow = page.rootInstance;
    const touchEvent = { touches: [ { pageX: chance.natural() }] as any } as TouchEvent;

    component.touchStartHandler(touchEvent);
    await page.waitForChanges();

    expect(setCssProperty).not.toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '0ms');
  });

  it('should not record the current x offset of the mousemove event if a mousedown event did not occur', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const window: SafetySliderWindow = page.rootInstance;
    expect(window.mouseMoveHandler({} as MouseEvent)).toBeNull();
  });

  it('should not record the current position of the touchmove event if a touchstart event did not occur', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const component: SafetySliderWindow = page.rootInstance;

    expect(component.touchMoveHandler({} as TouchEvent)).toBeNull();
  });

  it('should record the current x offset of the mousemove event if a mousedown event did occur', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const window: SafetySliderWindow = page.rootInstance;

    const offsetDownX = 100;
    const mouseDownEvent = { offsetX: offsetDownX } as MouseEvent;

    window.mouseDownHandler(mouseDownEvent);
    await page.waitForChanges();

    const offsetMoveX = 50;
    const mouseMoveEvent = { offsetX: offsetMoveX } as MouseEvent;

    expect(window.mouseMoveHandler(mouseMoveEvent)).toEqual(offsetMoveX);
  });

  it('should record the current x offset of the touchmove event if a touchstart event did occur', async () => {
    const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));
    const component: SafetySliderWindow = page.rootInstance;

    const touchStartEvent = { touches: [ { pageX: chance.natural() }] as any } as TouchEvent;
    component.touchStartHandler(touchStartEvent);
    await page.waitForChanges();

    const moveOffset = chance.natural()
    const touchMoveEvent = { touches: [ { pageX: moveOffset }] as any } as TouchEvent;
    expect(component.touchMoveHandler(touchMoveEvent)).toEqual(moveOffset);
  });

  [{ event: 'mouseup' }, { event: 'mouseleave' }].forEach(scenario => {
    it(`should emit safetySliderSlideChange for previous slide when ${scenario.event} occurs and drag length is a quarter of the window width`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), 'active-slide="1"');
      const window: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(window.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(window, page, 500);

      window.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(window, { offsetX: 450 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(0);
    });

    it(`should emit safetySliderSlideChange event for the next slide when ${scenario.event} occurs and drag length is a quarter of the window width`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), 'active-slide="1"');
      const window: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(window.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(window, page, 500);

      window.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(window, { offsetX: 50 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(2);
    });

    it(`should set mouse drag to inactive when a ${scenario.event} event occurs`, async () => {
      const transitionDuration = 250;
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), `tracktransitionduration="${transitionDuration}"`);

      const window: SafetySliderWindow = page.rootInstance;
      await setComponentOffsetWidth(window, page, 500);

      window.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(window, { offsetX: 250 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, `${transitionDuration}ms`);
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
    });

    it(`should not make any changes for ${scenario.event} when a mousedown event did not occur`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

      const window: SafetySliderWindow = page.rootInstance;
      await setComponentOffsetWidth(window, page, 500);

      runDragEndEventHandler(window, {} as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledTimes(0);
    });

    it(`should reset the track offset back to the active slide on ${scenario.event} if there is no previous slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

      const component: SafetySliderWindow = page.rootInstance;
      await setComponentOffsetWidth(component, page, 500);

      component.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(component, { offsetX: 450 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
    });

    it(`should reset the track offset back to the active slide on ${scenario.event} if there is no next slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1, 1));

      const component: SafetySliderWindow = page.rootInstance;
      await setComponentOffsetWidth(component, page, 500);

      component.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(component, { offsetX: 50 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
    });

    it(`should emit the safetySliderSlideChange event when ${scenario.event} occurs, is infinite, and dragging the first slide to the last slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(5, 5), 'is-infinite');

      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(component, page, 500);

      component.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(component, { offsetX: 450 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(4);
    });

    it(`should emit the safetySliderSlideChange event when ${scenario.event} occurs, is infinite, and dragging the last slide to the first slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(5, 5), 'is-infinite active-slide="4"');

      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(component, page, 500);

      component.mouseDownHandler({ offsetX: 250 } as MouseEvent);
      await page.waitForChanges();

      runDragEndEventHandler(component, { offsetX: 50 } as MouseEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(0);
    });
  });

  [{ event: 'touchend' }, { event: 'touchcancel' }].forEach(scenario => {
    it(`should emit safetySliderSlideChange for previous slide when ${scenario.event} occurs and drag length is a quarter of the window width`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), 'active-slide="1"');
      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.75 } ] as any } as TouchEvent;
      component.touchEndHandler(lastTouchEvent);
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(0);
    });

    it(`should emit safetySliderSlideChange event for the next slide when ${scenario.event} occurs and drag length is a quarter of the window width`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), 'active-slide="1"');
      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.25 } ] as any } as TouchEvent;
      component.touchEndHandler(lastTouchEvent);
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(2);
    });

    it(`should set touch swipe to inactive when a ${scenario.event} event occurs`, async () => {
      const transitionDuration = 250;
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(3), `tracktransitionduration="${transitionDuration}"`);

      const component: SafetySliderWindow = page.rootInstance;
      const offsetWidth = chance.natural({min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.5 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, `${transitionDuration}ms`);
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
    });

    it(`should not make any changes for ${scenario.event} when a touchstart event did not occur`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

      const component: SafetySliderWindow = page.rootInstance;
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.5 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledTimes(0);
    });

    it(`should reset the track offset back to the active slide on ${scenario.event} if there is no previous slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1));

      const component: SafetySliderWindow = page.rootInstance;
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(component, page, 500);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.75 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
      expect(eventSpy).not.toHaveBeenCalled();
    });

    it(`should reset the track offset back to the active slide on ${scenario.event} if there is no next slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(1, 1));

      const component: SafetySliderWindow = page.rootInstance;
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.25 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_OFFSET_CSS_VAR, '0px');
      expect(setCssProperty).toHaveBeenCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
      expect(eventSpy).not.toHaveBeenCalled();
    });

    it(`should emit the safetySliderSlideChange event when ${scenario.event} occurs, is infinite, and dragging the first slide to the last slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(5, 5), 'is-infinite');

      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.75 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(4);
      expect(setCssProperty).toHaveBeenLastCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
    });

    it(`should emit the safetySliderSlideChange event when ${scenario.event} occurs, is infinite, and dragging the last slide to the first slide`, async () => {
      const page = await SpecUtils.buildWindowSpecPage(SpecUtils.buildRandomSlotData(5, 5), 'is-infinite active-slide="4"');

      const component: SafetySliderWindow = page.rootInstance;
      const eventSpy = jest.spyOn(component.safetySliderSlideChange, 'emit');
      const offsetWidth = chance.natural({ min: 200, max: 1000 });
      await setComponentOffsetWidth(component, page, offsetWidth);

      const touchStartEvent = { touches: [ { pageX: offsetWidth * 0.5 }] as any } as TouchEvent;
      component.touchStartHandler(touchStartEvent);
      await page.waitForChanges();

      const lastTouchEvent = { touches: [ { pageX: offsetWidth * 0.25 } ] as any } as TouchEvent;
      runSwipeEndEventHandler(component, lastTouchEvent, scenario.event);
      await page.waitForChanges();

      expect(eventSpy).toHaveBeenCalledWith(0);
      expect(setCssProperty).toHaveBeenLastCalledWith(expect.any(HTMLElement), TRACK_TRANSITION_DURATION_CSS_VAR, '250ms');
    });
  });
});

function runDragEndEventHandler(component: SafetySliderWindow, event: MouseEvent, eventType: string) {
  if (eventType === 'mouseup') {
    component.mouseUpHandler(event);
  } else {
    component.mouseLeaveHandler(event);
  }
}

function runSwipeEndEventHandler(component: SafetySliderWindow, event: TouchEvent, eventType: string) {
  if (eventType === 'touchend') {
    component.touchEndHandler(event);
  } else {
    component.touchCancelHandler(event);
  }
}

async function setComponentOffsetWidth(component: SafetySliderWindow, page: SpecPage, width: number) {
  component.root.offsetWidth = width;
  component.windowResizeHandler();
  await page.waitForChanges();
}
