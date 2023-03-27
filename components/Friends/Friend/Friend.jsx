import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';

//components
import Button from '@epicapp/components/Button';

//services
import { followRequest } from '@epicapp/services/inbox';

export default function Friend({ author, friend }) {
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
    <article className="flex justify-between px-4">
      <div className="flex gap-2">
        <Image
          className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
          src="profile image"
          alt="profile image"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
          loader={() => friend.profileImage}
          width={60}
          height={60}
          priority={true}
        />
        <div>
          <h2 className="font-semibold text-text">{friend.displayName}</h2>
          <p className="w-60 truncate text-xs text-textAlt">{friend.host}</p>
        </div>
      </div>
      <Button
        loading={followAuthor.isLoading}
        disabled={followAuthor.isSuccess}
        onClick={() => followAuthor.mutate()}
        className="self-center rounded-2xl bg-layer px-4 py-2 text-sm text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
      >
        {followAuthor.isSuccess ? 'Sent' : 'Follow'}
      </Button>
    </article>
  );
}
