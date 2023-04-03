import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { formatDistance } from 'date-fns';
import clsx from 'clsx';

//componenets
import Button from '@epicapp/components/Button';

//services
import { newLike } from '@epicapp/services/like';

export default function Comment({ author, comment, liked }) {
  const queryClient = useQueryClient();
  const addCommentLike = useMutation(
    () => newLike(author, { ...comment, object: comment?.id }),
    {
      onSettled() {
        //update cache
        queryClient.setQueryData(['liked', author?.id], (oldData) => ({
          ...oldData,
          data: {
            ...oldData.data,
            items: [...oldData.data.items, { object: comment?.id }],
          },
        }));
      },
    },
  );

  return (
    <div className="flex items-center gap-4">
      <Image
        className="aspect-square self-center overflow-hidden rounded-full border-4 border-background object-cover"
        src="profile image"
        alt="profile image"
        loader={() => comment.author.profileImage}
        width={40}
        height={40}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
      />
      <div className="flex flex-col gap-1">
        <p className="flex gap-2 text-text">
          <span className="font-bold">{comment.author.displayName}</span>
          {comment.comment}
        </p>
        <span className="flex items-center gap-2 text-xs text-textAlt">
          <Button
            onClick={() => addCommentLike.mutate()}
            disabled={liked.includes(comment.id)}
            loading={addCommentLike.isLoading}
            className="flex text-sm"
          >
            <i
              className={clsx(
                'transition-colors duration-150',
                liked.includes(comment.id)
                  ? 'fa-solid fa-heart text-[#880808]'
                  : 'fa-regular fa-heart hover:text-[#880808]',
              )}
            />
          </Button>
          {comment?.published &&
            formatDistance(new Date(comment.published), new Date(), {
              addSuffix: true,
            })}
        </span>
      </div>
    </div>
  );
}
