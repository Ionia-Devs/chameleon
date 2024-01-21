'use strict'
var s = Object.defineProperty
var p = Object.getOwnPropertyDescriptor
var n = Object.getOwnPropertyNames
var a = Object.prototype.hasOwnProperty
var d = (t, e) => {
    for (var i in e) s(t, i, { get: e[i], enumerable: !0 })
  },
  c = (t, e, i, o) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let r of n(e))
        !a.call(t, r) &&
          r !== i &&
          s(t, r, {
            get: () => e[r],
            enumerable: !(o = p(e, r)) || o.enumerable,
          })
    return t
  }
var u = (t) => c(s({}, '__esModule', { value: !0 }), t)
var l = {}
d(l, { default: () => m })
module.exports = u(l)
var y = {
    'countries/CountryByCode': {
      input: {
        type: 'object',
        properties: { code: { type: 'string' } },
        additionalProperties: !1,
        required: ['code'],
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              countries_country: {
                type: 'object',
                properties: {
                  code: { type: 'string' },
                  name: { type: 'string' },
                  currencies: { type: 'array', items: { type: 'string' } },
                  capital: { type: 'string' },
                },
                additionalProperties: !1,
                required: ['code', 'name', 'currencies'],
              },
            },
            additionalProperties: !1,
          },
        },
        additionalProperties: !1,
      },
      operationType: 'QUERY',
      description: '',
    },
    'todos/getAllTodosForCurrentUser': {
      input: {
        type: 'object',
        properties: { userId: { type: 'string' } },
        additionalProperties: !1,
        required: ['userId'],
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              db_findManyTodo: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    text: { type: 'string' },
                    isCompleted: { type: 'boolean' },
                  },
                  additionalProperties: !1,
                  required: ['id', 'text', 'isCompleted'],
                },
              },
            },
            additionalProperties: !1,
            required: ['db_findManyTodo'],
          },
        },
        additionalProperties: !1,
      },
      operationType: 'QUERY',
      description: '',
    },
    'openai/extract-website-metadata': {
      input: {
        type: 'object',
        properties: { url: { type: 'string' } },
        required: ['url'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              h1: { type: 'string' },
              summary: { type: 'string' },
              description: { type: 'string' },
              links: { type: 'array', items: { type: 'string' } },
            },
            required: ['description', 'h1', 'links', 'summary', 'title'],
          },
        },
      },
      operationType: 'QUERY',
      description:
        'Load metadata like title, description, social media images, headlines, and summary from a website',
    },
    'openai/load-url': {
      input: {
        type: 'object',
        properties: { url: { type: 'string' } },
        required: ['url'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: { content: { type: 'string' } },
            required: ['content'],
          },
        },
      },
      operationType: 'QUERY',
      description: 'Load the content of a url',
    },
    'openai/summarize-url-content': {
      input: {
        type: 'object',
        properties: { url: { type: 'string' } },
        required: ['url'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: { summary: { type: 'string' } },
            required: ['summary'],
          },
        },
      },
      operationType: 'QUERY',
      description: 'Summarize the content of a URL',
    },
    'openai/summary': {
      input: {
        type: 'object',
        properties: { url: { type: 'string' } },
        required: ['url'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: { summary: { type: 'string' } },
            required: ['summary'],
          },
        },
      },
      operationType: 'QUERY',
      description: 'Summarize the content of a URL',
    },
    'openai/weather': {
      input: {
        type: 'object',
        properties: { country: { type: 'string' } },
        required: ['country'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              structuredOutput: {
                $ref: '#/definitions/{country:string;city:string;temperature:number;}',
              },
              messages: {
                type: 'array',
                items: { $ref: '#/definitions/ChatCompletionRequestMessage' },
              },
            },
            required: ['messages', 'structuredOutput'],
            definitions: {
              '{country:string;city:string;temperature:number;}': {
                type: 'object',
                properties: {
                  country: { type: 'string' },
                  city: { type: 'string' },
                  temperature: { type: 'number' },
                },
                required: ['city', 'country', 'temperature'],
              },
              ChatCompletionRequestMessage: {
                type: 'object',
                properties: {
                  role: {
                    description:
                      'The role of the messages author. One of `system`, `user`, `assistant`, or `function`.',
                    type: '{string}',
                  },
                  content: {
                    description:
                      'The contents of the message. `content` is required for all messages except assistant messages with function calls.',
                    type: '{string}',
                  },
                  name: {
                    description:
                      'The name of the author of this message. `name` is required if role is `function`, and it should be the name of the function whose response is in the `content`. May contain a-z, A-Z, 0-9, and underscores, with a maximum length of 64 characters.',
                    type: '{string}',
                  },
                  function_call: {
                    type: '{ChatCompletionRequestMessageFunctionCall}',
                  },
                },
                required: ['role'],
              },
            },
          },
        },
      },
      operationType: 'QUERY',
      description:
        'This operation returns the weather of the capital of the given country',
    },
    'users/get': {
      input: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string', default: 'Jens' },
              bio: { type: 'string', default: 'Founder of WunderGraph' },
            },
            required: ['bio', 'id', 'name'],
          },
        },
      },
      operationType: 'QUERY',
      description: 'generated/bundle/operations/users/get',
    },
    'todos/addTodo': {
      input: {
        type: 'object',
        properties: { text: { type: 'string' }, userId: { type: 'string' } },
        additionalProperties: !1,
        required: ['text', 'userId'],
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              db_createOneTodo: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  text: { type: 'string' },
                  user: {
                    type: 'object',
                    properties: {
                      id: { type: 'string' },
                      name: { type: 'string' },
                    },
                    additionalProperties: !1,
                    required: ['id'],
                  },
                },
                additionalProperties: !1,
                required: ['id', 'text', 'user'],
              },
            },
            additionalProperties: !1,
          },
        },
        additionalProperties: !1,
      },
      operationType: 'MUTATION',
      description: '',
    },
    'todos/updateTodo': {
      input: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          text: { type: 'string' },
          isCompleted: { type: 'boolean' },
        },
        additionalProperties: !1,
        required: ['id', 'text', 'isCompleted'],
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              db_updateOneTodo: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  text: { type: 'string' },
                  isCompleted: { type: 'boolean' },
                },
                additionalProperties: !1,
                required: ['id', 'text', 'isCompleted'],
              },
            },
            additionalProperties: !1,
          },
        },
        additionalProperties: !1,
      },
      operationType: 'MUTATION',
      description: '',
    },
    'users/update': {
      input: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          bio: { type: 'string' },
        },
        required: ['id', 'name', 'bio'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              id: { type: 'string' },
              bio: { type: 'string' },
            },
            required: ['bio', 'id', 'name'],
          },
        },
      },
      operationType: 'MUTATION',
      description: 'generated/bundle/operations/users/update',
    },
    'users/subscribe': {
      input: {
        type: 'object',
        properties: { id: { type: 'string' } },
        required: ['id'],
        additionalProperties: !1,
        $schema: 'http://json-schema.org/draft-07/schema#',
      },
      response: {
        type: 'object',
        properties: {
          data: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              name: { type: 'string', default: 'Jens' },
              bio: { type: 'string', default: 'Founder of WunderGraph' },
              time: { type: 'string' },
            },
            required: ['bio', 'id', 'name', 'time'],
          },
        },
      },
      operationType: 'SUBSCRIPTION',
      description: 'generated/bundle/operations/users/subscribe',
    },
  },
  m = y
0 && (module.exports = {})
//# sourceMappingURL=jsonschema.cjs.map
