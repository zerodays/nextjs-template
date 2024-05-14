import { ZodiosPlugin } from '@zodios/core';
import { AxiosError } from 'axios';
import { toast } from 'sonner';

const SKIP_ERROR_HANDLING_URLS = [''];
const SKIP_SUCCESS_HANDLING_URLS = [''];

const zodiosToastPlugin: ZodiosPlugin = {
  name: 'zodiosToastPlugin',
  error: async (api, config, err) => {
    if (SKIP_ERROR_HANDLING_URLS.includes(config.url)) {
      console.log('Skipping error handling for', config.url);
      throw err;
    }

    if (err instanceof AxiosError) {
      toast('Zodios API Error', {
        description: err.response?.data?.message || 'An error occurred',
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Dismiss'),
        },
      });
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
      toast(getMessage(), {
        action: {
          label: 'Dismiss',
          onClick: () => console.log('Dismiss'),
        },
      });
    }

    return response;
  },
};

export default zodiosToastPlugin;
