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

// operations/openai/extract-website-metadata.ts
var extract_website_metadata_exports = {};
__export(extract_website_metadata_exports, {
  default: () => extract_website_metadata_default
});
module.exports = __toCommonJS(extract_website_metadata_exports);

// generated/wundergraph.factory.ts
var import_operations = require("@wundergraph/sdk/operations");
var import_operations2 = require("@wundergraph/sdk/operations");
var createOperation = (0, import_operations.createOperationFactory)();

// operations/openai/extract-website-metadata.ts
var extract_website_metadata_default = createOperation.query({
  input: import_operations2.z.object({
    url: import_operations2.z.string()
  }),
  description: "Load metadata like title, description, social media images, headlines, and summary from a website",
  handler: async ({ operations, input, openAI }) => {
    const metaData = await getMetaData(openAI, input.url);
    const links = await getLinks(openAI, input.url);
    return {
      links,
      ...metaData
    };
  }
});
var getMetaData = async (openAI, url) => {
  const agent = openAI.createAgent({
    model: "gpt-3.5-turbo-16k-0613",
    functions: [
      {
        name: "openai/load-url",
        pagination: {
          pageSize: 1024 * 15,
          maxPages: 1
        }
      },
      {
        name: "openai/summarize-url-content"
      }
    ],
    structuredOutputSchema: import_operations2.z.object({
      title: import_operations2.z.string(),
      description: import_operations2.z.string(),
      h1: import_operations2.z.string(),
      summary: import_operations2.z.string()
    })
  });
  const out = await agent.execWithPrompt({
    prompt: `Load the content of the URL: ${url}
		You're a HTML parser. Your job is to extract the title, description and h1 from the HTML.
		Do not include the HTML tags in the result.
		Don't change the content, just extract the information.
		
		Once this is done, add a summary of the website.
		`,
    outPrompt: "Set the result to the out function in a structured way",
    debug: true
  });
  return out.structuredOutput;
};
var getLinks = async (openAI, url) => {
  const agent = openAI.createAgent({
    model: "gpt-3.5-turbo-16k-0613",
    functions: [
      {
        name: "openai/load-url",
        pagination: {
          pageSize: 1024 * 15,
          maxPages: 3
        }
      }
    ],
    structuredOutputSchema: import_operations2.z.object({
      links: import_operations2.z.array(import_operations2.z.string())
    })
  });
  const out = await agent.execWithPrompt({
    prompt: `Load the content of the URL: ${url}
		You're a HTML parser. Your job is to extract links from the HTML.
		Do not include the HTML tags in the result.
		Don't change the content, just extract the links.
		Exclude links that are not visible or meaningful to the user,
		like links to images, scripts, js, stylesheets, fonts, etc.
		`,
    outPrompt: "Set the result to the out function in a structured way",
    debug: true
  });
  return out.structuredOutput.links;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=extract-website-metadata.cjs.map
