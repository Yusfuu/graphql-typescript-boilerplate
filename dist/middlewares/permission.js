"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.permissions=void 0;var a=require("graphql-shield");const b=a.rule({cache:"contextual"})(async(b,c,a,d)=>null!==a.user);a.rule({cache:"contextual"})(async(b,c,a,d)=>"admin"===a.user.role);const c=a.shield({Query:{hello:b}},{allowExternalErrors:"production"===process.env.NODE_ENV});exports.permissions=c
//# sourceMappingURL=permission.js.map