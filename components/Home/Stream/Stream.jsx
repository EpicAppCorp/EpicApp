import { useQuery, useQueryClient } from 'react-query';

//components
import Post from './Post';
import Follow from '@epicapp/components/Home/Stream/Follow';
import Like from '@epicapp/components/Home/Stream/Like';
import Comment from '@epicapp/components/Home/Stream/Comment';

//services
import { getInbox } from '@epicapp/services/inbox';
import { getLiked } from '@epicapp/services/like';

export default function Stream({ author, isInbox }) {
  const queryClient = useQueryClient();
  const inbox = useQuery(['inbox', author?.id], () => getInbox(author), {
    staleTime: 10000,
    onSuccess(data) {
      queryClient.setQueryData(['inbox', author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: data.data.items.filter((item) => item.id),
        },
      }));
    },
  });

  const liked = useQuery(['liked', author?.id], () => getLiked(author.id), {
    enabled: !!author,
    staleTime: 10000,
  });

  //loading animation
  if (inbox.isLoading)
    return (
      <div className="flex h-full items-center justify-center py-4 text-9xl text-primary">
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
        No new notifications
      </p>
    );
  // if no items
  else if (!inbox.data?.data?.items?.length)
    return (
      <p className="text-center text-sm text-textAlt">
        Nothing here yet... Weird
      </p>
    );
  //inbox stream
  else if (isInbox)
    return (
      <div className="flex flex-col">
        {inbox.data?.data?.items.map((item, idx, inbox) => {
          if (item.type.toUpperCase() === 'FOLLOW')
            return (
              <Follow
                key={idx}
                author={author}
                request={{ ...item, idx, inbox }}
              />
            );
          else if (item.type.toUpperCase() === 'LIKE')
            return <Like key={idx} like={{ ...item, idx, inbox }} />;
          else if (item.type.toUpperCase() === 'COMMENT')
            return <Comment key={idx} comment={{ ...item, idx, inbox }} />;
        })}
      </div>
    );
  //posts only inbox stream
  else
    return (
      <div className="flex flex-col gap-6">
        {inbox.data?.data?.items
          .filter(({ type }) => type === 'post')
          .map((item) => (
            <Post
              key={item.id}
              post={item}
              liked={liked.data?.data?.items.map((like) => like.object)}
              author={author}
            />
          ))}
      </div>
    );
}
