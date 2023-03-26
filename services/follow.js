import { axiosClient } from '@epicapp/libs/axios';

export const follow = (authorId, foreignAuthorId) => {
  return axiosClient.put(authorId + '/followers/' + foreignAuthorId);
};

export const isFollowing = (authorId, foreignAuthorId) => {
  return axiosClient.get(authorId + '/followers/' + foreignAuthorId);
};

export const unfollow = (author, foreignAuthor) => {
  return axiosClient.delete(author + '/followers/' + foreignAuthor.id);
};

export const getFollowers = (author) => {
  return axiosClient.get(author.id + '/followers/');
};
