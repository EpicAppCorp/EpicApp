import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 1000000,
  withCredentials: true,
});
