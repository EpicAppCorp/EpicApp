import { axiosClient } from '@epicapp/libs/axios';

export const newPost = (author, post) => {
  return axiosClient.post(
    author.host + 'api/authors/' + author.id + '/posts',
    post,
  );
};
