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

// operations/openai/weather.ts
var weather_exports = {};
__export(weather_exports, {
  default: () => weather_default
});
module.exports = __toCommonJS(weather_exports);

// generated/wundergraph.factory.ts
var import_operations = require("@wundergraph/sdk/operations");
var import_operations2 = require("@wundergraph/sdk/operations");
var createOperation = (0, import_operations.createOperationFactory)();

// operations/openai/weather.ts
var weather_default = createOperation.query({
  input: import_operations2.z.object({
    country: import_operations2.z.string()
  }),
  description: "This operation returns the weather of the capital of the given country",
  handler: async ({ input, openAI, log }) => {
    const parsed = await openAI.parseUserInput({
      userInput: input.country,
      schema: import_operations2.z.object({
        country: import_operations2.z.string().nonempty()
      })
    });
    const agent = openAI.createAgent({
      functions: [
        { name: "countries/CountryByCode" },
        { name: "weather/GetCityByName" }
      ],
      structuredOutputSchema: import_operations2.z.object({
        city: import_operations2.z.string(),
        country: import_operations2.z.string(),
        temperature: import_operations2.z.number()
      })
    });
    const out = await agent.execWithPrompt({
      prompt: `What's the weather like in fahrenheit in the capital of ${parsed.country}?`,
      debug: true
    });
    return out;
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=weather.cjs.map
