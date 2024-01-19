"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// operations/openai/load-url.ts
var load_url_exports = {};
__export(load_url_exports, {
  default: () => load_url_default
});
module.exports = __toCommonJS(load_url_exports);

// generated/wundergraph.factory.ts
var import_operations = require("@wundergraph/sdk/operations");
var import_operations2 = require("@wundergraph/sdk/operations");
var createOperation = (0, import_operations.createOperationFactory)();

// operations/openai/load-url.ts
var load_url_default = createOperation.query({
  input: import_operations2.z.object({
    url: import_operations2.z.string()
  }),
  response: import_operations2.z.object({
    content: import_operations2.z.string()
  }),
  description: "Load the content of a url",
  handler: async ({ input, log }) => {
    log.debug("Loading url", input.url);
    const data = await fetch(input.url).then((res) => res.text());
    log.debug("Loaded url", input.url);
    return {
      content: data
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=load-url.cjs.map
