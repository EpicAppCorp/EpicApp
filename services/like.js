import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => {
  return axiosClient.get(url + '/likes/');
};

export const newLike = (post) => {
  return axiosClient.post(post.object.split('/posts')[0] + '/inbox/', post);
};
