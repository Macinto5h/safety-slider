import { newSpecPage } from "@stencil/core/testing";
import { SafetySliderArrows } from "../components/safety-slider-arrows/safety-slider-arrows";
import { ARROWS_COMPONENT_QUERY } from "../components/safety-slider-arrows/safety-slider-arrows.resources";
import { SafetySliderDots } from "../components/safety-slider-dots/safety-slider-dots";
import { DOTS_COMPONENT_QUERY } from "../components/safety-slider-dots/safety-slider-dots.resources";
import { SafetySliderWindow } from "../components/safety-slider-window/safety-slider-window";
import { WINDOW_COMPONENT_QUERY } from "../components/safety-slider-window/safety-slider-window.resources";
import { SafetySlider } from "../components/safety-slider/safety-slider";

export class SpecUtils {

  static buildArrowSpecPage(properties = '') {
    return newSpecPage({
      components: [SafetySliderArrows],
      html: `<safety-slider-arrows ${properties}></safety-slider-arrows>`
    });
  }

  static buildDotSpecPage(properties = '') {
    return newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots ${properties}></safety-slider-dots>`
    });
  }

  static buildSliderSpecPage(content = '', properties = '') {
      return newSpecPage({
          components: [SafetySlider],
          html: `<safety-slider ${properties}>${content}</safety-slider>`
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

  static getArrowsComponent(page) {
    return page.root.querySelector(ARROWS_COMPONENT_QUERY);
  }

  static getDotsComponent(page) {
    return page.root.querySelector(DOTS_COMPONENT_QUERY)
  }

  static getNextArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-next');
  }

  static getPrevArrowElement(page) {
    return page.root.querySelector('.safety-slider-arrow.-prev');
  }

  static getWindowComponent(page) {
    return page.root.querySelector(WINDOW_COMPONENT_QUERY);
  }
}
