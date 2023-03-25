import Image from 'next/image';
import { acceptFollower } from '@epicapp/services/follow';
import { useState } from 'react';
import { useMutation } from 'react-query';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

export default function FollowRequest({ follow, author }) {
  const [accepted, setAccepted] = useState(false);
  const acceptFollow = useMutation(() => acceptFollower(author, follow.actor), {
    onSuccess() {
      setAccepted(true);
    },
  });
  return (
    <div
      className={clsx(
        'flex h-28 items-center',
        follow.idx % 2 === 0 ? 'bg-surface' : 'bg-foreground',
      )}
    >
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            {follow.actor?.profileImage ? (
              <Image
                className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                src="profile image"
                alt="profile image"
                loader={() => follow.actor.profileImage}
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
              {follow.actor.displayName}
            </span>
            <p className="w-48 truncate text-sm text-textAlt">
              {follow.summary}
            </p>
            {!process.env.NEXT_PUBLIC_API.includes(follow.actor.host) && (
              <div
                title={follow.actor.host}
                className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary"
              >
                <i className="fa-solid fa-square-up-right" /> External
              </div>
            )}
          </div>
        </div>
        <Button
          loading={acceptFollow.isLoading}
          disabled={accepted}
          onClick={() => acceptFollow.mutate()}
          className="self-center rounded-2xl bg-layer px-4 py-2 text-sm text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
        >
          {accepted ? 'Accepted' : 'Accept'}
        </Button>
      </div>
    </div>
  );
}
