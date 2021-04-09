import { ME_QUERY } from '../graphql/queries';
import client from '../apollo-client';

import cookie, { serialize } from 'cookie';

export const getAuth = async ({ req, res }) => {
  if (req.headers.cookie) {
    const { token } = cookie.parse(req.headers.cookie);

    const {
      data: { me },
    } = await client.query({
      query: ME_QUERY,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
      },
    });

    if (me) return { props: me };
    else {
      res.setHeader('Set-Cookie', [
        serialize('token', '', {
          maxAge: -1,
          path: '/',
        }),
      ]);
    }
  }

  res.writeHead(301, {
    Location: '/login',
  });
  res.end();

  return { props: {} };
};
