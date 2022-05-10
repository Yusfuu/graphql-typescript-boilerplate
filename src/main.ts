import { env } from '@config/env';
import { createServer, context, middlewares, schema } from '@config/index';

// load environment variables from a .env file
import 'dotenv/config';

const server = createServer({ schema, context, middlewares, port: env.port });

server.then(({ graphqlPath }) => {
  console.log(`🚀 Server ready at http://localhost:${env.port}${graphqlPath}`);
});
