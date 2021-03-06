import { E2EPage } from '@stencil/core/testing';
import { SLIDE_ACTIVE_CLASS_QUERY } from '../components/safety-slider-window/safety-slider-window.resources';

export class E2EUtils {
  static async setWindowContent(page: E2EPage, content = '', properties = '') {
    await page.setContent(`<safety-slider-window style="display:block;" ${properties}>${content}</safety-slider-window>`);
  }

  static buildWindowContent(slideCount: number) {
    let content = '';

    for (let i = 0; i < slideCount; i++) content += `<img src="https://picsum.photos/100/">`;

    return content;
  }

  static getActiveSlideElement(page: E2EPage) {
    return page.find(SLIDE_ACTIVE_CLASS_QUERY);
  }

  static getWindowElement(page: E2EPage) {
    return page.find('safety-slider-window');
  }
}
