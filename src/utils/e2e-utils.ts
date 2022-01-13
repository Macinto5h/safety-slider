import { E2EPage } from "@stencil/core/testing";

export class E2EUtils {

  static async setArrowContent(page: E2EPage, properties = '') {
    await page.setContent(`<safety-slider-arrows ${properties}></safety-slider-arrows>`);
  }

  static async setWindowContent(page: E2EPage, content = '', properties = '') {
    await page.setContent(`<safety-slider-window style="display:block;" ${properties}>${content}</safety-slider-window>`);
  }

  static getActiveSlideElement(page: E2EPage) {
    return page.find('.safety-slider__slide.-active');
  }

  static getNavigationClickSpy(page: E2EPage) {
    return page.spyOnEvent('safetySliderNavigationClick');
  }

  static getNextArrowElement(page: E2EPage) {
    return page.find('.safety-slider-arrow.-next');
  }

  static getPrevArrowElement(page: E2EPage) {
    return page.find('.safety-slider-arrow.-prev');
  }

  static getSlidesElement(page: E2EPage) {
    return page.find('.safety-slider-slides');
  }

  static getWindowElement(page: E2EPage) {
    return page.find('safety-slider-window');
  }

  static waitForNavigationClick(page: E2EPage) {
    return page.waitForEvent('safetySliderNavigationClick');
  }
}
