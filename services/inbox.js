import { axiosClient } from '@epicapp/libs/axios';

export const getInbox = (author) => {
  return axiosClient.get(
    author?.host
      ? author.host + 'api/authors/' + author.id + '/inbox'
      : process.env.NEXT_PUBLIC_API + '/authors/' + undefined + '/inbox',
  );
};
