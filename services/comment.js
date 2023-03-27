import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) =>
  axiosClient.get(url + '/comments?page=1&size=20');

export const newComment = (author, post) =>
  axiosClient.post(post.author.id + '/inbox/', {
    type: 'comment',
    contentType: 'text/plain',
    comment: post.comment,
    author: author.id,
    post: post.id,
  });

export const getComment = (commentUrl) => axiosClient.get(commentUrl);
