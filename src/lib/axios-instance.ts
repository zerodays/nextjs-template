import env from '@/env';
import Axios, {
  type AxiosResponse,
  type AxiosError,
  type AxiosRequestConfig,
} from 'axios';

export const AXIOS_INSTANCE = Axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
});

// add a second `options` argument here if you want to pass extra options to each generated query
export const customAxios = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T, unknown>> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then((data) => data);

  // @ts-ignore
  promise.cancel = () => {
    source.cancel('Query was cancelled');
  };

  return promise;
};

// In some case with react-query and swr you want to be able to override the return error type so you can also do it here like this
export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
