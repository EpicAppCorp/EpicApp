import { axiosClient } from '@epicapp/libs/axios';

export const follow = (author, foreignAuthor) => {
  return axiosClient.put(author.id + '/followers/' + foreignAuthor.id);
};

export const unfollow = (author, foreignAuthor) => {
  return axiosClient.delete(author.id + '/followers/' + foreignAuthor.id);
};
