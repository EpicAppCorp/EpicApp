import { axiosClient } from '@epicapp/libs/axios';

export const getPosts = (author) => {
  return axiosClient.get(author + '/posts/?page=1&size=20');
};

export const newPost = (author, post) => {
  return axiosClient.post(author.id + '/posts/', post);
};

export const deletePost = (author, post) => {
  return axiosClient.delete(post.id)
}