import express from 'express';
import http from 'http';
import compression from 'compression';
import helmet from 'helmet';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import { context } from './context';

const isProduction = process.env.NODE_ENV === 'production';

export const startApolloServer = async (schema: any) => {
  const port = process.env.PORT || 4000;

  const app = express();
  app.use(compression());
  app.use(
    helmet({
      contentSecurityPolicy: isProduction,
      crossOriginEmbedderPolicy: isProduction,
    })
  );

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
