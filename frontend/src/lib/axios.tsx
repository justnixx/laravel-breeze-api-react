import axios, { AxiosInstance, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
  withXSRFToken: true,
  withCredentials: true,
});

// Add a response interceptor
instance.interceptors.response.use(
  (response) => {
    // If the request was successful, return the response
    return response;
  },
  (error: AxiosError) => {
    // If there's an error in the response, handle it here
    throw error;
  }
);

export default instance;
