import { axiosClient } from '@epicapp/libs/axios';

// TODO: is THIS INBOX OR POST???
export const newPost = (author, post) => {
  return axiosClient.post(
    author.host + 'api/authors/' + author.id + '/inbox',
    post,
  );
};
