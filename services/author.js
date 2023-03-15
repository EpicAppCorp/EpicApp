import { axiosClient } from '@epicapp/libs/axios';

export const getAuthorDetails = () => {
  return axiosClient.get('/author/details/');
};

export const logoutAuthor = () => {
  return axiosClient.post('/auth/logout/');
};
