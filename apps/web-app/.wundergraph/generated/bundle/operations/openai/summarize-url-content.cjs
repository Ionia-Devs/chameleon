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

// operations/openai/summarize-url-content.ts
var summarize_url_content_exports = {};
__export(summarize_url_content_exports, {
  default: () => summarize_url_content_default
});
module.exports = __toCommonJS(summarize_url_content_exports);

// generated/wundergraph.factory.ts
var import_operations = require("@wundergraph/sdk/operations");
var import_operations2 = require("@wundergraph/sdk/operations");
var createOperation = (0, import_operations.createOperationFactory)();

// operations/openai/summarize-url-content.ts
var summarize_url_content_default = createOperation.query({
  input: import_operations2.z.object({
    url: import_operations2.z.string()
  }),
  response: import_operations2.z.object({
    summary: import_operations2.z.string()
  }),
  description: "Summarize the content of a URL",
  handler: async ({ operations, input, log, openAI }) => {
    const agent = openAI.createAgent({
      model: "gpt-3.5-turbo-16k-0613",
      functions: [
        {
          name: "openai/load-url",
          pagination: {
            pageSize: 1024 * 15,
            maxPages: 2
          }
        }
      ],
      structuredOutputSchema: import_operations2.z.object({
        summary: import_operations2.z.string()
      })
    });
    const out = await agent.execWithPrompt({
      prompt: `Load the content of the URL: ${input.url}
			Summarize the content of the website.
			`,
      outPrompt: "Do a summary of all the results and return it as a single string in the out function",
      debug: true
    });
    return {
      summary: out.structuredOutput.summary
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=summarize-url-content.cjs.map
