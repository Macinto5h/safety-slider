import { newSpecPage } from '@stencil/core/testing';
import { SafetySliderDots } from './safety-slider-dots';

describe('safety-slider-dots', () => {
  it('renders a number of dot buttons based on the value passed to dotCount', async () => {
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots dot-count="3"></safety-slider-dots>`,
    });

    const dotBtns = page.root.querySelectorAll('button');

    expect(dotBtns.length).toBe(3);
  });

  it('renders the dot button representing the active slide as disabled', async () => {
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots active-dot="1" dot-count="3"></safety-slider-dots>`,
    });

    const secondDotBtn = page.root.querySelectorAll('button')[1] as HTMLButtonElement;

    expect(secondDotBtn).toHaveAttribute('disabled');
  });

  it('should emit the safetySliderNavigationClick event when a dot is clicked', async () => {
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots dot-count="3"></safety-slider-dots>`
    });

    const dotInstance: SafetySliderDots = page.rootInstance;
    const eventSpy = jest.spyOn(dotInstance.safetySliderNavigationClick, 'emit');

    const dotBtn = page.root.querySelectorAll('button')[1];

    dotBtn.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveBeenCalledWith(1);
  });

  it('should use the dot-aria-label property text for the dot button aria labels', async () => {
    const dotCount = 3;
    const ariaText = "alt {0} text {1}";
    const page = await newSpecPage({
      components: [SafetySliderDots],
      html: `<safety-slider-dots dot-count="${dotCount}" dot-aria-label="${ariaText}"></safety-slider-dots>`
    });

    const dotBtn = page.root.querySelectorAll('button')[1];

    expect(dotBtn.getAttribute('aria-label')).toEqual('alt 2 text ' + dotCount);
  });
});
