import Image from "next/image";
import Button from "@epicapp/components/Button";
import { formatDistance } from 'date-fns';

export default function Comment({comment, author}) {
    return(
        <div key={comment.id} className="rounded-3xl bg-surface p-4">
            <div className="flex gap-4">
            <div
                className={'max-h-48 min-h-0 flex-col gap-3 overflow-y-auto flex'}
            >
              <div className="flex items-center gap-4" key={comment.id}>
                <Image
                  className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
                  src="profile image"
                  alt="profile image"
                  loader={() => comment.author.profileImage}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col gap-1">
                  <p className="flex gap-2 text-text">
                    <span className="font-bold">
                      {comment.author.displayName}
                    </span>
                    {comment.comment}
                  </p>
                  <span className="flex items-center gap-2 text-xs text-textAlt">
                    <Button className="flex text-sm">
                      <i className="fa-regular fa-heart transition-colors duration-150 hover:text-quaternary" />
                    </Button>
                    {formatDistance(new Date(comment.published), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
        </div>
    </div>
    )
}