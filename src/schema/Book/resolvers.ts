import type { Resolvers } from '@generated/types';

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

// Provide resolver functions for your schema fields
export const resolvers: Resolvers = {
  Query: {
    books: () => books,
  },
};
