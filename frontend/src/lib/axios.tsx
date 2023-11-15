import axios, { AxiosInstance, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL as string,
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
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', error.response.data);
      console.error('Status Code:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Request Error:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error:', error.message);
    }

    // Return the error so that it can be further handled in the calling code
    return Promise.reject(error);
  }
);

export default instance;
