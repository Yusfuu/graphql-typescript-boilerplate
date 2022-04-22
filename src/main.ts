import { startApolloServer } from '@config/apollo';
import { schema } from '@schema/index';

startApolloServer(schema)
  .then(({ url }) => console.log(`🚀 Server ready at ${url}`))
  .catch(console.error);
