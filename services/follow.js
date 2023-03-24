import { axiosClient } from '@epicapp/libs/axios';

export const acceptFollower = (author, foreignAuthor) => {
    return axiosClient.put(author.host + 'api/authors/' + author.id + '/followers/' + foreignAuthor.id);
  };

export const unFollow = (author, foreignAuthor) => {
    return axiosClient.delete(author.host + 'api/authors/' + author.id + '/followers/' + foreignAuthor.id);
};

export const getFollowers = (author) => {
  return axiosClient.get(author.host + 'api/authors/' + author.id + '/followers/');
}