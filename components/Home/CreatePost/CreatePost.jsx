import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';

//services
import { newPost } from '@epicapp/services/post';

export default function CreatePost({ author }) {
  const queryClient = useQueryClient();
  // mutation
  const createPost = useMutation((post) => newPost(author, post), {
    onSuccess(data) {
      //update cache
      queryClient.setQueryData(['inbox'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: [data.data, ...oldData.data.items],
        },
      }));
    },
  });

  //handles stuff from form
  const formHandler = (e) => {
    e.preventDefault();

    //deconstruct the elements in form element
    const { body } = e.target;

    //mutate the post stuff to server
    //no need to also post to inbox as api internally does that for you.
    createPost.mutate({
      type: 'post',
      title: 'Hard Coded Title',
      source: 'http://localhost:8000',
      origin: 'http://localhost:8000',
      description: 'This is a test Description',
      content: body.value,
      contentType: 'text/plain',
      published: 'uhhh',
      visibility: 'PUBLIC',
      categories: ['something', 'anothring thing'],
      author: {
        type: 'author',
        id: author.id, // Temporarily hardcoded
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profile_image: author.profile_image,
      },
    });
  };

  if (!author) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-surface p-4">
      <form onSubmit={formHandler}>
        <div className="flex gap-4">
          <Image
            className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            loader={() => author.profile_image}
            width={60}
            height={60}
            priority={true}
          />
          <textarea
            className="grow rounded-2xl bg-foreground p-2 text-textAlt focus:outline-none"
            placeholder="What's on your mind?"
            name="body"
          />
        </div>
        <div className="item-center pd-6 mt-3 flex gap-3">
          <div>
            <button className="flex items-center gap-3">
              <i className="fa-regular fa-image" />
              Upload Photo
            </button>
          </div>
          <div className="grow text-right">
            <button
              type="submit"
              className="rounded-md bg-submitBg px-4 py-1 text-white"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
