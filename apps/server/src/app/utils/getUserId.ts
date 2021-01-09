import { Context } from '../context';

import { verify } from 'jsonwebtoken';

interface Token {
  userId: string;
}

export function getUserId(context: Context) {
  const authorization = context.request.get('Authorization');

  if (authorization) {
    const token = authorization.replace('Bearer ', '');
    const verifiedToken = verify(
      token,
      process.env.APP_SECRET || 'appsecret123'
    ) as Token;

    return verifiedToken && verifiedToken.userId;
  }
}
