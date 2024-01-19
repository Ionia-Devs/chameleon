import {
  EnvironmentVariable,
  configureWunderGraphApplication,
  cors,
  introspect,
} from "@wundergraph/sdk"

import generate from "./wundergraph.generate"
import operations from "./wundergraph.operations"
import server from "./wundergraph.server"

const countries = introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/",
})

const weather = introspect.graphql({
  id: "weather",
  apiNamespace: "weather",
  url: "https://weather-api.wundergraph.com/",
  introspection: {
    pollingIntervalSeconds: 5,
  },
})

const db = introspect.prisma({
  apiNamespace: "db",
  prismaFilePath: "../../../data-access/db/prisma/schema.prisma",
})

// configureWunderGraph emits the configuration
configureWunderGraphApplication({
  apis: [countries, db, weather],
  server,
  operations,
  generate,
  cors: {
    ...cors.allowAll,
    allowedOrigins:
      process.env.NODE_ENV === "production"
        ? [
            // change this before deploying to production to the actual domain where you're deploying your app
            new EnvironmentVariable("NEXTAUTH_URL"),
            "https://www.chameleon.com",
            "https://chameleon-production.up.railway.app/",
          ]
        : [
            "http://localhost:3000",
            new EnvironmentVariable("WG_ALLOWED_ORIGIN"),
          ],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== "production" ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
})
