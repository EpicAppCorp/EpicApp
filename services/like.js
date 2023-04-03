import { getAxiosInstance } from '@epicapp/libs/axios';

export const getLikes = (url) => getAxiosInstance(url).get(url + '/likes');

export const newLike = (author, item) =>
  getAxiosInstance(item.author.id).post(item.author.id + '/inbox/', {
    type: 'Like',
    author: author.id,
    object: item.object,
  });

export const getLiked = (authorUrl) =>
  getAxiosInstance(authorUrl).get(authorUrl + '/liked');
