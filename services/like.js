import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => {
  return axiosClient.get(url + '/likes/');
};

export const newLike = (post) => {
  return axiosClient.post(post.post.split('/posts')[0] + '/inbox/', post);
};

export const getLiked = (authorUrl) => {
  return axiosClient.get(authorUrl + '/liked/');
};
