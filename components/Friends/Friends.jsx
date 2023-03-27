import { useQuery } from 'react-query';

//component
// import Search from './Search';
import Friend from './Friend';

//services
import { getAllAuthors } from '@epicapp/services/author';

export default function Friends({ author }) {
  const friends = useQuery(['friends'], () => getAllAuthors(), {
    staleTime: 10000,
  });

  if (friends.isLoading) {
    return null;
  }

  return (
    <div className="sticky top-20 w-full overflow-hidden rounded-xl bg-surface">
      <h1 className="px-4 pt-4 text-2xl font-semibold text-text">
        Other Authors
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {friends.data?.data.items.map((friend) => (
          <Friend key={friend.id} author={author} friend={friend} />
        ))}
      </div>
    </div>
  );
}
