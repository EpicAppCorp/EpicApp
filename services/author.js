import { axiosClient } from '@epicapp/libs/axios';
import axios from 'axios';

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

export const getAuthorById = (authorId) => {
  return axiosClient.get('/authors/' + authorId);
};

export const getAllAuthors = () => {
  return axiosClient.get(process.env.NEXT_PUBLIC_API + '/friends/');
};

export const getAuthorGithub = async (username) => {
  return axios.get("https://api.github.com/users/" + username + "/events");
}