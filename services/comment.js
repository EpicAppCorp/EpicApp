import { getAxiosInstance } from '@epicapp/libs/axios';

export const getComments = (url) =>
  getAxiosInstance(url).get(url + '/comments?page=1&size=20');

export const newComment = (author, post) =>
  getAxiosInstance(post.author.id).post(post.author.id + '/inbox/', {
    type: 'comment',
    contentType: 'text/plain',
    comment: post.comment,
    author: author.id,
    post: post.id,
  });
