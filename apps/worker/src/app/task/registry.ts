import { Sync } from './sync';
import { Ping } from './ping';
// import { SendMail } from './sendMail'
import { Task } from './task';

Task.register({
  Sync,
  Ping,
  // SendMail
});

export { Task };
