import { axiosClient } from '@epicapp/libs/axios';
import axios from 'axios';

export const getLikes = (url) => {
  return axiosClient.get(url + '/likes/');
};

export const newLike = (author, item) => {
  const likedPost = axiosClient.post(author.id + '/liked/', {
    object: item.object,
  });
  const inbox = axiosClient.post(item.author.id + '/inbox/', {
    type: 'Like',
    author: author.id,
    object: item.object,
  });
  return axios.all([likedPost, inbox]);
};

export const getLiked = (authorUrl) => {
  return axiosClient.get(authorUrl + '/liked/');
};
