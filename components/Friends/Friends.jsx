import { useQuery } from 'react-query';

//component
import Search from './Search';
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
    <div className="flex flex-col items-center gap-8">
      <Search />

      <div className="flex gap-3">
        {friends.data.data.items
          .filter((friend) => friend.id !== author.id)
          .map((friend) => (
            <Friend key={friend.id} author={author} friend={friend} />
          ))}
      </div>
    </div>
  );
}
