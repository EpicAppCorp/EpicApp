import { axiosClient } from '@epicapp/libs/axios';

export const getInbox = (author) => {
  return axiosClient.get(author.host + 'api/authors/' + author.id + '/inbox');
};
