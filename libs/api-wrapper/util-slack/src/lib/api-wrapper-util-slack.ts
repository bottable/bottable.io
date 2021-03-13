// https://github.com/slackapi/node-slack-sdk
import { WebClient, WebAPICallResult } from '@slack/web-api';

const web = new WebClient(process.env.SLACK_TOKEN);

interface ChatPostMessageResult extends WebAPICallResult {
  channel: string;
  ts: string;
  message: {
    text: string;
  };
}

export const conversationIdMap = {
  '#bottable': 'C01RJ220D17',
};

export const notifyChannel = async (
  conversationId: string,
  message: string
) => {
  try {
    // See: https://api.slack.com/methods/chat.postMessage
    const res = (await web.chat.postMessage({
      channel: conversationId,
      text: message,
    })) as ChatPostMessageResult;

    // `res` contains information about the posted message
    console.log('Message sent: ', res);
    return res;
  } catch (e) {
    console.log('Message sent Error: ', e);
  }
};

export function apiWrapperUtilSlack(): string {
  return 'api-wrapper-util-slack';
}
