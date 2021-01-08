import resolvers from './app/resolvers';

import { ApolloServer } from 'apollo-server';

import { readFileSync } from 'fs';
import { join } from 'path';

const server = new ApolloServer({
  typeDefs: readFileSync(
    join(__dirname, 'assets/schemas/schema.graphql'),
    'utf8'
  ),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}.`));
