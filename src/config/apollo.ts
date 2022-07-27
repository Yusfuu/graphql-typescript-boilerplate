import express, { RequestHandler } from 'express';
import http from 'http';
import depthLimit from 'graphql-depth-limit';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer, Context } from 'apollo-server-core';
import { GraphQLSchema } from 'graphql';

interface IConfig {
  schema: GraphQLSchema;
  context: Context;
  middlewares: RequestHandler[];
  port: number | string;
}

export const createServer = async ({ schema, context, middlewares, port }: IConfig) => {
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
  app.use(middlewares);

  apollo.applyMiddleware({ app });

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  return {
    app,
    httpServer,
    graphqlPath: apollo.graphqlPath,
  };
};
