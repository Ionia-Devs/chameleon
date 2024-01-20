"use strict";

// wundergraph.config.ts
var import_sdk3 = require("@wundergraph/sdk");

// wundergraph.generate.ts
var import_sdk = require("@wundergraph/sdk");
var wundergraph_generate_default = (0, import_sdk.configureWunderGraphGeneration)({
  codeGenerators: [],
  operationsGenerator: (config) => {
    config.includeNamespaces("");
  }
});

// wundergraph.operations.ts
var import_sdk2 = require("@wundergraph/sdk");
var wundergraph_operations_default = (0, import_sdk2.configureWunderGraphOperations)({
  operations: {
    defaultConfig: {
      authentication: {
        required: false
      }
    },
    queries: (config) => ({
      ...config,
      caching: {
        enable: false,
        staleWhileRevalidate: 5,
        maxAge: 10,
        public: true
      },
      liveQuery: {
        enable: true,
        pollingIntervalSeconds: 1
      }
    }),
    mutations: (config) => ({
      ...config
    }),
    subscriptions: (config) => ({
      ...config
    }),
    custom: {}
  }
});

// wundergraph.server.ts
var import_server = require("@wundergraph/sdk/server");
var wundergraph_server_default = (0, import_server.configureWunderGraphServer)(() => ({
  hooks: {
    queries: {
      Countries: {
        preResolve: async ({ operations }) => {
        }
      }
    },
    mutations: {}
  }
}));

// wundergraph.config.ts
var countries = import_sdk3.introspect.graphql({
  apiNamespace: "countries",
  url: "https://countries.trevorblades.com/"
});
var weather = import_sdk3.introspect.graphql({
  id: "weather",
  apiNamespace: "weather",
  url: "https://weather-api.wundergraph.com/",
  introspection: {
    pollingIntervalSeconds: 5
  }
});
var db = import_sdk3.introspect.prisma({
  apiNamespace: "db",
  prismaFilePath: "../../../data-access/db/prisma/schema.prisma"
});
(0, import_sdk3.configureWunderGraphApplication)({
  apis: [countries, db, weather],
  server: wundergraph_server_default,
  operations: wundergraph_operations_default,
  generate: wundergraph_generate_default,
  cors: {
    ...import_sdk3.cors.allowAll,
    allowedOrigins: process.env.NODE_ENV === "production" ? [
      new import_sdk3.EnvironmentVariable("NEXTAUTH_URL"),
      "https://www.chameleon.com",
      "https://chameleon-production.up.railway.app/"
    ] : [
      "http://localhost:3000",
      new import_sdk3.EnvironmentVariable("WG_ALLOWED_ORIGIN")
    ]
  },
  security: {
    enableGraphQLEndpoint: process.env.NODE_ENV !== "production" || process.env.GITPOD_WORKSPACE_ID !== void 0
  }
});
//# sourceMappingURL=config.cjs.map
