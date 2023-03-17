import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Post({ post, author }) {
  const [comments, setComments] = useState();
  const [comment, setComment] = useState('');
  const [likes, setLikes] = useState([]);
  const authorId = author.host + 'api/authors' + author.id;

  useEffect(() => {
    axios.get(post.id + '/comments?page=1&size=1000').then((res) => {
      setComments(res.data);
    });
    axios.get(post.id + '/likes').then((res) => {
      setLikes(res.data);
    });
  }, [post]);

  const CommentSubmit = () => {
    axios
      .post(post.id + '/comments', {
        comment: comment,
        post_id: post.id,
        author: {
          type: 'author',
          id: author.id, // Temporarily hardcoded
          host: author.host,
          displayName: author.displayName,
          url: author.url,
          github: author.github,
          profile_image: author.profile_image,
        },
        author_id: authorId,
      })
      .finally(() => {
        axios.get(post.id + '/comments?page=1&size=1000').then((res) => {
          setComments(res.data);
        });
      });
  };
  const LikePost = () => {
    const inboxEndpoint = post.id.split('/posts')[0] + '/inbox';
    axios
      .post(inboxEndpoint, {
        '@context': 'https://www.w3.org/ns/activitystreams',
        summary: author.displayName + ' liked your post',
        type: 'Like',
        author: {
          type: 'author',
          id: author.id, // Temporarily hardcoded
          host: author.host,
          displayName: author.displayName,
          url: author.url,
          github: author.github,
          profile_image: author.profile_image,
        },
        object: post.id,
      })
      .finally(() => {
        axios.get(post.id + '/likes').then((res) => {
          setLikes(res.data);
        });
      });
  };

  return (
    <div key={post.id} className="m-auto">
      <div className="m-4 text-gray-900 md:text-2xl">{post.title}</div>
      {post.contentType === 'image/jpeg;base64' && (
        <div className="m-4">
          <img
            src={post.content}
            className="w3-left w3-circle w3-margin-right"
            width="400px"
            height="300px"
          />
        </div>
      )}
      {post.contentType === 'text/plain' && (
        <div className="m-4">{post.content}</div>
      )}
      <div className="... mb-4 flex flex-row">
        <div>
          <input
            className="ml-4 mr-2 grow py-2 pl-2"
            placeholder="Comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button
          className="mr-4 rounded-md bg-submitBg px-4 py-1 text-white"
          onClick={CommentSubmit}
        >
          <p className="font-black">→</p>
        </button>
        <button
          className="rounded-md bg-submitBg px-4 py-1 text-white"
          onClick={LikePost}
        >
          <p className="font-black">♥</p>
        </button>
        <div className="m-auto ml-4">Likes: {likes.length}</div>
      </div>
      <div className="m-4">
        <div>Comments:</div>
        {comments?.comments.map((comment) => {
          return (
            <div key={comment.id}>
              {comment.author.displayName}: {comment.comment}
            </div>
          );
        })}
      </div>
    </div>
  );
}
