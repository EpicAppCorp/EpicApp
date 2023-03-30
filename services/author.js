import { axiosClient } from '@epicapp/libs/axios';

export const getAuthorDetails = (id) => {
  if (!id || id.includes(process.env.NEXT_PUBLIC_API))
    return axiosClient.get('/auth/details/');
  return axiosClient.get(id + '/');
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

export const getAuthorById = (authorId) => {
  return axiosClient.get('/authors/' + authorId);
};

export const getAllAuthors = () => {
  return axiosClient.get(process.env.NEXT_PUBLIC_API + '/friends/');
};
