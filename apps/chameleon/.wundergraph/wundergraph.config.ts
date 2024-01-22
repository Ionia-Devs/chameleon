import {
  EnvironmentVariable,
  configureWunderGraphApplication,
  cors,
  introspect,
} from '@wundergraph/sdk'

import generate from './wundergraph.generate'
import operations from './wundergraph.operations'
import server from './wundergraph.server'

const countries = introspect.graphql({
  apiNamespace: 'countries',
  url: 'https://countries.trevorblades.com/',
})

const weather = introspect.graphql({
  id: 'weather',
  apiNamespace: 'weather',
  url: 'https://weather-api.wundergraph.com/',
  introspection: {
    pollingIntervalSeconds: 5,
  },
})

const db = introspect.prisma({
  apiNamespace: 'db',
  prismaFilePath: '../../../data-access/db/prisma/schema.prisma',
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
      process.env.NODE_ENV === 'production'
        ? [
            new EnvironmentVariable('NEXTAUTH_URL'),
            new EnvironmentVariable('VERCEL_URL'),
            'https://www.chameleon.com',
            'https://chameleon-sandy.vercel.app/',
            'https://chameleon-production.up.railway.app/',
          ]
        : ['http://localhost:3000'],
  },
  security: {
    enableGraphQLEndpoint:
      process.env.NODE_ENV !== 'production' ||
      process.env.GITPOD_WORKSPACE_ID !== undefined,
  },
})
