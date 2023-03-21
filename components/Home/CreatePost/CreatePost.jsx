import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

//services
import { newPost } from '@epicapp/services/post';

export default function CreatePost({ author }) {
  const [contentType, setContentType] = useState('text/plain');

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
    const { body, title, description } = e.target;

    //mutate the post stuff to server
    //no need to also post to inbox as api internally does that for you.
    createPost.mutate({
      type: 'post',
      title: title.value,
      source: 'http://localhost:8000',
      origin: 'http://localhost:8000',
      description: description.value,
      content: body.value,
      contentType: contentType,
      visibility: 'PUBLIC',
      categories: ['something', 'anothring thing'],
      author: {
        type: 'author',
        id: author.id,
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profileImage: author.profileImage,
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
            className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            loader={() => author.profileImage}
            width={60}
            height={60}
            priority={true}
          />
          <div className="w-full">
            <div className="w-full overflow-hidden rounded-2xl bg-foreground text-text">
              <input
                className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                type="text"
                name="title"
                placeholder="Creative title for your new post."
              />
              <input
                className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                type="text"
                name="description"
                placeholder="Description of this cool post."
              />
              {contentType === 'text/plain' && (
                <textarea
                  className="h-14 w-full grow bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                  placeholder="What is that you want to tell the world?"
                  name="body"
                />
              )}
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex gap-4 text-text">
                <button
                  type="button"
                  onClick={() => setContentType('text/plain')}
                  className={clsx(
                    'flex w-32 items-center justify-center gap-2 rounded-2xl py-2 px-2',
                    contentType === 'text/plain'
                      ? 'bg-secondary/10'
                      : 'hover:bg-secondary/10 bg-foreground transition-all duration-150 hover:scale-110',
                  )}
                >
                  <i className="fa-regular fa-text text-secondary" />
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('text/img')}
                  className={clsx(
                    'flex w-32 items-center justify-center gap-2 rounded-2xl py-2 px-2',
                    contentType === 'text/img'
                      ? 'bg-tertiary/10'
                      : 'bg-foreground transition-all duration-150 hover:scale-110 hover:bg-tertiary/10',
                  )}
                >
                  <i className="fa-regular fa-image text-tertiary" />
                  Photo
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('text/markdown')}
                  className={clsx(
                    'flex w-32 items-center justify-center gap-2 rounded-2xl py-2 px-2',
                    contentType === 'text/markdown'
                      ? 'bg-quaternary/10'
                      : 'bg-foreground transition-all duration-150 hover:scale-110 hover:bg-quaternary/10',
                  )}
                >
                  <i className="fa-brands fa-markdown text-quaternary" />
                  Markdown
                </button>
              </div>
              <div>
                <Button
                  type="submit"
                  loading={createPost.isLoading}
                  className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
                >
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
