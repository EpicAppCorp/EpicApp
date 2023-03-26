import { useQuery } from 'react-query';

//components
import Post from './Post';

//services
import { getPosts } from '@epicapp/services/userPosts';
import { da } from 'date-fns/locale';
import { data } from 'autoprefixer';

export default function Stream({ author }) {
  const posts = useQuery(['posts'], () => getPosts(author), {
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
        <i className="fa-solid fa-spinner-third text-primary animate-spin bg-transparent text-2xl" />
      </div>
    );

  // if no items
  if (!posts.data?.data.length)
    return (
      <p className="text-center text-sm text-textAlt">
        Nothing here yet... Weird.
      </p>
    );

  return (
    <div className="flex flex-col gap-6">
      {posts.data.data
        .filter(({ type }) => type === 'post')
        .map((item) => (
          <Post key={item.id} post={item} author={author} />
        ))}
    </div>
  );
}
