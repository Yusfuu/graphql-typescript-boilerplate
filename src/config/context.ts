import { Request } from 'express';

export interface Context {
  req: Request;
}

export const context = async ({ req }: any): Promise<Context> => {
  return {
    req,
  };
};
