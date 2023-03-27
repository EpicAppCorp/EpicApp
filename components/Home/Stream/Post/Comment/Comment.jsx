import Image from 'next/image';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { formatDistance } from 'date-fns';
import clsx from 'clsx';

//componenets
import Button from '@epicapp/components/Button';

//services
import { newLike } from '@epicapp/services/like';
import { getComment } from '@epicapp/services/comment';

export default function Comment({ author, comment, post, liked }) {
  const queryClient = useQueryClient();

  // TODO FIX THIS WITH ACTUAL AUTHOR OBJ
  const commentRequest = useQuery(
    ['comment', comment?.author],
    () => getComment(comment?.author),
    {
      staleTime: 10000,
    },
  );

  const addCommentLike = useMutation((post) => newLike(post), {
    onSuccess() {
      //update cache
      queryClient.setQueryData(['liked', author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: [...oldData.data.items, { object: comment.id }],
        },
      }));
    },
  });

  const submitLike = (object) => {
    addCommentLike.mutate({
      type: 'Like',
      author: {
        type: 'author',
        id: author.id,
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profileImage: author.profileImage,
      },
      object,
    });
  };

  if (commentRequest.isLoading) {
    return null;
  }

  return (
    <div className="flex items-center gap-4">
      <Image
        className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
        src="profile image"
        alt="profile image"
        loader={() => commentRequest?.data?.data.profileImage}
        width={40}
        height={40}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
      />
      <div className="flex flex-col gap-1">
        <p className="flex gap-2 text-text">
          <span className="font-bold">
            {commentRequest?.data?.data.displayName}
          </span>
          {comment.comment}
        </p>
        <span className="flex items-center gap-2 text-xs text-textAlt">
          <Button
            onClick={() => submitLike(comment.id)}
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
