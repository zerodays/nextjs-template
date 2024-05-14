import jokesApi from '@/zodios/example';
import zodiosToastPlugin from '@/zodios/toast-plugin';
import { Zodios } from '@zodios/core';
import { ZodiosHooks } from '@zodios/react';

// Example API url
const API_URL = 'https://official-joke-api.appspot.com';

// Zodios API client
const apiClient = new Zodios(API_URL, [...jokesApi]);

apiClient.use(zodiosToastPlugin);
const api = new ZodiosHooks('jokesApi', apiClient);

export { api, apiClient };
