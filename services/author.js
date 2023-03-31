import { axiosClient } from '@epicapp/libs/axios';

export const getAuthorDetails = (id) => {
  if (!id) return axiosClient.get('/auth/details/');
  return axiosClient.get(id);
};

export const logoutAuthor = () => axiosClient.post('/auth/logout/');

export const authenticateAuthor = (body) =>
  axiosClient.post('/auth/authenticate/', body);

export const createAuthor = (body) => axiosClient.post('/auth/register/', body);

export const getAuthorById = (authorId) =>
  axiosClient.get('/authors/' + authorId);

export const getAllAuthors = () =>
  axiosClient.get(process.env.NEXT_PUBLIC_API + '/friends/');
