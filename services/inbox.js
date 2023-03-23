import { axiosClient } from '@epicapp/libs/axios';

export const getInbox = (author) => {
  return axiosClient.get(author.host + 'api/authors/' + author.id + '/inbox');
};

export const sendFollowRequest = (author, body) => {
  return axiosClient.post(
    author.host + '/authors/' + author.id + '/inbox',
    body,
  )
}
