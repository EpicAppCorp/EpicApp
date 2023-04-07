import { getAxiosInstance } from '@epicapp/libs/axios';
import { v4 as uuidv4 } from 'uuid';

export const getComments = (url) =>
  getAxiosInstance(url).get(url + '/comments?page=1&size=20');

export const newComment = (author, post) => {
  let body = {
    type: 'comment',
    contentType: 'text/plain',
    comment: post.comment,
    author: author.id,
    post: post.id,
  };

  if (post.author.url.includes('social-distribution-media')) {
    body = {
      '@context': 'https://www.w3.org/ns/activitystreams',
      summary: `${author.displayName} commented on your post!`,
      type: 'comment',
      actor: author,
      object: {
        id: `${post.id}/comments/${uuidv4()}`,
        type: 'comment',
        author: post.author, // this group did not do this right :/
        object: post.id,
        contentType: 'text/plain',
        comment: post.comment,
      },
    };
  }

  return getAxiosInstance(post.author.url).post(
    post.author.url + '/inbox',
    body,
  );
};
