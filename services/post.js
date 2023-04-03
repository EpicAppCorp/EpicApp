import { axiosClient, getAxiosInstance } from '@epicapp/libs/axios';

export const getPosts = (author) => {
  return getAxiosInstance(author).get(author + '/posts?page=1&size=20');
};

export const newPost = (author, post) => {
  return getAxiosInstance(author.id).post(author.id + '/posts/', post);
};

export const editPost = (post) => axiosClient.post(post.id, post);

export const deletePost = (postId) => axiosClient.delete(postId);

export const repost = (author, post) => {
  return axiosClient.post(author.id + '/repost/', post);
};
