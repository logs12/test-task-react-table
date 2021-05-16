import axios from "axios";
import qs from "qs";

const paramsSerializer = (params) =>
  qs.stringify(params, { arrayFormat: "repeat" });

const API: AxiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 480000,
  paramsSerializer,
});

const pending = {};
const { CancelToken } = axios;
const removePending = (config, cancelRequest) => {
  const url = config?.url?.replace(config.baseURL, "/");
  const flagUrl = `${url}&${config?.method}`;

  if (flagUrl in pending) {
    if (cancelRequest) {
      pending[flagUrl]("Operation cancelled by interceptor.");
    }

    delete pending[flagUrl];
  }

  if (cancelRequest) {
    pending[flagUrl] = cancelRequest;
  }
};

API.interceptors.request.use(
  (config) => {
    // eslint-disable-next-line no-param-reassign
    config.cancelToken = new CancelToken((c) => {
      removePending(config, c);
    });

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    removePending(response.config);
    return response;
  },
  (error) => {
    removePending(error.config);
    return Promise.reject(error);
  }
);

export const setCommonHeader = (name, value) => {
  API.defaults.headers.common[name] = value;
};

export const deleteCommonHeader = (name) => {
  delete API.defaults.headers.common[name];
};

export default API;
