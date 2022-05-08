import { createServer } from '@config/apollo';
import { schema } from '@schema/index';
import { context } from '@config/context';

const port = process.env.PORT || 4000;

const server = createServer({ schema, context, port });

server.then(({ graphqlPath }) => {
  console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`);
});
