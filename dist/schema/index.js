"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.schema=void 0;var a=require("path"),b=require("@graphql-tools/load-files"),c=require("@graphql-tools/merge"),d=require("@graphql-tools/schema"),e=require("graphql-middleware"),f=require("../middlewares/permission");const g=a.join(__dirname,"./**/typeDefs.*"),h=a.join(__dirname,"./**/resolvers.*"),i=b.loadFilesSync(g),j=b.loadFilesSync(h),k=c.mergeTypeDefs(i),l=c.mergeResolvers(j),m=d.makeExecutableSchema({typeDefs:k,resolvers:l}),n=e.applyMiddleware(m,f.permissions);exports.schema=n
//# sourceMappingURL=index.js.map