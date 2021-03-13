import { Sync } from './task/sync';
import { Ping } from './task/ping';
import { Slack } from './task/slack';
// import { SendMail } from './sendMail'

import { Task } from './task';

Task.register({
  Sync: new Sync(),
  Ping: new Ping(),
  Slack: new Slack(),
  // SendMail
});

export { Task };
