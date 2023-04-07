import { getAxiosInstance } from '@epicapp/libs/axios';

export const getLikes = (url) => getAxiosInstance(url).get(url + '/likes');

export const newLike = (author, item) => {
  let body = {
    type: 'like',
    author: author.id,
    object: item.object,
    summary: `${author.displayName} likes ${item.author.displayName}'s ${item.type}`,
  };

  if (item.author.url.includes('social-distribution-media')) {
    body = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      summary: `${author.displayName} likes your post!`,
      type: 'like',
      author: author,
      object: {
        type: 'like',
        author: item.author,
        object: item.object,
        summary: `${author.displayName} likes ${item.author.displayName}'s ${item.type}`,
      },
    };
  }
  return getAxiosInstance(item.author.url).post(
    item.author.url + '/inbox',
    body,
  );
};

export const getLiked = (authorUrl) =>
  getAxiosInstance(authorUrl).get(authorUrl + '/liked');
