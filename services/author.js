import { axiosClient, getAxiosInstance } from '@epicapp/libs/axios';
import axios from 'axios';

export const getAuthorDetails = (id) => {
  if (!id) return axiosClient.get('/auth/details');
  return getAxiosInstance(id).get(id);
};

export const logoutAuthor = () => axiosClient.post('/auth/logout/');

export const authenticateAuthor = (body) =>
  axiosClient.post('/auth/authenticate/', body);

export const createAuthor = (body) => axiosClient.post('/auth/register/', body);

export const getAllAuthors = () =>
  axiosClient.get(process.env.NEXT_PUBLIC_API + '/friends/');

export const getAuthorGithub = async (username) => {
  return axios.get('https://api.github.com/users/' + username + '/events');
};

export const updateAuthor = async (author) =>
  axiosClient.put(process.env.NEXT_PUBLIC_API + '/auth/details', author);
