import { formatDistance } from 'date-fns';
import clsx from 'clsx';


//componenets
import Button from '@epicapp/components/Button';

export default function Comment({ comment }) {
  return (
    <div className="flex items-center gap-4">
      <Image
        className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
        src="profile image"
        alt="profile image"
        loader={() => comment.author.profileImage}
        width={40}
        height={40}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
      />
      <div className="flex flex-col gap-1">
        <p className="flex gap-2 text-text">
          <span className="font-bold">{comment.author.displayName}</span>
          {comment.comment}
        </p>
        <span className="flex items-center gap-2 text-xs text-textAlt">
          <Button
            onClick={() => submitLike('COMMENT', comment.id)}
            disabled={liked.includes(comment.id)}
            loading={addCommentLike.isLoading}
            className="flex text-sm"
          >
            <i
              className={clsx(
                'transition-colors duration-150',
                liked.includes(comment.id)
                  ? 'fa-solid fa-heart text-[#880808]'
                  : 'fa-regular fa-heart hover:text-[#880808]',
              )}
            />
          </Button>
          {formatDistance(new Date(comment.published), new Date(), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
