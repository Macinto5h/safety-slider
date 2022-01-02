import { SpecUtils } from '../../../utils/spec-utils';

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
});
