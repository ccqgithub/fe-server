const { GraphQLScalarType, Kind } = require('graphql');
const dayjs = require('dayjs');

// 始终用时间戳传递时间
module.exports = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Date time custom scalar type',
  // value from the client
  parseValue(value) {
    // empty
    if (!value) return null;

    // string
    if (Number.isNaN(Number(value))) {
      return new Date(value).getTime();
    }

    // number
    return value;
  },
  // value sent to the client
  serialize(value) {
    // string
    if (Number.isNaN(Number(value))) {
      return new Date(value).getTime();
    }

    // number
    return value;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});
