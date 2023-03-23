import Button from "@epicapp/components/Button";
import { acceptFollower } from "@epicapp/services/follow";
import Image from "next/image";
import { useState } from "react";
import { useMutation } from "react-query";

export default function FollowRequest({follow, author}) {
    const [accepted, setAccepted] = useState(false);
    const acceptFollow = useMutation(() => acceptFollower(author, follow.actor), {
        onSuccess() {
          setAccepted(true);
        },
      });
    return(
        <div key={follow.id} className="rounded-3xl bg-surface p-4">
            <div className="flex gap-4">
                <Image
                    className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                    src="profile image"
                    alt="profile image"
                    loader={() => follow.actor.profileImage}
                    width={60}
                    height={60}
                    priority={true}
                />
                <div>
                    <span className="text-textAlt">@{follow.actor.displayName}</span>
                    <p className="mb-4 text-xs text-textAlt">{follow.summary}</p>
                    {!accepted ? 
                    <span>
                        <Button
                            onClick={() => acceptFollow.mutate()}
                            className="rounded-2xl bg-layer px-4 text-xl text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
                        >
                            <i className="fa-regular fa-check" />
                        </Button>
                    </span>: null}
                </div>
            </div>
        </div>
    )
}