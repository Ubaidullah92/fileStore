import axios from "axios";

export const axiosClient = axios.create();

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
