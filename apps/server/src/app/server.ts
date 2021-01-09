import { createContext } from './context';
import resolvers from './resolvers';
// import { permissions } from './permissions/index';

import { GraphQLServer } from 'graphql-yoga';

import { join } from 'path';

export default new GraphQLServer({
  typeDefs: join(__dirname, 'assets', 'schemas', 'schema.graphql'),
  context: createContext,
  resolvers,
  // middlewares: [permissions],
});
