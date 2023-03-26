import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) =>
  axiosClient.get(url + '/comments?page=1&size=5');

export const newComment = (author, post) => {
  return axiosClient.post(post.author.id + '/inbox/', {
    type: 'comment',
    contentType: 'text/plain',
    comment: post.comment,
    author: author.id,
    post: post.id,
  });
};

export const getComment = (commentUrl) => {
  return axiosClient.get(commentUrl);
};
