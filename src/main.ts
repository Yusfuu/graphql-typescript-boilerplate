import { createServer } from '@config/apollo';
import { middlewares } from '@middlewares/index';
import { context } from '@config/context';
import { schema } from '@schema/index';

const port = process.env.PORT || 4000;

const server = createServer({ schema, context, port, middlewares });

server.then(({ graphqlPath }) => {
  console.log(`🚀 Server ready at http://localhost:${port}${graphqlPath}`);
});
