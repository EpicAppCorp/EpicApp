import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) =>
  axiosClient.get(url + '/comments?page=1&size=1000');

export const newComment = (post) => {
  if (post.post.includes(process.env.NEXT_PUBLIC_API)) {
    return axiosClient.post(post.post + '/comments/', post);
  }
  return axiosClient.post(post.author + '/inbox', post);
};
