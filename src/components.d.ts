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
    interface SafetySliderArrows {
        "activeSlide": number;
        "isInfinite": boolean;
        "nextAriaLabel": string;
        "nextArrowInnerHTML": string;
        "prevAriaLabel": string;
        "prevArrowInnerHTML": string;
        "slideCount": number;
    }
    interface SafetySliderDots {
        "activeDot": number;
        "dotCount": number;
    }
    interface SafetySliderWindow {
        "activeSlide": number;
        "isInfinite": boolean;
    }
}
declare global {
    interface HTMLSafetySliderElement extends Components.SafetySlider, HTMLStencilElement {
    }
    var HTMLSafetySliderElement: {
        prototype: HTMLSafetySliderElement;
        new (): HTMLSafetySliderElement;
    };
    interface HTMLSafetySliderArrowsElement extends Components.SafetySliderArrows, HTMLStencilElement {
    }
    var HTMLSafetySliderArrowsElement: {
        prototype: HTMLSafetySliderArrowsElement;
        new (): HTMLSafetySliderArrowsElement;
    };
    interface HTMLSafetySliderDotsElement extends Components.SafetySliderDots, HTMLStencilElement {
    }
    var HTMLSafetySliderDotsElement: {
        prototype: HTMLSafetySliderDotsElement;
        new (): HTMLSafetySliderDotsElement;
    };
    interface HTMLSafetySliderWindowElement extends Components.SafetySliderWindow, HTMLStencilElement {
    }
    var HTMLSafetySliderWindowElement: {
        prototype: HTMLSafetySliderWindowElement;
        new (): HTMLSafetySliderWindowElement;
    };
    interface HTMLElementTagNameMap {
        "safety-slider": HTMLSafetySliderElement;
        "safety-slider-arrows": HTMLSafetySliderArrowsElement;
        "safety-slider-dots": HTMLSafetySliderDotsElement;
        "safety-slider-window": HTMLSafetySliderWindowElement;
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
    interface SafetySliderArrows {
        "activeSlide"?: number;
        "isInfinite"?: boolean;
        "nextAriaLabel"?: string;
        "nextArrowInnerHTML"?: string;
        "onSafetySliderNavigationClick"?: (event: CustomEvent<number>) => void;
        "prevAriaLabel"?: string;
        "prevArrowInnerHTML"?: string;
        "slideCount"?: number;
    }
    interface SafetySliderDots {
        "activeDot"?: number;
        "dotCount"?: number;
        "onSafetySliderNavigationClick"?: (event: CustomEvent<number>) => void;
    }
    interface SafetySliderWindow {
        "activeSlide"?: number;
        "isInfinite"?: boolean;
    }
    interface IntrinsicElements {
        "safety-slider": SafetySlider;
        "safety-slider-arrows": SafetySliderArrows;
        "safety-slider-dots": SafetySliderDots;
        "safety-slider-window": SafetySliderWindow;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "safety-slider": LocalJSX.SafetySlider & JSXBase.HTMLAttributes<HTMLSafetySliderElement>;
            "safety-slider-arrows": LocalJSX.SafetySliderArrows & JSXBase.HTMLAttributes<HTMLSafetySliderArrowsElement>;
            "safety-slider-dots": LocalJSX.SafetySliderDots & JSXBase.HTMLAttributes<HTMLSafetySliderDotsElement>;
            "safety-slider-window": LocalJSX.SafetySliderWindow & JSXBase.HTMLAttributes<HTMLSafetySliderWindowElement>;
        }
    }
}
