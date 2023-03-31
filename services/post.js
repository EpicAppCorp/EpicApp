import { axiosClient } from '@epicapp/libs/axios';

export const getPosts = (author) => {
  return axiosClient.get(author + '/posts?page=1&size=20');
};

export const newPost = (author, post) => {
  return axiosClient.post(author.id + '/posts/', post);
};

export const editPosts = (author, post) => {
  console.log("Post: ", post)
  return axiosClient.post(post.id + '/', post);
};

export const deletePost = (author, post) => {
  return axiosClient.delete(post.id);
};