import { axiosClient } from '@epicapp/libs/axios';

export const getLikes = (url) => {
  return axiosClient.post(url + '/likes');
};
