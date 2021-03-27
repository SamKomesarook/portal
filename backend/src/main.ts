import { ApolloServer } from 'apollo-server';

import resolvers from './resolvers';
import typeDefs from './type-defs';

const server = new ApolloServer({resolvers, typeDefs})
// TODO: Add express
// TODO: Env file
server.listen().then(({url}) => console.log(`Server ready at ${url}`))