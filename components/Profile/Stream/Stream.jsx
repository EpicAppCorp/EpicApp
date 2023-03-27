import { useQuery } from 'react-query';

//components
import Post from '@epicapp/components/Home/Stream/Post';

//services
import { getPosts } from '@epicapp/services/post';
import { getLiked } from '@epicapp/services/like';

export default function Stream({ author }) {
  const liked = useQuery(['liked', author?.id], () => getLiked(author.id), {
    enabled: !!author,
    staleTime: 10000,
  });

  const posts = useQuery(['posts'], () => getPosts(author.id), {
    retry: 1,
    staleTime: 10000,
    enabled: !!author,
  });

  //TODO: idk, might just fetch all public posts if not logged in?
  if (!author) return null;

  //loading animation
  if (posts.isLoading)
    return (
      <div className="flex h-full items-center justify-center text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );

  // if no items
  if (!posts?.data?.data?.items.length)
    return (
      <p className="text-center text-sm text-textAlt">
        Nothing here yet... Weird.
      </p>
    );

  return (
    <div className="flex flex-col gap-6">
      {posts?.data?.data?.items
        .filter(({ type }) => type === 'post')
        .map((item) => (
          <Post
            key={item.id}
            post={item}
            author={author}
            liked={liked.data?.data?.items.map((like) => like.object)}
          />
        ))}
    </div>
  );
}
