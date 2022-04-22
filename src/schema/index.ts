import { join } from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import { permissions } from '@middlewares/permission';

const typesPath = join(__dirname, './**/typeDefs.*');
const resolversPath = join(__dirname, './**/resolvers.*');

const typesArray = loadFilesSync(typesPath);
const resolversArray = loadFilesSync(resolversPath);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

const gql = makeExecutableSchema({ typeDefs, resolvers });

export const schema = applyMiddleware(gql, permissions);
