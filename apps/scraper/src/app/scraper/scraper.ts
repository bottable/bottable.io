import { Processor } from 'bullmq';
import { ScraperData } from '@bottable.io/data-access/util-prisma';
import * as puppeteer from 'puppeteer';
import { Selector } from '@prisma/client';

export const scraper: Processor = async (job) => {
  console.log('[🦑 Scraper] Got job: ', job.data);
  const { tracker, selectors } = job.data as ScraperData;
  const { url, name, id } = tracker;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--window-size=1500,1500',
        '--no-sandbox',
        '--disable-setuid-sandbox',
      ],
    });

    const page = await browser.newPage();

    await page.setViewport({
      width: 1000,
      height: 1000,
      deviceScaleFactor: 1,
    });

    await page.setUserAgent(
      'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36'
    );

    console.log(
      `[🦑 Scraper] Visiting ${url} for Tracker ${name} with ID ${id}`
    );

    await page.goto(url, {
      timeout: 10000,
      waitUntil: 'load',
    });

    console.log(`[🦑 Scraper] Waiting for HTML`);

    await waitTillHTMLRendered(page, selectors);

    console.log(
      `[🦑 Scraper] Start selecting with ${selectors.length} selectors`
    );

    const selectedPromises = selectors.map((selector) => {
      const _selector = selector;
      return page.evaluate((selector) => {
        // if the query doens't select anything then empty array
        const values = Array.from(
          document.querySelectorAll(selector.location),
          (element) => {
            try {
              return element.innerText;
            } catch (err) {
              try {
                return element.textContent;
              } catch (e) {
                return err.message;
              }
            }
          }
        );
        return { selector, values };
      }, _selector);
    });

    const selectedValues = await Promise.all(selectedPromises);

    console.log(`[🦑 Scraper] Selected ${selectedValues.length} values `);

    await browser.close();

    console.log(`[🦑 Scraper] Closed...Returning `, selectedValues);

    return selectedValues;
  } catch (error) {
    throw new Error(error.message);
  }
};

const waitTillHTMLRendered = async (
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
