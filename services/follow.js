import { axiosClient } from '@epicapp/libs/axios';

export const getFollowers = (author) =>
  axiosClient.get(author.id + '/followers/');

export const follow = (authorId, foreignAuthorId) =>
  axiosClient.put(authorId + '/followers/' + foreignAuthorId);

export const isFollowing = (authorId, foreignAuthorId) =>
  axiosClient.get(authorId + '/followers/' + foreignAuthorId);

export const unfollow = (authorId, foreignAuthorId) =>
  axiosClient.delete(authorId + '/followers/' + foreignAuthorId);
