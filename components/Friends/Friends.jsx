import { useQuery } from 'react-query';

//component
// import Search from './Search';
import Friend from './Friend';

//services
import { getAllAuthors } from '@epicapp/services/author';

export default function Friends({ author }) {
  const friends = useQuery(['friends'], () => getAllAuthors(), {
    staleTime: 10000,
    enabled: !!author,
  });

  if (!author) return null;

  if (friends.isLoading) {
    return null;
  }

  return (
    <div className="sticky top-20 w-full h-5/6 overflow-y-auto rounded-xl bg-surface p-4">
      <h1 className="text-xl text-text">Other Authors</h1>
      <div className="mt-4 flex flex-col gap-3">
        {friends.data.data.items
          .filter((friend) => friend.id !== author.id)
          .map((friend) => (
            <Friend key={friend.id} author={author} friend={friend} />
          ))}
      </div>
    </div>
  );
}
