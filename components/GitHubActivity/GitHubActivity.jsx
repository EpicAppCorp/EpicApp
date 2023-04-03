import Image from 'next/image';
import { useQuery } from 'react-query';

//services
import { getAuthorGithub } from '@epicapp/services/author';

export default function GitHubActivity({ author }) {
  const githubUser = author?.github.split('.com/')[1];

  const gitActivity = useQuery(['github'], () => getAuthorGithub(githubUser), {
    staleTime: Infinity,
  });

  if (gitActivity.isLoading)
    return (
      <div className="flex h-full items-center justify-center py-4 text-9xl text-primary">
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );

  return (
    <div>
      <h1 className="text-2xl font-bold text-text">
        GitHub Feed - <span className="text-textAlt">@{githubUser}</span>
      </h1>
      <div className="mt-4 flex flex-col gap-3">
        {gitActivity.data?.data.map((event) => (
          <div
            key={event.id}
            className="flex gap-4 rounded-xl bg-foreground px-4 py-2"
          >
            <Image
              className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="github image"
              alt="github image"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              loader={() => event.actor.avatar_url}
              width={60}
              height={60}
              priority={true}
            />
            <div className="flex flex-col">
              <span className="text-sm text-textAlt">
                @{event.actor.display_login}
              </span>
              <h1 className="text-lg font-bold text-text">
                {event.type.replace('Event', '')}
              </h1>
              <span className="text-textAlt">{event.repo.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
