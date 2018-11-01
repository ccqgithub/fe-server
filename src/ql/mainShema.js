const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

const mainSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = mainSchema;
