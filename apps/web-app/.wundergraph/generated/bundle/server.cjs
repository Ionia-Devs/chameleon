"use strict";var t=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var a=Object.getOwnPropertyNames;var p=Object.prototype.hasOwnProperty;var f=(r,e)=>{for(var s in e)t(r,s,{get:e[s],enumerable:!0})},m=(r,e,s,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of a(e))!p.call(r,o)&&o!==s&&t(r,o,{get:()=>e[o],enumerable:!(i=u(e,o))||i.enumerable});return r};var c=r=>m(t({},"__esModule",{value:!0}),r);var h={};f(h,{default:()=>d});module.exports=c(h);var n=require("@wundergraph/sdk/server"),d=(0,n.configureWunderGraphServer)(()=>({hooks:{queries:{Countries:{preResolve:async({operations:r})=>{}}},mutations:{}}}));0&&(module.exports={});
//# sourceMappingURL=server.cjs.map
