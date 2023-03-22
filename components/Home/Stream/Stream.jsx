import { useQuery } from 'react-query';

//components
import Post from './Post';

//services
import { getInbox } from '@epicapp/services/inbox';

export default function Stream({ author }) {
  const inbox = useQuery(['inbox', author], () => getInbox(author), {
    retry: 1,
    staleTime: 10000,
  });

  //loading animation
  if (inbox.isLoading)
    return (
      <div className="flex h-full items-center justify-center text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );

  // if no items
  if (!inbox.data?.data.items.length)
    return (
      <p className="text-center text-sm text-textAlt">
        Nothing here yet... Weird.
      </p>
    );

  return (
    <div className="flex flex-col gap-6">
      {inbox.data.data.items
        .filter(({ type }) => type === 'post')
        .map((item) => (
          <Post key={item.id} post={item} author={author} />
        ))}
    </div>
  );
}
