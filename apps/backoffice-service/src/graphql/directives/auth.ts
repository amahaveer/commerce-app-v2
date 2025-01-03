import { defaultFieldResolver, GraphQLSchema } from "graphql";
import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import jwt, { JwtPayload } from "jsonwebtoken";

export function authDirective(directiveName: string) {
  return {
    authDirectiveTypeDefs: `directive @${directiveName} on FIELD_DEFINITION`,
    authDirectiveTransformer: (schema: GraphQLSchema) =>
      mapSchema(schema, {
        [MapperKind.OBJECT_FIELD](fieldConfig) {
          const { resolve = defaultFieldResolver } = fieldConfig;
          const authDirective = getDirective(
            schema,
            fieldConfig,
            directiveName
          )?.[0];
          
          if (authDirective) {
            fieldConfig.resolve = async function (source, args, context, info) {
              const token = context.headers.authorization?.replace("Bearer ", "");

              if (!token) {
                throw new Error("Authentication required");
              }

              try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY) as JwtPayload;
                context.user = decoded; 
              } catch (err) {
                throw new Error("Invalid or expired token");
              }

              return resolve(source, args, context, info);
            };
            return fieldConfig;
          }
        },
      }),
  };
}

const { authDirectiveTypeDefs, authDirectiveTransformer } = authDirective("auth");
export { authDirectiveTypeDefs, authDirectiveTransformer };
