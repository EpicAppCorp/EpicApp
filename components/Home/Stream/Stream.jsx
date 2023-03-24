import { useQuery } from 'react-query';

//components
import Post from './Post';
import Follow from '@epicapp/components/Home/Stream/Follow';
import Like from '@epicapp/components/Home/Stream/Like';
import Comment from '@epicapp/components/Home/Stream/Comment';

//services
import { getInbox } from '@epicapp/services/inbox';

export default function Stream({ author, isInbox }) {
  const inbox = useQuery(['inbox', author], () => getInbox(author), {
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
  else if (
    isInbox &&
    !inbox.data?.data.items.filter((item) => item.type !== 'post').length
  )
    return (
      <p className="py-4 text-center text-sm text-textAlt">
        No new notifications.
      </p>
    );
  // if no items
  else if (!inbox.data?.data.items.length)
    return (
      <p className="py-4 text-center text-sm text-textAlt">
        Nothing here yet... weird.
      </p>
    );
  //inbox stream
  else if (isInbox)
    return (
      <div className="flex flex-col">
        {inbox.data.data.items.map((item, idx) => {
          if (item.type === 'follow')
            return <Follow key={idx} follow={{ ...item, idx }} />;
          else if (item.type === 'like')
            return <Like key={idx} like={{ ...item, idx }} />;
          else if (item.type === 'comment')
            return <Comment key={idx} comment={{ ...item, idx }} />;
        })}
      </div>
    );
  //posts only inbox stream
  else
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
