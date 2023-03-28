import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

//services
import { followRequest } from '@epicapp/services/inbox';
import { unfollow } from '@epicapp/services/follow';

export default function Friend({ author, friend }) {
  const isAlreadyFollowing = author.following.includes(friend.url);
  const isAFollower = author.followers.includes(friend.url);

  const queryClient = useQueryClient();

  const followAuthor = useMutation(() => followRequest(author, friend), {
    onSuccess() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: [...oldData.data.following, friend.url],
        },
      }));
    },
  });

  const unfollowAuthor = useMutation(() => unfollow(friend.url, author.id), {
    onSuccess() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: oldData.data.following.filter((u) => u !== friend.url),
        },
      }));
    },
  });

  const removeFollower = useMutation(() => unfollow(author.id, friend.url), {
    onSuccess() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          followers: oldData.data.followers.filter((u) => u !== friend.url),
        },
      }));
    },
  });

  return (
    <article>
      <div className="relative flex h-24 w-96 justify-between gap-4 rounded-t-xl bg-foreground p-4">
        <i
          title="You both follow each other"
          className={clsx(
            'fa-regular fa-arrow-right-arrow-left absolute right-4 text-textAlt',
            isAlreadyFollowing && isAFollower ? 'block' : 'hidden',
          )}
        />
        <div className="flex w-full gap-2">
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
          <div className="flex w-full flex-col">
            <span className="truncate text-sm leading-tight text-textAlt">
              Author
            </span>
            <h2 className="text-lg font-semibold text-text">
              @{friend.displayName}
            </h2>
            <p className="w-60 truncate text-xs text-textAlt">{friend.host}</p>
          </div>
        </div>
      </div>
      <div className="flex h-12 justify-center overflow-hidden rounded-b-xl bg-layer">
        <Button
          loading={followAuthor.isLoading || unfollowAuthor.isLoading}
          onClick={() =>
            isAlreadyFollowing ? unfollowAuthor.mutate() : followAuthor.mutate()
          }
          className="h-full w-full self-center text-sm text-textAlt transition-colors hover:bg-primary hover:text-black"
        >
          {isAlreadyFollowing ? 'Unfollow' : 'Follow'}
        </Button>
        <Button
          loading={removeFollower.isLoading}
          onClick={() => removeFollower.mutate()}
          className={clsx(
            'h-full w-full items-center justify-center self-center text-sm text-textAlt transition-colors hover:bg-primary hover:text-black',
            isAFollower ? 'flex' : 'hidden',
          )}
        >
          Remove Follower
        </Button>
      </div>
    </article>
  );
}
