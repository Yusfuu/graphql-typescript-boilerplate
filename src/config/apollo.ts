import express from 'express';
import http from 'http';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { context } from './context';

export const startApolloServer = async (schema: any) => {
  const app = express();

  const port = process.env.PORT || 4000;

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
