import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => axiosClient.get(url + '/likes/');

export const newLike = (author, item) =>
  axiosClient.post(item.author.id + '/inbox/', {
    type: 'Like',
    author: author.id,
    object: item.object,
  });

export const getLiked = (authorUrl) => axiosClient.get(authorUrl + '/liked');
