/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface SafetySlider {
        "noArrows": boolean;
        "noDots": boolean;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLSafetySliderElement extends Components.SafetySlider, HTMLStencilElement {
    }
    var HTMLSafetySliderElement: {
        prototype: HTMLSafetySliderElement;
        new (): HTMLSafetySliderElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "safety-slider": HTMLSafetySliderElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface SafetySlider {
        "noArrows"?: boolean;
        "noDots"?: boolean;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "safety-slider": SafetySlider;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "safety-slider": LocalJSX.SafetySlider & JSXBase.HTMLAttributes<HTMLSafetySliderElement>;
        }
    }
}
