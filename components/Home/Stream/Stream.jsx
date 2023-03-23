import { useQuery } from 'react-query';

//components
import Post from './Post';

//services
import { getInbox } from '@epicapp/services/inbox';
import FollowRequest from '@epicapp/components/Inbox/FollowRequest';
import Like from '@epicapp/components/Inbox/Like';
import Comment from '@epicapp/components/Inbox/Comment';

export default function Stream({ author, isInbox }) {
  const inbox = useQuery(['inbox'], () => getInbox(author), {
    retry: 1,
    staleTime: 10000,
    enabled: !!author,
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

  return isInbox ? (
    <div className="flex flex-col gap-6">
      {inbox.data.data.items.map((item) =>
        item.type === 'post' ? (
          <Post key={item.id} post={item} author={author} />
        ) : item.type === 'follow' ? (
          <FollowRequest key={item.id} follow={item} author={author} />
        ) : item.type === 'like' ? (
          <Like key={item.id} like={item} author={author} />
        ) : item.type === 'comment' ? (
          <Comment key={item.id} comment={item} author={author} />
        ) : null,
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-6">
      {inbox.data.data.items
        .filter(({ type }) => type === 'post')
        .map((item) => (
          <Post key={item.id} post={item} author={author} />
        ))}
    </div>
  );
}
