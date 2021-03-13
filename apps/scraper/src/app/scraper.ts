import { waitTillHTMLRendered } from '../util';

import { JobsOptions, Processor } from 'bullmq';
import {
  ScraperJobRequestData,
  getTrackerKey,
  ScraperJobResponseValue,
} from '@bottable.io/data-access/util-prisma';
import * as puppeteer from 'puppeteer';
import {
  QueueFactory,
  ScraperJobResponseData,
  PROCESSOR,
} from '@bottable.io/queue';
// import { Selector } from '@prisma/client';

const factory = new QueueFactory();
const processorProducer = factory.getQueue(PROCESSOR).getProducer();

export const scraper: Processor = async (job) => {
  const { opts, data: scraperRequest } = job as {
    opts: JobsOptions;
    data: ScraperJobRequestData;
  };

  console.log('[🦑 Scraper] Got job scraperRequest: ', scraperRequest);
  console.log('[🦑 Scraper] Got job option: ', opts);

  const { tracker, selectors } = scraperRequest;
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

    const selectorPromises: Promise<ScraperJobResponseValue>[] = selectors.map(
      (selector) => {
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
      }
    );

    const selectorValues = await Promise.all(selectorPromises);

    console.log(`[🦑 Scraper] Selected ${selectorValues.length} values `);

    await browser.close();

    const scraperJobResponse: ScraperJobResponseData = {
      opts: opts,
      scraperRequest: scraperRequest,
      scraperValues: selectorValues,
    };

    console.log(
      `[🦑 Scraper] Sending results to processor queue `,
      scraperJobResponse
    );

    await processorProducer.add(getTrackerKey(tracker), scraperJobResponse);

    return scraperJobResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};
