import { newSpecPage } from "@stencil/core/testing";
import { SafetySliderArrows } from "../components/safety-slider-arrows/safety-slider-arrows";

export class SpecUtils {

  static buildArrowSpecPage(properties = '') {
    return newSpecPage({
      components: [SafetySliderArrows],
      html: `<safety-slider-arrows ${properties}></safety-slider-arrows>`
    });
  }

  static getNextArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-next');
  }

  static getPrevArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-prev');
  }
}
