/* eslint-disable no-param-reassign */
import axios from "axios";

const instance = axios.create({
  timeout: 10000,
  params: {}, // do not remove this, its added to add params later in the config
});

// Store requests
const sourceRequest = {};

// Add a request interceptor
instance.interceptors.request.use(
  async (request) => {
    // If the application exists cancel
    if (sourceRequest[request.url]) {
      sourceRequest[request.url].cancel("Previous same call cancellation");
    }

    // Store or update application token
    const axiosSource = axios.CancelToken.source();
    sourceRequest[request.url] = { cancel: axiosSource.cancel };
    request.cancelToken = axiosSource.token;

    return request;
  },
  (error) => Promise.reject(error)
);

const ApiService = {
  request(config = {}) {
    return instance.request(config);
  },
  getData(url, config = {}) {
    return instance.get(url, config);
  },
  postData(url, data, config) {
    return instance.post(url, data, config);
  },
  putData(url, data, config) {
    return instance.put(url, data, config);
  },
  patchData(url, data) {
    return instance.patch(url, data);
  },
  deleteData(url, config = {}) {
    return instance.delete(url, config);
  },
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error)
);

export default ApiService;
