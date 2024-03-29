import { createContext } from './context';
import resolvers from './resolvers';

import { getRedis } from '@bottable.io/data-access/util-redis';
import session from 'express-session';
import connectRedis from 'connect-redis';
import { GraphQLServer } from 'graphql-yoga';
import cors from 'cors';

// import { permissions } from './permissions/index';

import { join } from 'path';

const RedisStore = connectRedis(session);

const sessionMiddleware = session({
  store: new RedisStore({
    client: getRedis(),
  }),
  name: 'qid',
  secret: process.env.APP_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 25 * 7 * 365, // 7 years
  },
});

const server = new GraphQLServer({
  typeDefs: join(__dirname, 'assets', 'schemas', 'schema.graphql'),
  context: createContext,
  resolvers,
});

server.express.use(
  cors({
    origin: true,
    credentials: true,
  })
);

server.express.use(sessionMiddleware);

export default server;
