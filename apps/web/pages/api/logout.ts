import { serialize } from 'cookie';

export default async (req, res) => {
  /* remove cookies from request header */
  res.setHeader('Set-Cookie', [
    serialize('token', '', {
      maxAge: -1,
      path: '/',
    }),
  ]);

  res.writeHead(301, { Location: '/' });
  res.end();
};
