export declare class SpecUtils {
  static buildArrowSpecPage(properties?: string): Promise<import("@stencil/core/testing").SpecPage>;
  static buildDotSpecPage(properties?: string): Promise<import("@stencil/core/testing").SpecPage>;
  static buildSliderSpecPage(content?: string, properties?: string): Promise<import("@stencil/core/testing").SpecPage>;
  static buildRandomSlotData(min?: number, max?: number): string;
  static buildWindowSpecPage(content?: string, properties?: string): Promise<import("@stencil/core/testing").SpecPage>;
  static getArrowsComponent(page: any): any;
  static getDotsComponent(page: any): any;
  static getNextArrowElement(page: any): any;
  static getPrevArrowElement(page: any): any;
  static getWindowComponent(page: any): any;
}
