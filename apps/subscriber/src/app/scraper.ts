import {
  ScraperJobResponseData,
  QueueFactory,
  COMPLETED,
  FAILED,
  STALLED,
  SLACK,
  QueueSubscriberEventHandler,
  TASK,
} from '@bottable.io/queue';

const factory = new QueueFactory();
// send slack message
const task = factory.getQueue(TASK).getProducer();

export const handler: QueueSubscriberEventHandler = async (
  id,
  type,
  payload
) => {
  try {
    console.log('QueueSubscriberEventHandler');
    // TODO on failure add a notify job to background worker
    const data = payload.data as ScraperJobResponseData;
    console.log(data);
    const {
      scraperRequest: { tracker },
      scraperValues,
    } = data;

    const title = `
        _🦑  [SCRAPER UPDATE]: ${tracker.name}_
      `;
    let body = '';
    switch (type) {
      case COMPLETED:
        console.log('completed');
        scraperValues.forEach((value) => {
          body += `
            *${value.selector.category}*
            \`\`\`
            ${value.values.map((val) => val.trim()).join(' ')}
            \`\`\`
            `;
        });
        // if no values are returned from the selector
        await task.add(`${SLACK}-${tracker.name}`, {
          type: SLACK,
          channel: '#bottable',
          message: title + body,
        });
        break;
      case STALLED:
        break;
      case FAILED:
        break;
      default:
        break;
    }
  } catch (e) {
    console.log(e);
  }
};
