import { Selector } from '@prisma/client';

export const waitTillHTMLRendered = async (
  page,
  selectors: Selector[],
  // TODO Pass timeout from Job retry
  timeout = 16000
) => {
  const checkDurationMsecs = 2000;
  const maxChecks = timeout / checkDurationMsecs;
  let lastHTMLSize = 0;
  let checkCounts = 1;
  let countStableSizeIterations = 0;
  const minStableSizeIterations = 3;
  let selectorTargets = [];

  while (
    checkCounts++ <= maxChecks &&
    selectorTargets.length < selectors.length
  ) {
    console.log(`[🦑 Scraper] Retrying ${checkCounts} / ${maxChecks}`);

    const html = await page.content();
    const currentHTMLSize = html.length;

    // const bodyHTMLSize = await page.evaluate(
    //   () => document.body.innerHTML.length
    // );

    // console.log(
    //   'last: ',
    //   lastHTMLSize,
    //   ' <> curr: ',
    //   currentHTMLSize,
    //   ' body html size: ',
    //   bodyHTMLSize
    // );

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      countStableSizeIterations++;
    else countStableSizeIterations = 0; //reset the counter

    if (countStableSizeIterations >= minStableSizeIterations) {
      console.log('Page rendered fully..');
      break;
    }

    lastHTMLSize = currentHTMLSize;

    const selectedPromises = selectors.map((selector) => {
      const _selector = selector;
      return page.evaluate((selector) => {
        return Array.from(
          document.querySelectorAll(selector.location),
          // found the target
          () => true
        );
      }, _selector);
    });

    selectorTargets = await Promise.all(selectedPromises);
    // empty array
    selectorTargets = selectorTargets.filter((target) => target.length > 0);
    console.log(
      `[🦑 Scraper] Selector Targets: Expected => ${selectors.length} Actual => ${selectorTargets.length}`
    );

    if (selectorTargets.length == selectors.length)
      console.log(
        `[🦑 Scraper] ALL ${selectors.length} Selector Targets FOUND 🎉 `
      );

    await page.waitForTimeout(checkDurationMsecs);
  }
};
