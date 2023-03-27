import { axiosClient } from '@epicapp/libs/axios';

export const newPost = (author, post) => {
  return axiosClient.post(author.id + '/posts/', post);
};

export const getPosts = (author) => {
  return axiosClient.get(author.host + 'api/authors/' + author.id + '/posts');
};
