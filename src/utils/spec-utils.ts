import { newSpecPage } from "@stencil/core/testing";
import { SafetySliderArrows } from "../components/safety-slider-arrows/safety-slider-arrows";
import { SafetySliderWindow } from "../components/safety-slider-window/safety-slider-window";

export class SpecUtils {

  static buildArrowSpecPage(properties = '') {
    return newSpecPage({
      components: [SafetySliderArrows],
      html: `<safety-slider-arrows ${properties}></safety-slider-arrows>`
    });
  }

  static buildRandomSlotData(min = 0, max = 10) {
    let slotString = '';
    for (let i = 0; i < Math.round(Math.random() * (max - min)) + min; i++)
      slotString += '<img src="https://www.example.com">';
    return slotString;
  }

  static buildWindowSpecPage(content = '', properties = '') {
    return newSpecPage({
      components: [SafetySliderWindow],
      html: `<safety-slider-window ${properties}>${content}</safety-slider-window>`
    });
  }

  static getNextArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-next');
  }

  static getPrevArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-prev');
  }
}
