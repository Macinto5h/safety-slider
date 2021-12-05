/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SafetySlider {
        "hasNoArrows": boolean;
        "hasNoDots": boolean;
        "isInfinite": boolean;
        "leftArrowInnerHTML": string;
        "rightArrowInnerHTML": string;
        "setActiveSlide": (newActiveSlide: number) => Promise<void>;
    }
    interface SafetySliderSlides {
        "activeSlide": number;
    }
}
declare global {
    interface HTMLSafetySliderElement extends Components.SafetySlider, HTMLStencilElement {
    }
    var HTMLSafetySliderElement: {
        prototype: HTMLSafetySliderElement;
        new (): HTMLSafetySliderElement;
    };
    interface HTMLSafetySliderSlidesElement extends Components.SafetySliderSlides, HTMLStencilElement {
    }
    var HTMLSafetySliderSlidesElement: {
        prototype: HTMLSafetySliderSlidesElement;
        new (): HTMLSafetySliderSlidesElement;
    };
    interface HTMLElementTagNameMap {
        "safety-slider": HTMLSafetySliderElement;
        "safety-slider-slides": HTMLSafetySliderSlidesElement;
    }
}
declare namespace LocalJSX {
    interface SafetySlider {
        "hasNoArrows"?: boolean;
        "hasNoDots"?: boolean;
        "isInfinite"?: boolean;
        "leftArrowInnerHTML"?: string;
        "rightArrowInnerHTML"?: string;
    }
    interface SafetySliderSlides {
        "activeSlide"?: number;
    }
    interface IntrinsicElements {
        "safety-slider": SafetySlider;
        "safety-slider-slides": SafetySliderSlides;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "safety-slider": LocalJSX.SafetySlider & JSXBase.HTMLAttributes<HTMLSafetySliderElement>;
            "safety-slider-slides": LocalJSX.SafetySliderSlides & JSXBase.HTMLAttributes<HTMLSafetySliderSlidesElement>;
        }
    }
}
