// .wundergraph/operations/openai/weather.ts
import { createOperation, z } from "../../generated/wundergraph.factory"

export default createOperation.query({
  input: z.object({
    country: z.string(),
  }),
  description:
    "This operation returns the weather of the capital of the given country",
  handler: async ({ input, openAI, log }) => {
    const parsed = await openAI.parseUserInput({
      userInput: input.country,
      schema: z.object({
        country: z.string().nonempty(),
      }),
    })

    const agent = openAI.createAgent({
      functions: [
        { name: "countries/CountryByCode" },
        { name: "weather/GetCityByName" },
      ],
      structuredOutputSchema: z.object({
        city: z.string(),
        country: z.string(),
        temperature: z.number(),
      }),
    })

    const out = await agent.execWithPrompt({
      prompt: `What's the weather like in fahrenheit in the capital of ${parsed.country}?`,
      debug: true,
    })

    return out
  },
})
