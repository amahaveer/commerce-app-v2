// Define your GraphQL queries and mutations
export const getCategoriesGraphQlQuery = (): string => `
      query CategorySearch($where: String, $offset: Int!, $limit: Int!, $sorts: [String!]) {
        categories(sort: $sorts, where: $where, limit: $limit, offset: $offset) {
          count
          total
          results {
            id
            key
            externalId
            childCount
            orderHint
            stagedProductCount
            createdAt
            lastModifiedAt
            version
            nameAllLocales {
              locale
              value
            }
            slugAllLocales {
              locale
              value
            }
            ancestors {
              id
              nameAllLocales {
                locale
                value
              }
            }
          }
        }
      }
    `;

export const getCategoryById =
  (): string => `query GetCategoryById($id: String!) {
        category(id: $id) {
          id
          key
          nameAllLocales {
            locale
            value
          }
          slugAllLocales {
            locale
            value
          }
          descriptionAllLocales {
            locale
            value
          }
          ancestors {
            id
            nameAllLocales {
              locale
              value
            }
          }
          parent {
            id
          }
          childCount
          orderHint
          stagedProductCount
          createdAt
          lastModifiedAt
          version
        }
      }`;
