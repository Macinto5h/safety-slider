import { p as promiseResolve, b as bootstrapLazy } from './index-5396e70a.js';

/*
 Stencil Client Patch Browser v2.7.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["safety-slider_4",[[4,"safety-slider",{"isInfinite":[4,"infinite"],"prevArrowInnerHTML":[1,"prev-arrow"],"hasNoArrows":[4,"no-arrows"],"hasNoDots":[4,"no-dots"],"nextArrowInnerHTML":[1,"next-arrow"],"prevArrowAriaLabel":[1,"prev-arrow-aria-label"],"nextArrowAriaLabel":[1,"next-arrow-aria-label"],"dotAriaLabel":[1,"dot-aria-label"],"activeSlide":[32],"setActiveSlide":[64]},[[0,"safetySliderNavigationClick","onSafetySliderDotClick"]]],[0,"safety-slider-arrows",{"slideCount":[2,"slide-count"],"activeSlide":[2,"active-slide"],"prevArrowInnerHTML":[1,"prev-arrow"],"nextArrowInnerHTML":[1,"next-arrow"],"isInfinite":[4,"is-infinite"],"prevAriaLabel":[1,"prev-aria-label"],"nextAriaLabel":[1,"next-aria-label"],"uuid":[1]}],[0,"safety-slider-dots",{"activeDot":[2,"active-dot"],"dotCount":[2,"dot-count"],"dotAriaLabel":[1,"dot-aria-label"],"uuid":[1]}],[4,"safety-slider-window",{"activeSlide":[2,"active-slide"],"isInfinite":[516,"is-infinite"],"uuid":[1],"rootWidth":[32]},[[9,"resize","windowResizeHandler"],[0,"safetySliderInfiniteLoopAdjustment","infiniteLoopAdjustmentHandler"],[0,"safetySliderApplyTransitionDuration","applyTransitionDurationHandler"]]]]]], options);
});
