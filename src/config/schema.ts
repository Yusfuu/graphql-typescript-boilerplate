import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { shield, IRules } from 'graphql-shield';
import { print } from 'graphql';
import { writeFileSync } from 'fs';
import { env } from './env';

const typesPath = join(__dirname, '../graphql/**/typeDefs.*');
const resolversPath = join(__dirname, '../graphql/**/resolvers.*');
const permissionPath = join(__dirname, '../graphql/**/permission.*');

const typesArray = loadFilesSync(typesPath);
const resolversArray = loadFilesSync(resolversPath);
const permissionArray = loadFilesSync(permissionPath);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
const permission = mergeResolvers(permissionArray);

const permissions = shield(permission as IRules, {
  allowExternalErrors: env.isDevelopment,
});

const gql = makeExecutableSchema({ typeDefs, resolvers });

// generate schema.graphql
// you can disable this if you don't need it
const printedTypeDefs = print(typeDefs);
writeFileSync('schema.graphql', printedTypeDefs);

export const schema = applyMiddleware(gql, permissions);
