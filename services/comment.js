import { axiosClient } from '@epicapp/libs/axios';

export const getComments = (url) => {
  return axiosClient.get(url + '/comments?page=1&size=1000');
};
