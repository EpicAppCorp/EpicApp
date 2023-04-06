import { getAxiosInstance } from '@epicapp/libs/axios';

export const getLikes = (url) => getAxiosInstance(url).get(url + '/likes');

export const newLike = (author, item) =>
  getAxiosInstance(item.author.url).post(item.author.url + '/inbox', {
    type: 'like',
    author: author.id,
    object: item.object,
  });

export const getLiked = (authorUrl) =>
  getAxiosInstance(authorUrl).get(authorUrl + '/liked');
