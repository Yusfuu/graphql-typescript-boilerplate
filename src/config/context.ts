import { Request } from 'express';

export interface Context {
  req: Request;
}

export const context = async ({ req }: { req: Request }): Promise<Context> => {
  return {
    req,
  };
};
