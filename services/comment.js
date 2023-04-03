import { getAxiosInstance } from '@epicapp/libs/axios';

export const getComments = (url) =>
  getAxiosInstance(url).get(url + '/comments?page=1&size=20');

export const newComment = (author, post) =>
  getAxiosInstance(post.author.url).post(post.author.url + '/inbox/', {
    type: 'comment',
    contentType: 'text/plain',
    comment: post.comment,
    author: author.id,
    post: post.id,
  });
