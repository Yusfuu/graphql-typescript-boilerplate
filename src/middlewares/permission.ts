import { rule, shield } from 'graphql-shield';

export const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user !== null;
  }
);

export const isAdmin = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    return ctx.user.role === 'admin';
  }
);

// Permissions
export const permissions = shield({
  Query: {
    hello: isAuthenticated,
  },
});
