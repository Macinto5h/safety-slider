import { E2EPage } from "@stencil/core/testing";

export class E2EUtils {

  static async setWindowContent(page: E2EPage, content = '', properties = '') {
    await page.setContent(`<safety-slider-window style="display:block;" ${properties}>${content}</safety-slider-window>`);
  }

  static getActiveSlideElement(page: E2EPage) {
    return page.find('.safety-slider__slide.-active');
  }

  static getWindowElement(page: E2EPage) {
    return page.find('safety-slider-window');
  }
}
