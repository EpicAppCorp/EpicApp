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
            <Image
              className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="profile image"
              alt="profile image"
              loader={() => follow.actor.profileImage}
              width={40}
              height={40}
            />
            <i className="fa-solid fa-circle-plus absolute top-5 left-6 text-lg text-secondary" />
          </div>
          <div>
            <span className="font-semibold text-text">
              {follow.actor.displayName}
            </span>
            <p className="text-sm text-textAlt">{follow.summary}</p>
            {!follow.actor.host.includes(process.env.NEXT_PUBLIC_API) && (
              <div className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary">
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
