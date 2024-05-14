import { ZodiosPlugin } from '@zodios/core';
import { AxiosError } from 'axios';

const SKIP_ERROR_HANDLING_URLS = [''];
const SKIP_SUCCESS_HANDLING_URLS = [''];

const customPlugin: ZodiosPlugin = {
  name: 'customPlugin',
  error: async (api, config, err) => {
    if (SKIP_ERROR_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping error handling for', config.url);
      throw err;
    }

    if (err instanceof AxiosError) {
      console.log(
        'Zodios API Error',
        err.response?.data?.message || 'An error occurred',
      );
    }

    throw err;
  },
  response: async (api, config, response) => {
    if (SKIP_SUCCESS_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping success handling for', config.url);
      return response;
    }

    // Skip handling GET requests
    if (config.method?.toUpperCase() === 'GET') {
      return response;
    }

    const getMessage = () => {
      let message = '';
      switch (config.method?.toUpperCase()) {
        case 'GET':
          message = 'Fetched successfully';
          break;
        case 'POST':
          message = 'Created successfully';
          break;
        case 'PUT':
          message = 'Updated successfully';
          break;
        case 'DELETE':
          message = 'Deleted successfully';
          break;
      }

      return message;
    };

    if (response.status >= 200 && response.status < 300) {
      console.log('Zodios API Success', getMessage());
    }

    return response;
  },
};

export default customPlugin;
