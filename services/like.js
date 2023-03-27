import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => {
  return axiosClient.get(url + '/likes/');
};

export const newLike = (author, post) => {
  const likedPost = axiosClient.post(author.id + '/liked/', {
    object: post.id,
  });
  const inbox = axiosClient.post(post.author.id + '/inbox/', {
    type: 'Like',
    author: author.id,
    object: post.object,
  });
  return axiosClient.all([likedPost, inbox]);
};

export const getLiked = (authorUrl) => {
  return axiosClient.get(authorUrl + '/liked/');
};
