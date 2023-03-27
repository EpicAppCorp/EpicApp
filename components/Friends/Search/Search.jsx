import { useMutation } from 'react-query';


import { getAuthorById } from '@epicapp/services/author';
import { sendFollowRequest } from '@epicapp/services/inbox';

//components
import Button from '@epicapp/components/Button';

export default function ({ authorSendingRequest }) {

    

  const sendFollow = useMutation((body) => {
    return sendFollowRequest(body);
  });

  const verifyAuthor = useMutation(
    (authorToVerify) => {
      return getAuthorById(authorToVerify);
    },
    {
      onSuccess(data) {
        sendFollow.mutate({
          type: 'inbox',
          summary: 'Sending a follow request',
          actor: {
            type: 'author',
            id:
              authorSendingRequest.data.data.host +
              'api/authors/' +
              authorSendingRequest.data.data.id,
            host: authorSendingRequest.data.data.host,
            displayName: authorSendingRequest.data.data.displayName,
            url:
              authorSendingRequest.data.data.host +
              'api/authors/' +
              authorSendingRequest.data.data.id,
            github: authorSendingRequest.data.data.github,
            profileImage: authorSendingRequest.data.data.profileImage,
          },
          object: {
            type: 'author',
            id: data.data.host + 'api/authors/' + data.data.id,
            host: data.data.host,
            displayName: data.data.displayName,
            url: data.data.host + 'api/authors/' + data.data.id,
            github: data.data.github,
            profileImage: data.data.profileImage,
          },
        });
        close();
      },
    },
  );

  const searchSubmit = async (e) => {
    e.preventDefault();
    verifyAuthor.mutate(e.target.authorDisplayName.value);
  };

  return (
    <section className="rounded-3xl bg-surface p-4">
      <form onSubmit={searchSubmit}>
        <div className="flex flex-row gap-4">
          <div className="w-full overflow-hidden rounded-2xl bg-foreground text-text">
            <input
              className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
              type="text"
              id="authorDisplayName"
              name="authorDisplayName"
              placeholder="Creative title for your new post."
              required
            />
          </div>
          <div className="mt-2">
            <Button
              type="submit"
              className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
            >
              Share
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
