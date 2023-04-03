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

const teamTwo = axios.create({
  baseURL: 'https://social-distribution-media.herokuapp.com/api',
  timeout: 10000,
  headers: {
    Authorization: 'Basic R3JvdXAxM1VzZXI6bTEjZGVsZnA3Mlde',
  },
});

const teamSix = axios.create({
  baseURL: 'https://cmput404-group6-instatonne.herokuapp.com',
  timeout: 10000,
  headers: {
    Authorization: 'Basic R3JvdXAxM1VzZXI6Z3JvdXAxM2dyb3VwMTM=',
  },
});

const teamTwenty = axios.create({
  baseURL: 'https://t20-social-distribution.herokuapp.com/service',
  timeout: 10000,
  headers: {
    Authorization: 'token',
  },
});

export const axiosMap = {
  [process.env.NEXT_PUBLIC_API]: axiosClient,
  'https://social-distribution-media.herokuapp.com/api': teamTwo,
  'https://t20-social-distribution.herokuapp.com/service': teamTwenty,
  'https://cmput404-group6-instatonne.herokuapp.com': teamSix,
};

export const getAxiosInstance = (url: any) =>
  axiosMap[url.split('/authors/')[0]];
