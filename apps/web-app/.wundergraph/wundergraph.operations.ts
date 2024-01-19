import { configureWunderGraphOperations } from "@wundergraph/sdk"

import type { OperationsConfiguration } from "./generated/wundergraph.operations"

export default configureWunderGraphOperations<OperationsConfiguration>({
  operations: {
    defaultConfig: {
      authentication: {
        required: false,
      },
    },
    queries: (config) => ({
      ...config,
      caching: {
        enable: false,
        staleWhileRevalidate: 5,
        maxAge: 10,
        public: true,
      },
      liveQuery: {
        enable: true,
        pollingIntervalSeconds: 1,
      },
    }),
    mutations: (config) => ({
      ...config,
    }),
    subscriptions: (config) => ({
      ...config,
    }),
    custom: {},
  },
})
