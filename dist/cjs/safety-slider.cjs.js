'use strict';

const index = require('./index-39f15080.js');

/*
 Stencil Client Patch Browser v2.7.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('safety-slider.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["safety-slider_4.cjs",[[4,"safety-slider",{"isInfinite":[4,"infinite"],"prevArrowInnerHTML":[1,"prev-arrow"],"hasNoArrows":[4,"no-arrows"],"hasNoDots":[4,"no-dots"],"nextArrowInnerHTML":[1,"next-arrow"],"prevArrowAriaLabel":[1,"prev-arrow-aria-label"],"nextArrowAriaLabel":[1,"next-arrow-aria-label"],"dotAriaLabel":[1,"dot-aria-label"],"activeSlide":[32],"setActiveSlide":[64]},[[0,"safetySliderNavigationClick","onSafetySliderDotClick"]]],[0,"safety-slider-arrows",{"slideCount":[2,"slide-count"],"activeSlide":[2,"active-slide"],"prevArrowInnerHTML":[1,"prev-arrow"],"nextArrowInnerHTML":[1,"next-arrow"],"isInfinite":[4,"is-infinite"],"prevAriaLabel":[1,"prev-aria-label"],"nextAriaLabel":[1,"next-aria-label"],"uuid":[1]}],[0,"safety-slider-dots",{"activeDot":[2,"active-dot"],"dotCount":[2,"dot-count"],"dotAriaLabel":[1,"dot-aria-label"],"uuid":[1]}],[4,"safety-slider-window",{"activeSlide":[2,"active-slide"],"isInfinite":[516,"is-infinite"],"uuid":[1],"rootWidth":[32]},[[9,"resize","windowResizeHandler"],[0,"safetySliderInfiniteLoopAdjustment","infiniteLoopAdjustmentHandler"],[0,"safetySliderApplyTransitionDuration","applyTransitionDurationHandler"]]]]]], options);
});
