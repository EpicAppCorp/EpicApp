import { axiosClient } from '@epicapp/libs/axios';

export const getPosts = (author) => {
  return axiosClient.get(author.host + 'api/authors/' + author.id + '/posts');
};
