import Image from 'next/image';
import clsx from 'clsx';

export default function Like({ like }) {
  //   let likedItem = useQuery({
  //     queryKey: ['comments', 'posts'],
  //     queryFn: () => getItem(like.object),
  //   });

  return (
    <div
      className={clsx(
        'flex h-28 items-center',
        like.idx % 2 === 0 ? 'bg-surface' : 'bg-foreground',
      )}
    >
      <div className="flex w-full gap-4 px-4">
        <div className="relative">
          <Image
            className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            loader={() => like.author.profileImage}
            width={40}
            height={40}
            priority={true}
          />
          <i className="fa-solid fa-heart absolute top-5 left-6 text-lg text-[#880808]" />
        </div>
        <div>
          <h1 className="font-semibold text-text">{like.author.displayName}</h1>
          <p className="text-sm text-textAlt">{like.summary}</p>
          {!like.author.host.includes(process.env.NEXT_PUBLIC_API) && (
            <div className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary">
              <i className="fa-solid fa-square-up-right" /> External
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
