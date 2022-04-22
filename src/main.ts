import { bootstrap } from '@config/apollo';
import { schema } from '@schema/index';

bootstrap(schema)
  .then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  })
  .catch(console.error);
