import { gql } from 'apollo-server-express';

const extensionAppSchema = gql`
  scalar DateScalar
  scalar JSON
  directive @auth on FIELD_DEFINITION

  type ProductAnalytics {
    data: JSON
    name: String
    productName: String
  }

  input IProductPriceAnalyse {
    productName: String!
  }

  input PaginationInput {
    limit: Int
    offset: Int
  }

  type Query {
    getProductPriceAnalytics(productName: String!): JSON
  }

`;

export default extensionAppSchema;
