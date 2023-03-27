import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

//services
import { followRequest } from '@epicapp/services/inbox';

export default function Friend({ author, friend }) {
  const isAlreadyFollowing = author.following.includes(friend.url);
  const queryClient = useQueryClient();

  const followAuthor = useMutation(() => followRequest(author, friend), {
    onSuccess() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: (oldData.data.followers += 1),
        },
      }));
    },
  });

  return (
    <article className="flex h-24 justify-between gap-4 rounded-xl bg-foreground p-4">
      <div className="flex gap-2">
        <Image
          className="aspect-square flex-shrink-0 self-start overflow-hidden rounded-full border-4 border-background object-cover"
          src="profile image"
          alt="profile image"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
          loader={() => friend.profileImage}
          width={60}
          height={60}
          priority={true}
        />
        <div className="flex flex-col">
          <span className="truncate text-xs text-textAlt">Author</span>
          <h2 className="font-semibold text-text">@{friend.displayName}</h2>
          <p
            title={friend.host}
            className={clsx(
              'w-max items-center gap-1 text-xs text-textAlt',
              process.env.NEXT_PUBLIC_API.includes(friend.host)
                ? 'hidden'
                : 'flex',
            )}
          >
            <i className="fa-solid fa-square-up-right" />
            External
          </p>
        </div>
      </div>
      <Button
        loading={followAuthor.isLoading}
        disabled={followAuthor.isSuccess}
        onClick={() => followAuthor.mutate()}
        className="self-center rounded-2xl bg-layer px-4 py-2 text-sm text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
      >
        {followAuthor.isSuccess || isAlreadyFollowing ? 'Following' : 'Follow'}
      </Button>
    </article>
  );
}
