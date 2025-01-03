import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { typeDefs } from './graphql/schema';
import userResolver from './graphql/resolvers/user';
import OrganizationResolver from './graphql/resolvers/organization';
import ProjectResolver from './graphql/resolvers/projects';
import AuthResolver from './graphql/resolvers/auth';
import { authDirectiveTransformer } from './graphql/directives/auth';
import { makeExecutableSchema } from "@graphql-tools/schema";
import TeamResolver from './graphql/resolvers/team';
import TeamMemberResolver from './graphql/resolvers/teamMember';
import PermissionsResolver from './graphql/resolvers/permissions';
import ExtensionAppResolver from './graphql/resolvers/extensionApp';
import redisClient from './configuaration/redis';


const app: any = express();
const PORT = process.env.PORT || 4002;

const directiveTransformers = [authDirectiveTransformer];
const schema = directiveTransformers.reduce(
  (curSchema, transformer: any) => transformer(curSchema),
  makeExecutableSchema({
    typeDefs,
    resolvers: [
      userResolver,
      OrganizationResolver,
      ProjectResolver,
      AuthResolver,
      TeamResolver,
      TeamMemberResolver,
      PermissionsResolver,
      ExtensionAppResolver
    ]
  })
);

const server = new ApolloServer({
  schema,
  introspection: true,
  context: ({ req }) => {
    return req
  },
});

async function startServer() {

  await server.start(); 
  server.applyMiddleware({ app });

  await mongoose.connect(process.env.DB,);
  redisClient.connect().catch(console.error);
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch(err => console.error(err));