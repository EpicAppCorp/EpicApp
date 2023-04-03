import { getAuthorGithub } from "@epicapp/services/author";
import Image from "next/image";
import { useQuery } from "react-query";

export default function GitHubActivity({ author }) {
  const githubUsername = author?.github.substring(author?.github.lastIndexOf("/") + 1)

  const gitActivity = useQuery(['activity', author?.id], () => getAuthorGithub(githubUsername), {
    staleTime: 10000,
  });

  if (gitActivity.isLoading)
  return (
    <div className="flex h-full items-center justify-center py-4 text-9xl text-primary">
      <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
    </div>
  );

  if (!author) {
    return null;
  }

  return (
    <div className="sticky top-20 w-full h-5/6 overflow-y-auto rounded-xl bg-surface p-4">
      <h1 className="text-xl text-text">GitHub Feed</h1>
      <div className="mt-4 flex flex-col gap-3">
      {gitActivity.data?.data.map((event) => {
        return (
          <div className="flex gap-4">
            <Image
              className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="profile image"
              alt="profile image"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              loader={() => event.actor.avatar_url}
              width={60}
              height={60}
              priority={true}
            />  
            <div className="flex flex-col">
              <span className="text-textAlt">@{event.actor.display_login}</span>
              <h1 class="text-lg font-bold text-text"> {event.type.replace("Event", "")}</h1>
              <span className="text-textAlt">{event.repo.name}</span>
            </div>
          </div>
        );
       } )}
      </div>
    </div>
  );
}
