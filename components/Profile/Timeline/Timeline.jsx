import { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';

//components
import Post from '@epicapp/components/Home/Stream/Post';
import Button from '@epicapp/components/Button';

//services
import { getPosts } from '@epicapp/services/post';
import { getLiked } from '@epicapp/services/like';

export default function Timeline({ auth, author }) {
  const [filter, setFilter] = useState('POSTS');

  // author profile likes
  const liked = useQuery(['liked', author?.id], () => getLiked(author.id), {
    enabled: filter === 'LIKES',
    staleTime: 10000,
  });

  //logged in user likes
  const authLiked = useQuery(['liked', auth.id], () => getLiked(auth.id), {
    staleTime: 10000,
  });

  const posts = useQuery(['posts', author?.id], () => getPosts(author.id), {
    retry: 1,
    staleTime: 10000,
    enabled: !!author,
  });

  //TODO: idk, might just fetch all public posts if not logged in?
  if (!author) return null;

  //loading animation
  if (posts.isLoading)
    return (
      <div className="flex h-full items-center justify-center py-8 text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );

  // if no items
  if (!posts?.data?.data?.items?.length)
    return (
      <p className="py-8 text-center text-sm text-textAlt">
        This author hasn't created any public posts yet... or its all private...
        or maybe they just don't like ya.
      </p>
    );

  return (
    <div className="mt-6 flex flex-col gap-6">
      <ul className="flex justify-center gap-6 text-textAlt">
        <li>
          <Button
            onClick={() => setFilter('POSTS')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-3 py-1 transition-colors duration-150',
              filter === 'POSTS' ? 'bg-primary text-black' : 'bg-layer ',
            )}
          >
            <i className="fa-regular fa-square-dashed" /> Posts
          </Button>
        </li>
        <li>
          <Button
            onClick={() => setFilter('LIKES')}
            className={clsx(
              'flex items-center gap-2 rounded-xl px-3 py-1 transition-colors duration-150',
              filter === 'LIKES' ? 'bg-primary text-black' : 'bg-layer ',
            )}
          >
            <i className="fa-solid fa-heart" /> Likes
          </Button>
        </li>
      </ul>
      {filter === 'POSTS' &&
        posts?.data?.data?.items
          .filter(({ type }) => type === 'post')
          .map((item) => (
            <Post
              key={item.id}
              post={item}
              author={auth}
              liked={authLiked.data?.data?.items.map((like) => like.object)}
            />
          ))}
      {filter === 'LIKES' &&
        liked?.data?.data?.items.map((item) => (
          <div key={item.id}>{JSON.stringify(item)}</div>
        ))}
    </div>
  );
}
