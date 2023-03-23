import { getItem } from "@epicapp/services/inbox";
import Image from "next/image";
import { useQuery } from "react-query";

export default function Like({like, author}) {
    let likedItem = useQuery({
        queryKey: ['comments', 'posts'],
        queryFn: () => getItem(like.object)
    })

    return(
        <div key={like.id} className="rounded-3xl bg-surface p-4">
            <div className="flex gap-4">
                <Image
                    className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
                    src="profile image"
                    alt="profile image"
                    loader={() => like.author.profileImage}
                    width={60}
                    height={60}
                    priority={true}
                />
                <div>
                    <span className="text-textAlt">@{like.author.displayName}</span>
                    <p className="text-xs text-textAlt">{like.summary}</p>
                    <h1 className="text-lg font-bold text-text">{likedItem.type === "comment" ? likedItem.comment: likedItem.title}</h1>
                </div>
            </div>  
        </div>
    )
}