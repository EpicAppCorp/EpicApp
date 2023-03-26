import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) =>
  axiosClient.get(url + '/comments?page=1&size=1000');

export const newComment = (post) =>
  axiosClient.post(post.post + '/comments/', post);
