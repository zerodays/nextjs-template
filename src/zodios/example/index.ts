import { apiBuilder } from '@zodios/core';
import { z } from 'zod';

// Endpoints for Example API - Example Endpoints.
const jokesApi = apiBuilder({
  method: 'get',
  path: '/random_joke',
  alias: 'getRandomJoke',
  description: 'Get a random joke',
  response: z.object({
    id: z.number(),
    type: z.string(),
    setup: z.string(),
    punchline: z.string(),
  }),
  errors: [{ status: 'default', schema: z.object({ message: z.string() }) }],
})
  .addEndpoint({
    method: 'get',
    path: '/jokes/:type/random',
    description: 'Get a random joke by type',
    alias: 'getRandomJokeByType',
    response: z.array(
      z.object({
        id: z.number(),
        type: z.string(),
        setup: z.string(),
        punchline: z.string(),
      }),
    ),
    parameters: [
      {
        name: 'type',
        type: 'Path',
        schema: z.string(),
      },
    ],
    errors: [{ status: 'default', schema: z.object({ message: z.string() }) }],
  })
  // Just an example of how to add an endpoint with a body parameter
  .addEndpoint({
    method: 'post',
    path: '/example/:exampleId',
    description: 'Add example',
    alias: 'addExample',
    response: z.object({}),
    parameters: [
      {
        name: 'exampleId',
        type: 'Path',
        schema: z.string(),
      },
      {
        name: 'body',
        type: 'Body',
        schema: z.object({
          name: z.string(),
        }),
      },
    ],
    errors: [{ status: 'default', schema: z.object({ message: z.string() }) }],
  })
  .build();

export default jokesApi;
