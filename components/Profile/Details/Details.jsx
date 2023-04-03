import Image from 'next/image';
import { useQueryClient, useMutation } from 'react-query';

//componenets
import Button from '@epicapp/components/Button';

//services
import { followRequest } from '@epicapp/services/inbox';
import { unfollow } from '@epicapp/services/follow';

export default function Details({ auth, author }) {
  const following = auth.following.includes(author.url);
  const follower = auth.followers.includes(author.url);

  const queryClient = useQueryClient();

  const followAuthor = useMutation(() => followRequest(auth, author), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: [...oldData.data.following, author.url],
        },
      }));
    },
  });

  const unfollowAuthor = useMutation(() => unfollow(author.url, auth.id), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: oldData.data.following.filter((u) => u !== author.url),
        },
      }));
    },
  });

  const removeFollower = useMutation(() => unfollow(auth.id, author.url), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          followers: oldData.data.followers.filter((u) => u !== author.url),
        },
      }));
    },
  });

  return (
    <div className="w-full overflow-hidden rounded-xl bg-surface shadow-xl">
      <div className="relative h-32 w-full bg-primary">
        {!process.env.NEXT_PUBLIC_API.includes(author.host) && (
          <div className="absolute right-4 top-4 flex items-center gap-2 text-xs font-bold text-black">
            <i className="fa-solid fa-square-up-right" />
            EXTERNAL
          </div>
        )}
      </div>
      <div className="relative h-32 w-full">
        <div className="absolute w-full -translate-y-1/2 px-12">
          <div className="flex justify-between">
            <div className="flex">
              {author.profileImage ? (
                <Image
                  className="aspect-square overflow-hidden rounded-full border-8 border-background object-cover"
                  alt="profile image"
                  src="profile image"
                  loader={() => author.profileImage}
                  width={144}
                  height={144}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                  priority={true}
                />
              ) : (
                <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-7xl text-textAlt">
                  <i className="fa-solid fa-question" />
                </div>
              )}
              <div className="my-4 flex flex-col justify-center self-end px-4">
                <h2 className="text-2xl font-semibold text-text">
                  @{author.displayName}
                </h2>
                <p className="text-xs text-textAlt">{author.host}</p>
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              {auth.url !== author.url && (
                <Button
                  loading={followAuthor.isLoading || unfollowAuthor.isLoading}
                  onClick={() =>
                    following ? unfollowAuthor.mutate() : followAuthor.mutate()
                  }
                  className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105"
                >
                  {following ? 'Unfollow' : 'Follow'}
                </Button>
              )}
              {follower && (
                <Button
                  loading={removeFollower.isLoading}
                  onClick={() => removeFollower.mutate()}
                  className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105"
                >
                  Remove follower
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
