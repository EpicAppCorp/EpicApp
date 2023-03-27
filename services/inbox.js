import { axiosClient } from '@epicapp/libs/axios';

export const getInbox = (author) => {
  return axiosClient.get(
    author?.host
      ? author.id + '/inbox/'
      : process.env.NEXT_PUBLIC_API + '/authors/' + undefined + '/inbox/',
  );
};

export const getItem = (url) => {
  return axiosClient.get(url);
};

export const followRequest = (actor, object) => {
  let url;
  if (object.host === 'https://t20-social-distribution.herokuapp.com') {
    url = object.url + '/inbox';
  } else {
    url = object.url + '/inbox/';
  }
  return axiosClient.post(url, {
    type: 'follow',
    summary: `${actor.displayName} wants to follow ${object.displayName}`,
    actor,
    object,
  });
};
