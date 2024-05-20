import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

const httpService = axios.create({
  baseURL: 'https://testapi-v1.onrender.com/api/feeds/',
});

httpService.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    if (config.data instanceof FormData) {
      config.headers['Content-Type'] = 'multipart/form-data';

      return config;
    } else {
      config.headers!['Content-Type'] = 'application/json';

      return config;
    }
  },
);

httpService.interceptors.response.use(
  (response: AxiosResponse<any, any>) => {
    return response;
  },
  async (error: AxiosError<any, any>) => {
    if (!error.response) {
      return Promise.reject(error.message);
    } else {
      return Promise.reject(error.response.data);
    }
  },
);

export default httpService;
