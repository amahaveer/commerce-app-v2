import { GraphQLScalarType, Kind } from 'graphql';

const DateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'A Date type, represented as an ISO-8601 string',
  parseValue(value: any) {
    // Convert incoming integer or string to Date
    return new Date(value);
  },
  serialize(value: any) {
    // Convert Date to integer for outgoing JSON
    return value instanceof Date ? value.toISOString() : null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
      // Parse AST literal to Date
      return new Date(ast.value);
    }
    return null;
  }
});

export default {
    DateScalar,  // Add this to your resolvers map
};
