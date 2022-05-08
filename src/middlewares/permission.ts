import { rule, shield } from 'graphql-shield';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin';
  }
);

// Permissions
export const permissions = shield(
  {
    Query: {
      hello: isAuthenticated,
    },
  },
  { allowExternalErrors: process.env.NODE_ENV === 'production' }
);
