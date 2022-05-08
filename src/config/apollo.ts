import express from 'express';
import http from 'http';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, Context } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';

interface IConfig {
  schema: GraphQLSchema;
  context?: Context;
  port?: number | string;
}

// upload options middleware
const uploadOptions = {
  maxFileSize: 3 * (1024 * 1024), // no larger than 3mb, you can change as needed.
  maxFiles: 5,
};

export const createServer = async ({ schema, context, port }: IConfig) => {
  const app = express();
  const httpServer = http.createServer(app);

  const apollo = new ApolloServer({
    context,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    csrfPrevention: true,
    validationRules: [depthLimit(5)],
  });

  await apollo.start();

  // attach middleware at this point to run before Apollo.
  app.use(graphqlUploadExpress(uploadOptions));

  apollo.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  return {
    app,
    httpServer,
    graphqlPath: apollo.graphqlPath,
  };
};
