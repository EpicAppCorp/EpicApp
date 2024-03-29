import { useState } from 'react';
import { useQuery } from 'react-query';
import clsx from 'clsx';

//components
import Post from '@epicapp/components/Home/Stream/Post';
import Button from '@epicapp/components/Button';
import Activity from '../Activity';

//services
import { getPosts } from '@epicapp/services/post';
import { getLiked } from '@epicapp/services/like';

export default function Timeline({ auth, author }) {
  const [filter, setFilter] = useState('POSTS');

  //logged in user likes
  const authLiked = useQuery(['liked', auth.id], () => getLiked(auth.id), {
    staleTime: 10000,
  });

  const posts = useQuery(['posts', author?.id], () => getPosts(author.url), {
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
            <i className="fa-solid fa-heart" /> Activity
          </Button>
        </li>
      </ul>
      {filter === 'POSTS' && (
        <div className="flex flex-col gap-6">
          {posts?.data?.data?.items?.length ? (
            posts?.data?.data?.items
              .filter(({ type }) => type === 'post')
              .map((item) => (
                <Post
                  key={item.id}
                  post={item}
                  author={auth}
                  type="TIMELINE"
                  liked={authLiked.data?.data?.items.map((like) => like.object)}
                />
              ))
          ) : (
            <p className="text-center text-sm text-textAlt">
              {auth.url === author.url
                ? 'You havent created any posts yet, maybe do something?'
                : "This author hasn't created any public posts yet... or its all private... or maybe they just don't like ya."}
            </p>
          )}
        </div>
      )}
      {filter === 'LIKES' && (
        <Activity
          author={author}
          auth={auth}
          authLiked={authLiked.data?.data?.items.map((like) => like.object)}
        />
      )}
    </div>
  );
}
