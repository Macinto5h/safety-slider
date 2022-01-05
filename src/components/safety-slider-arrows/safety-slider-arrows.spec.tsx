import { SpecUtils } from '../../utils/spec-utils';
import { SafetySliderArrows } from './safety-slider-arrows';

describe('safety-slider-arrows', () => {
  it('should disable the previous slide arrow if activeSlide is zero and isInfinite is false', async () => {
    const page = await SpecUtils.buildArrowSpecPage();
    const prevArrow = SpecUtils.getPrevArrowElement(page);

    expect(prevArrow).toHaveAttribute('disabled');
  });

  it('should disable the next slide arrow if activeSlide is the last slide and isInfinite is false', async () => {
    const page = await SpecUtils.buildArrowSpecPage('active-slide="1" slide-count="2"');
    const nextArrow = SpecUtils.getNextArrowElement(page);

    expect(nextArrow).toHaveAttribute('disabled');
  });

  it('should render default values of the prev and next arrow content if properties are not set', async () => {
    const page = await SpecUtils.buildArrowSpecPage();

    const prevArrow = SpecUtils.getPrevArrowElement(page);
    const nextArrow = SpecUtils.getNextArrowElement(page);

    expect(prevArrow.innerHTML).toEqualHtml('←');
    expect(nextArrow.innerHTML).toEqualHtml('→');
  });

  it('should render prev arrow content based on the value given to the prev-arrow property', async () => {
    const prevArrowInnerHTML = "<i class='fa fa-chevron-left'></i>";
    const page = await SpecUtils.buildArrowSpecPage(`prev-arrow="${prevArrowInnerHTML}"`);

    const prevArrow = SpecUtils.getPrevArrowElement(page);
    expect(prevArrow.innerHTML).toEqualHtml(prevArrowInnerHTML);
  });

  it('should render next arrow content based on the value given to the next-arrow property', async () => {
    const rightArrowInnerHTML = "<i class='fa fa-chevron-right'></i>";
    const page = await SpecUtils.buildArrowSpecPage(`next-arrow="${rightArrowInnerHTML}"`);

    const nextArrow = SpecUtils.getNextArrowElement(page);
    expect(nextArrow.innerHTML).toEqualHtml(rightArrowInnerHTML);
  });

  it('should change the active slide to the preceding slide when the previous arrow is clicked', async () => {
    const page = await SpecUtils.buildArrowSpecPage('active-slide="1"');

    const component: SafetySliderArrows = page.rootInstance;
    const prevArrow = SpecUtils.getPrevArrowElement(page);
    const eventSpy = jest.spyOn(component.safetySliderNavigationClick, 'emit');

    prevArrow.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(0);
  });

  it('should change the active slide to the next slide when the next arrow button is clicked', async () => {
    const page = await SpecUtils.buildArrowSpecPage();

    const component: SafetySliderArrows = page.rootInstance;
    const nextArrow = SpecUtils.getNextArrowElement(page);
    const eventSpy = jest.spyOn(component.safetySliderNavigationClick, 'emit');

    nextArrow.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(1);
  });

  it('should change the active slide to the first slide when active slide is last, infinite is enabled, and next button is clicked', async () => {
    const page = await SpecUtils.buildArrowSpecPage('slide-count="3" active-slide="2" is-infinite');

    const component: SafetySliderArrows = page.rootInstance;
    const nextArrow = SpecUtils.getNextArrowElement(page);
    const eventSpy = jest.spyOn(component.safetySliderNavigationClick, 'emit');

    nextArrow.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(0);
  });

  it('should change the active slide to the last slide when active slide is first, infinite is enabled, and previous button is clicked', async () => {
    const page = await SpecUtils.buildArrowSpecPage('slide-count="3" active-slide="0" is-infinite');

    const component: SafetySliderArrows = page.rootInstance;
    const prevArrow = SpecUtils.getPrevArrowElement(page);
    const eventSpy = jest.spyOn(component.safetySliderNavigationClick, 'emit');

    prevArrow.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(2);
  });
});