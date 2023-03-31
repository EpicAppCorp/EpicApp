import { useState } from 'react';
import { useQuery } from 'react-query';

//component
import Search from './Search';
import Friend from './Friend';

//services
import { getAllAuthors } from '@epicapp/services/author';

export default function Friends({ filter, author }) {
  const [filterType, setFilterType] = useState(filter ?? 'ALL');
  const [search, setSearch] = useState('');
  const filterFunctions = {
    ALL: (friend) => friend.id === friend.id,
    FOLLOWERS: (friend) => author.followers.includes(friend.url),
    FOLLOWING: (friend) => author.following.includes(friend.url),
  };

  const friends = useQuery(['friends'], () => getAllAuthors(), {
    staleTime: 10000,
    enabled: !!author,
  });

  if (!author) return null;

  return (
    <div className="flex flex-col items-center gap-8">
      <Search
        filter={filterType}
        changeFilter={(filter) => setFilterType(filter)}
        setSearch={(query) => setSearch(query)}
      />
      {friends.isLoading ? (
        <div className="flex h-full items-center justify-center py-4 text-9xl text-primary">
          {/* // maybe a ekelton loading animation here? */}
          <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {friends?.data?.data?.items
            .filter((friend) => friend.displayName.includes(search))
            .filter((friend) => filterFunctions[filterType](friend))
            .map((friend) => (
              <Friend key={friend.id} author={author} friend={friend} />
            ))}
        </div>
      )}
    </div>
  );
}
