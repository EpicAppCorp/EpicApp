import { axiosClient } from '@epicapp/libs/axios';

export const getAuthorDetails = () => {
  return axiosClient.get('/auth/details/');
};

export const logoutAuthor = () => {
  return axiosClient.post('/auth/logout/');
};

export const authenticateAuthor = (body) => {
  return axiosClient.post('/auth/authenticate/', body);
};

export const createAuthor = (body) => {
  return axiosClient.post('/auth/register/', body);
};
