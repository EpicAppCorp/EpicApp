import Image from 'next/image';
import { follow, isFollowing } from '@epicapp/services/follow';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

export default function Follow({ author, request }) {
  const queryClient = useQueryClient();

  //cache will never get stale, so only one call when mouonted.
  const following = useQuery(
    ['following', request.actor.id],
    () => isFollowing(author.id, request.actor.id),
    {
      staleTime: Infinity,
      onError(error) {
        if (error.statusCode === 404) {
          queryClient.setQueryData(['following', request.actor.id], []);
        }
      },
    },
  );

  const addFollower = useMutation(() => follow(author.id, request.actor.id), {
    //update cache so author has one follower now
    onSuccess() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          followers: (oldData.data.followers += 1),
        },
      }));
    },
  });

  return (
    <div
      className={clsx(
        'flex h-28 items-center',
        request.idx % 2 === 0 ? 'bg-surface' : 'bg-foreground',
      )}
    >
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {request.actor?.profileImage ? (
              <Image
                className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                src="profile image"
                alt="profile image"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                loader={() => request.actor.profileImage}
                width={40}
                height={40}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-xl text-textAlt">
                <i className="fa-solid fa-question" />
              </div>
            )}
            <i className="fa-solid fa-user absolute top-6 left-7 text-secondary" />
          </div>
          <div>
            <span className="font-semibold text-text">
              {request.actor.displayName}
            </span>
            <p className="w-48 truncate text-sm text-textAlt">
              {request.summary}
            </p>
            {!process.env.NEXT_PUBLIC_API.includes(request.actor.host) && (
              <div
                title={request.actor.host}
                className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary"
              >
                <i className="fa-solid fa-square-up-right" /> External
              </div>
            )}
          </div>
        </div>
        <Button
          loading={addFollower.isLoading || following.isLoading}
          disabled={addFollower.isSuccess || following.isSuccess}
          onClick={() => addFollower.mutate()}
          className="self-center rounded-2xl bg-layer px-4 py-2 text-sm text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
        >
          {addFollower.isSuccess || following.isSuccess ? 'Accepted' : 'Accept'}
        </Button>
      </div>
    </div>
  );
}
