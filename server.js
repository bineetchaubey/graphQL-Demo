const { ApolloServer, gql, PubSub } = require('apollo-server');

// const { PubSub } = require('apollo-server');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolver');



// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

