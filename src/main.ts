import { createServer, context, middlewares, schema } from '@config/index';

// load environment variables from a .env file
import 'dotenv/config';

const port = process.env.PORT || 4000;
const server = createServer({ schema, context, middlewares, port });

server.then(({ graphqlPath }) => {
  console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`);
});
