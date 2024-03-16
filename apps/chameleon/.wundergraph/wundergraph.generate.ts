import { NextJsTemplate } from '@wundergraph/nextjs/dist/template'
import { configureWunderGraphGeneration } from '@wundergraph/sdk'

export default configureWunderGraphGeneration({
  codeGenerators: [
    {
      templates: [new NextJsTemplate()],
      path: '../lib/wundergraph/generated',
    },
  ],
  operationsGenerator: (config) => {
    config.includeNamespaces('')
  },
})
