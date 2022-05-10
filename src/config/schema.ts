import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { shield, IRules } from 'graphql-shield';
import { print } from 'graphql';
import { writeFileSync } from 'fs';

const typesPath = join(__dirname, '../graphql/**/typeDefs.*');
const resolversPath = join(__dirname, '../graphql/**/resolvers.*');
const permissionPath = join(__dirname, '../graphql/**/permission.*');

const typesArray = loadFilesSync(typesPath);
const resolversArray = loadFilesSync(resolversPath);
const permissionArray = loadFilesSync(permissionPath);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
const permission = mergeResolvers(permissionArray);

export const permissions = shield(permission as IRules, {
  allowExternalErrors: true,
});

const gql = makeExecutableSchema({ typeDefs, resolvers });

export const schema = applyMiddleware(gql, permissions);

// generate schema.graphql
const printedTypeDefs = print(typeDefs);
writeFileSync('schema.graphql', printedTypeDefs);
