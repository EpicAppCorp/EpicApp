import Image from 'next/image';
import clsx from 'clsx';

export default function Comment({ comment }) {
  return (
    <div
      className={clsx(
        'flex h-28 items-center',
        comment.idx % 2 === 0 ? 'bg-surface' : 'bg-foreground',
      )}
    >
      <div className="flex w-full items-center justify-between px-4">
        <div className="flex items-center gap-4" key={comment.id}>
          <div className="relative">
            {comment.author?.profileImage ? (
              <Image
                className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                src="profile image"
                alt="profile image"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                loader={() => comment.author.profileImage}
                width={40}
                height={40}
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-xl text-textAlt">
                <i className="fa-solid fa-question" />
              </div>
            )}
            <i className="fa-solid fa-comment-dots absolute top-6 left-7 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-text">
              {comment.author.displayName}
            </h1>
            <p className="w-72 truncate text-sm text-textAlt">
              commented: <span className="font-bold">{comment.comment}</span>
            </p>
            {!process.env.NEXT_PUBLIC_API.includes(comment.author.host) && (
              <div
                title={comment.author.host}
                className="mt-1 flex w-max items-center gap-2 rounded-xl bg-primary/10 py-1 px-2 text-xs text-primary"
              >
                <i className="fa-solid fa-square-up-right" /> External
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
