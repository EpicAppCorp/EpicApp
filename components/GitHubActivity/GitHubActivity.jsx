import { getAuthorGithub } from "@epicapp/services/author";
import Image from "next/image";
import { useQuery } from "react-query";

export default function GitHubActivity({ author }) {
  const githubUsername = author?.github.substring(author?.github.lastIndexOf("/") + 1)
  // const mockData = [
  //   {
  //     "id": "28149218472",
  //     "type": "PushEvent",
  //     "actor": {
  //       "id": 46465568,
  //       "login": "neilZon",
  //       "display_login": "neilZon",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/users/neilZon",
  //       "avatar_url": "https://avatars.githubusercontent.com/u/46465568?"
  //     },
  //     "repo": {
  //       "id": 597601456,
  //       "name": "CMPUT404-GROUP-PROJ/EpicApp",
  //       "url": "https://api.github.com/repos/CMPUT404-GROUP-PROJ/EpicApp"
  //     },
  //     "payload": {
  //       "repository_id": 597601456,
  //       "push_id": 13162540026,
  //       "size": 3,
  //       "distinct_size": 1,
  //       "ref": "refs/heads/bugfix/repost",
  //       "head": "9a1b5389ed87719d7eecb93fede2692cece3088d",
  //       "before": "30863fcf8b239e237ac351661011ceaa42ec9c3f",
  //       "commits": [
  //         {
  //           "sha": "38e90d8e73a2915a39313dbe4cc80e480f8938b0",
  //           "author": {
  //             "email": "theshanukg@gmail.com",
  //             "name": "Shane Goonasekera"
  //           },
  //           "message": "inputs reset when a post is successfull",
  //           "distinct": false,
  //           "url": "https://api.github.com/repos/CMPUT404-GROUP-PROJ/EpicApp/commits/38e90d8e73a2915a39313dbe4cc80e480f8938b0"
  //         },
  //         {
  //           "sha": "92f35c710354a64f407ad1b0739f69824bd97639",
  //           "author": {
  //             "email": "46552619+shanerrr@users.noreply.github.com",
  //             "name": "Shane Goonasekera"
  //           },
  //           "message": "Merge pull request #43 from CMPUT404-GROUP-PROJ/fix/create-post\n\ninputs reset when a post is successfull",
  //           "distinct": false,
  //           "url": "https://api.github.com/repos/CMPUT404-GROUP-PROJ/EpicApp/commits/92f35c710354a64f407ad1b0739f69824bd97639"
  //         },
  //         {
  //           "sha": "9a1b5389ed87719d7eecb93fede2692cece3088d",
  //           "author": {
  //             "email": "neilcviloria@gmail.com",
  //             "name": "Neilzon"
  //           },
  //           "message": "bruh",
  //           "distinct": true,
  //           "url": "https://api.github.com/repos/CMPUT404-GROUP-PROJ/EpicApp/commits/9a1b5389ed87719d7eecb93fede2692cece3088d"
  //         }
  //       ]
  //     },
  //     "public": true,
  //     "created_at": "2023-04-02T20:56:24Z",
  //     "org": {
  //       "id": 122751533,
  //       "login": "CMPUT404-GROUP-PROJ",
  //       "gravatar_id": "",
  //       "url": "https://api.github.com/orgs/CMPUT404-GROUP-PROJ",
  //       "avatar_url": "https://avatars.githubusercontent.com/u/122751533?"
  //     }
  //   },
  // ]

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
