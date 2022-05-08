import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { shield, IRules } from 'graphql-shield';

const typesPath = join(__dirname, '../schema/**/typeDefs.*');
const resolversPath = join(__dirname, '../schema/**/resolvers.*');
const permissionPath = join(__dirname, '../schema/**/permission.*');

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
