import { CONFIRM_USER_PREFIX } from '../constants';

import { getRedis } from '@bottable.io/data-access/util-redis';

import { v4 } from 'uuid';

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();

  await getRedis().set(CONFIRM_USER_PREFIX + token, userId, 'ex', 60 * 60 * 24); // 1 day expiration

  // TODO: add localhost:3000 to frontend
  return `http://localhost:3000/user/confirm/${token}`;
};
