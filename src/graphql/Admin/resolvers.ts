import type { Resolvers } from '@generated/types';

// Provide resolver functions for your schema fields
export const resolvers: Resolvers = {
  Query: {
    admin: () => '👋 Hello, Admin!',
  },
};
