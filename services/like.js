import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => {
  return axiosClient.get(url + '/likes/');
};

export const newLike = (author, post) => {
  return axiosClient.post(post.author.id + '/inbox/', {
    type: 'Like',
    author: author.id,
    object: post.id,
  });
};

export const getLiked = (authorUrl) => {
  return axiosClient.get(authorUrl + '/liked/');
};
