import { getAxiosInstance } from '@epicapp/libs/axios';

export const getLikes = (url) => getAxiosInstance(url).get(url + '/likes');

export const newLike = (author, item) => {
  let body = {
    type: 'like',
    author: author.id,
    object: item.object,
    summary: `${author.displayName} likes ${item.author.displayName}'s ${item.type}`,
  };
  let url = item.author.url;

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
  } else if (!item.author.id.includes('http')) {
    let authorId = item.author.id;
    let postId = item.id;
    url = item.author.url;
    if (item.type === 'comment') {
      authorId = item.post.author.id;
      postId = item.post.id;
      url = item.post.author.url;
    }
    body = {
      type: 'like',
      author: author.id,
      object: `https://t20-social-distribution.herokuapp.com/service/authors/${authorId}/posts/${postId}`,
      summary: `${author.displayName} likes ${item.author.displayName}'s ${item.type}`,
    };
  }

  return getAxiosInstance(url).post(url + '/inbox', body);
};

export const getLiked = (authorUrl) =>
  getAxiosInstance(authorUrl).get(authorUrl + '/liked');
