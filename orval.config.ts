import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'split',
      target: 'src/api/endpoints.ts',
      schemas: 'src/api/model',
      client: 'react-query',
      mock: true,
      biome: true,
    },
    input: {
      // This will get overridden by /scripts/generate-api.ts
      target: './placeholder.yaml',
    },
  },
});
