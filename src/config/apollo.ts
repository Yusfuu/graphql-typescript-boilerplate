import express from 'express';
import http from 'http';
import compression from 'compression';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { context } from './context';
import { GraphQLSchema } from 'graphql';
import { graphqlUploadExpress } from 'graphql-upload';

const port = process.env.PORT || 4000;

const uploadOptions = {
  maxFileSize: 3 * 1024 * 1024, // no larger than 3mb, you can change as needed.
  maxFiles: 5,
};

export const bootstrap = async (schema: GraphQLSchema) => {
  const app = express();
  app.use(graphqlUploadExpress(uploadOptions), compression());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    context,
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    validationRules: [depthLimit(10)],
    formatError: (error: any) => {
      // don't expose internal server errors to the client ex: database errors
      return error;
    },
  });

  await server.start();
  server.applyMiddleware({ app, path: '/gql' });
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  return {
    url: `http://localhost:${port}${server.graphqlPath}`,
  };
};
