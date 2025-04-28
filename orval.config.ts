import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'split',
      target: 'src/api/endpoints.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      clean: true,
      mock: true,
      biome: true,
      override: {
        mutator: {
          path: './src/lib/axios-instance.ts',
          name: 'customAxios',
        },
      },
    },
    input: {
      // This will get overridden by /scripts/generate-api.ts
      target: './placeholder.yaml',
    },
  },
});
