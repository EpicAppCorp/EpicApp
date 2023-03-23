import { useQuery } from 'react-query';

//services
import { getInbox } from '@epicapp/services/inbox';

export default function Stream({ author }) {
  const inbox = useQuery(['inbox'], () => getInbox(author), {
    retry: 1,
    staleTime: 10000,
    enabled: !!author,
  });

  //TODO: idk, might just fetch all public posts if not logged in?
  if (!author) return null;

  //loading animation
  if (inbox.isLoading)
    return (
      <div className="flex h-full items-center justify-center text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third text-primary animate-spin bg-transparent text-2xl" />
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
          <div key={item.id} post={item} author={author} />
        ))}
    </div>
  );
}
