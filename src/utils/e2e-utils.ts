import { E2EPage } from "@stencil/core/testing";

export class E2EUtils {

  static async setWindowContent(page: E2EPage, content = '') {
    await page.setContent(`<safety-slider-window>${content}</safety-slider-window>`);
  }

  static getActiveSlideElement(page: E2EPage) {
    return page.find('.safety-slider__slide.-active');
  }

  static getNavigationClickSpy(page: E2EPage) {
    return page.spyOnEvent('safetySliderNavigationClick');
  }

  static getSlidesElement(page: E2EPage) {
    return page.find('safety-slider-slides');
  }

  static getWindowElement(page: E2EPage) {
    return page.find('safety-slider-window');
  }

  static waitForNavigationClick(page: E2EPage) {
    return page.waitForEvent('safetySliderNavigationClick');
  }
}
