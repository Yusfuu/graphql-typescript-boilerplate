import { graphqlUploadExpress } from 'graphql-upload';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: false, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const uploadOptions = {
  maxFileSize: 3 * (1024 * 1024), // no larger than 3mb, you can change as needed.
  maxFiles: 5,
};

export const middlewares = [graphqlUploadExpress(uploadOptions), limiter];
