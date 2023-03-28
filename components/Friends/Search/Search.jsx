import { useMutation } from 'react-query';

import { getAuthorById } from '@epicapp/services/author';
import { sendFollowRequest } from '@epicapp/services/inbox';

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
    <div className="">
      <div className="flex w-max items-center rounded-xl bg-foreground px-4 text-lg text-text">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          className="h-14 w-96 bg-transparent px-4 placeholder:text-textAlt/20 focus:outline-none"
          type="text"
          id="authorDisplayName"
          name="authorDisplayName"
          placeholder="Search for an author"
          required
        />
      </div>

      <ul className='flex gap-6 text-textAlt mt-8 justify-center'>
        <li>All</li>
        <li>Followers</li>
        <li>Following</li>
      </ul>
    </div>
  );
}
