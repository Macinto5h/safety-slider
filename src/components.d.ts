/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface SafetySlider {
        "dotAriaLabel": string;
        "hasNoArrows": boolean;
        "hasNoDots": boolean;
        "isInfinite": boolean;
        "nextArrowAriaLabel": string;
        "nextArrowInnerHTML": string;
        "noDrag": boolean;
        "noSwipe": boolean;
        "prevArrowAriaLabel": string;
        "prevArrowInnerHTML": string;
        "setActiveSlide": (newActiveSlide: number) => Promise<void>;
        "trackTransitionDuration": number;
    }
    interface SafetySliderArrows {
        "activeSlide": number;
        "isInfinite": boolean;
        "nextAriaLabel": string;
        "nextArrowInnerHTML": string;
        "prevAriaLabel": string;
        "prevArrowInnerHTML": string;
        "slideCount": number;
        "uuid": string;
    }
    interface SafetySliderDots {
        "activeDot": number;
        "dotAriaLabel": string;
        "dotCount": number;
        "uuid": string;
    }
    interface SafetySliderWindow {
        "activeSlide": number;
        "isDraggable": boolean;
        "isInfinite": boolean;
        "isSwipeable": boolean;
        "trackTransitionDuration": number;
        "uuid": string;
    }
}
export interface SafetySliderArrowsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSafetySliderArrowsElement;
}
export interface SafetySliderDotsCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSafetySliderDotsElement;
}
export interface SafetySliderWindowCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLSafetySliderWindowElement;
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
        "dotAriaLabel"?: string;
        "hasNoArrows"?: boolean;
        "hasNoDots"?: boolean;
        "isInfinite"?: boolean;
        "nextArrowAriaLabel"?: string;
        "nextArrowInnerHTML"?: string;
        "noDrag"?: boolean;
        "noSwipe"?: boolean;
        "prevArrowAriaLabel"?: string;
        "prevArrowInnerHTML"?: string;
        "trackTransitionDuration"?: number;
    }
    interface SafetySliderArrows {
        "activeSlide"?: number;
        "isInfinite"?: boolean;
        "nextAriaLabel"?: string;
        "nextArrowInnerHTML"?: string;
        "onSafetySliderSlideChange"?: (event: SafetySliderArrowsCustomEvent<number>) => void;
        "prevAriaLabel"?: string;
        "prevArrowInnerHTML"?: string;
        "slideCount"?: number;
        "uuid"?: string;
    }
    interface SafetySliderDots {
        "activeDot"?: number;
        "dotAriaLabel"?: string;
        "dotCount"?: number;
        "onSafetySliderSlideChange"?: (event: SafetySliderDotsCustomEvent<number>) => void;
        "uuid"?: string;
    }
    interface SafetySliderWindow {
        "activeSlide"?: number;
        "isDraggable"?: boolean;
        "isInfinite"?: boolean;
        "isSwipeable"?: boolean;
        "onSafetySliderApplyTransitionDuration"?: (event: SafetySliderWindowCustomEvent<any>) => void;
        "onSafetySliderInfiniteLoopAdjustment"?: (event: SafetySliderWindowCustomEvent<any>) => void;
        "onSafetySliderSlideChange"?: (event: SafetySliderWindowCustomEvent<number>) => void;
        "trackTransitionDuration"?: number;
        "uuid"?: string;
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
