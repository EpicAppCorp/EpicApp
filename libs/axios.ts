import axios from 'axios';
import Cookies from 'js-cookie';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  withCredentials: true,
  headers: {
    Authorization: Cookies.get('access') ?? '',
  },
});
