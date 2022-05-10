import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { shield, IRules } from 'graphql-shield';
import { print } from 'graphql';
import { writeFileSync } from 'fs';
import { env } from './env';

const combined = (path: string) => {
  const _path = join(__dirname, path);
  return loadFilesSync(_path);
};

const typeDefs = mergeTypeDefs(combined('../graphql/**/typeDefs.*'));
const resolvers = mergeResolvers(combined('../graphql/**/resolvers.*'));
const permission = mergeResolvers(combined('../graphql/**/permission.*'));

const permissions = shield(permission as IRules, {
  allowExternalErrors: env.isDevelopment,
});

const gql = makeExecutableSchema({ typeDefs, resolvers });

// generate schema.graphql
// you can disable this if you don't need it
const printedTypeDefs = print(typeDefs);
writeFileSync('schema.graphql', printedTypeDefs);

export const schema = applyMiddleware(gql, permissions);
