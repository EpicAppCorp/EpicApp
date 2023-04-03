import { axiosClient, getAxiosInstance } from '@epicapp/libs/axios';

export const getInbox = (author) =>
  axiosClient.get(
    author?.host
      ? author.id + '/inbox/'
      : process.env.NEXT_PUBLIC_API + '/authors/' + undefined + '/inbox/',
  );

export const clearInbox = (authorId) =>
  axiosClient.delete(authorId + '/inbox/');

export const getItem = (url) => getAxiosInstance(url).get(url);

export const followRequest = (actor, object) => {
  return axiosClient.post(actor.url + '/followers/' + object.url, {
    actor,
    object,
  });
};
