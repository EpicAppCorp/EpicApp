import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) =>
  axiosClient.get(url + '/comments?page=1&size=1000');

export const newComment = (post) => {
  if (post.author.id.includes(process.env.NEXT_PUBLIC_API)) {
    return axiosClient.post(post.post_id + '/comments/', post);
  }
  return axiosClient.post(post.author.id + '/inbox', post);
};
