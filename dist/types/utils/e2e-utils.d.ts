import { E2EPage } from "@stencil/core/testing";
export declare class E2EUtils {
  static setWindowContent(page: E2EPage, content?: string, properties?: string): Promise<void>;
  static buildWindowContent(slideCount: number): string;
  static getActiveSlideElement(page: E2EPage): Promise<import("@stencil/core/testing").E2EElement>;
  static getWindowElement(page: E2EPage): Promise<import("@stencil/core/testing").E2EElement>;
}
