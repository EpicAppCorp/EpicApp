import Image from 'next/image';
import clsx from 'clsx';

export default function Comment({ comment, author }) {
  return (
    <div
      key={comment.id}
      className={clsx(
        'flex h-28 items-center',
        comment.idx % 2 === 0 ? 'bg-surface' : 'bg-foreground',
      )}
    >
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4" key={comment.id}>
          <div className='relative'>
            <Image
              className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="profile image"
              alt="profile image"
              loader={() => comment.author.profileImage}
              width={40}
              height={40}
            />
            <i className="fa-solid fa-comment-dots absolute top-5 left-6 text-lg text-tertiary" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-text">
              {comment.author.displayName}
            </h1>
            <p className="text-sm text-textAlt">
              commented on <span className="font-bold">{comment.comment}</span>
            </p>
            {!comment.author.host.includes(process.env.NEXT_PUBLIC_API) && (
              <div className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary">
                <i className="fa-solid fa-square-up-right" /> External
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
