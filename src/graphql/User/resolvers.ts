import type { Resolvers } from '@generated/types';
import { faker } from '@faker-js/faker';

export const resolvers: Resolvers = {
  Query: {
    user: (parent, args) => {
      const user = {
        id: faker.datatype.uuid(),
        name: faker.name.firstName(),
        email: faker.internet.email(),
      };
      return user;
    },
  },
};
