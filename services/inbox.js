import { axiosClient } from '@epicapp/libs/axios';

export const getInbox = (author) => {
  return axiosClient.get(
    author?.host
      ? author.id + '/inbox/'
      : process.env.NEXT_PUBLIC_API + '/authors/' + undefined + '/inbox/',
  );
};

export const getItem = (url) => {
  return axiosClient.get(url)
}

export const sendFollowRequest = (body) => {
  const url = body.object.url + "/inbox";
  return axiosClient.post(
    url,
    body,
  )
}
