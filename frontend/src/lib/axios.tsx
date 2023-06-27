import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL_LOCAL as string,
  withCredentials: true
});

export default instance;
