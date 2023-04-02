import { axiosClient } from '@epicapp/libs/axios';

export const getPosts = (author) => {
  return axiosClient.get(author + '/posts?page=1&size=20');
};

export const newPost = (author, post) => {
  return axiosClient.post(author.id + '/posts/', post);
};

export const editPost = (post) => axiosClient.post(post.id, post);

export const deletePost = (postId) => axiosClient.delete(postId);

export const repost = (author, post) => {
  return axiosClient.post(author.id + '/repost/', post);
};
