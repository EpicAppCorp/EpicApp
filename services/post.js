import { axiosClient } from '@epicapp/libs/axios';

export const newPost = (author, post) => {
  return axiosClient.post(author.id + '/posts/', post);
};
