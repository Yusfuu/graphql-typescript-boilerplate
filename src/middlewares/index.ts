import { graphqlUploadExpress } from 'graphql-upload';
import { limiter } from '@middlewares/limiter';

const uploadOptions = {
  maxFileSize: 3 * (1024 * 1024), // no larger than 3mb, you can change as needed.
  maxFiles: 5,
};

export const middlewares = [graphqlUploadExpress(uploadOptions), limiter];
