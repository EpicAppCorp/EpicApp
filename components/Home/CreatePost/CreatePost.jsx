import { useState, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

//services
import { newPost } from '@epicapp/services/post';

///utils
import { convertBase64 } from '@epicapp/utils/image';

export default function CreatePost({ author }) {
  const queryClient = useQueryClient();

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const bodyRef = useRef(null);

  const [contentType, setContentType] = useState('text/plain');
  const [imageFileName, setImageFileName] = useState(null);
  const [visibility, setVisibility] = useState({
    open: false,
    type: 'PUBLIC',
    icon: 'fa-regular fa-earth-asia',
  });

  // mutation
  const createPost = useMutation((post) => newPost(author, post), {
    onSuccess(data) {
      //update cache, dont think we doing it this way anoymore.
      queryClient.setQueryData(['inbox', author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: [data.data, ...oldData.data.items],
        },
      }));

      //reset the fields
      titleRef.current.value = '';
      descriptionRef.current.value = '';
      bodyRef.current.value = '';
    },
  });

  //handles stuff from form
  const formHandler = async (e) => {
    e.preventDefault();

    //deconstruct the elements in form element
    const { title, description } = e.target;

    const body =
      contentType === 'image/png;base64'
        ? await convertBase64(e.target.image.files[0])
        : e.target.body.value;

    //mutate the post stuff to server
    createPost.mutate({
      type: 'post',
      title: title.value,
      source: process.env.NEXT_PUBLIC_API,
      origin: process.env.NEXT_PUBLIC_API,
      description: description.value,
      content: body,
      contentType:
        contentType === 'image/png;base64'
          ? body.split(',')[0].split('data:')[1]
          : contentType,
      visibility: visibility.type,
      categories: ['cool'],
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
          <div>
            <Image
              className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="profile image"
              alt="profile image"
              loader={() => author.profileImage}
              width={60}
              height={60}
              priority={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
            />
            {/* change the visibility type of post */}
            <Button
              type="button"
              onClick={() =>
                setVisibility({ ...visibility, open: !visibility.open })
              }
              className="relative flex w-full justify-center gap-2 py-4 text-lg text-textAlt"
            >
              <i className={visibility.icon} />
              <i
                className={clsx(
                  'text-sm',
                  visibility.open
                    ? 'fa-regular fa-solid fa-caret-up'
                    : 'fa-regular fa-solid fa-caret-down',
                )}
              />
              {visibility.open && (
                <ul className="absolute top-10 overflow-hidden rounded-xl bg-foreground text-sm shadow-xl">
                  <li
                    className="flex items-center gap-2 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
                    onClick={() =>
                      setVisibility({
                        open: false,
                        type: 'PUBLIC',
                        icon: 'fa-regular fa-earth-asia',
                      })
                    }
                  >
                    <i className="fa-regular fa-earth-asia" /> Public
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
                    onClick={() => {
                      setVisibility(() => ({
                        open: true,
                        type: 'PUBLIC',
                        icon: 'fa-regular fa-user-group',
                      }));
                    }}
                  >
                    <i className="fa-regular fa-user-group" /> Friends
                  </li>
                  <li
                    className="flex items-center gap-2 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
                    onClick={() =>
                      setVisibility({
                        open: false,
                        type: 'PRIVATE',
                        icon: 'fa-regular fa-lock',
                      })
                    }
                  >
                    <i className="fa-regular fa-lock" /> Private
                  </li>
                </ul>
              )}
            </Button>
          </div>
          <div className="w-full">
            <div className="w-full overflow-hidden rounded-2xl bg-foreground text-text">
              <input
                ref={titleRef}
                className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                type="text"
                name="title"
                placeholder="Creative title for your new post."
                required={true}
              />
              <input
                ref={descriptionRef}
                className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                type="text"
                name="description"
                placeholder="Description of this cool post."
                required={true}
              />
              <div className="flex h-14 items-center">
                {contentType !== 'image/png;base64' ? (
                  <textarea
                    ref={bodyRef}
                    className="min-h-14 m-0 h-full max-h-14 w-full bg-transparent p-3 placeholder:text-textAlt/20 focus:outline-none"
                    placeholder="What is that you want to tell the world?"
                    name="body"
                    required={true}
                  />
                ) : (
                  <label>
                    <div className="flex w-full cursor-pointer items-center gap-2 bg-transparent p-3 text-textAlt focus:outline-none">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/25 text-primary">
                        <i className="fa-solid fa-plus" />
                      </div>
                      <span>
                        {imageFileName} (Click here to upload an image)
                      </span>
                    </div>
                    <input
                      ref={bodyRef}
                      className="hidden"
                      type="file"
                      accept="image/png, image/gif, image/jpeg"
                      name="image"
                      onChange={(e) => setImageFileName(e.target.files[0].name)}
                      required={true}
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="mt-2 flex justify-between">
              <div className="flex gap-4 text-text">
                <button
                  type="button"
                  onClick={() => setContentType('text/plain')}
                  className={clsx(
                    'flex w-32 items-center justify-center gap-2 rounded-2xl px-2 py-2',
                    contentType === 'text/plain'
                      ? 'bg-secondary/10'
                      : 'bg-foreground transition-all duration-150 hover:scale-110 hover:bg-secondary/10',
                  )}
                >
                  <i className="fa-regular fa-text text-secondary" />
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => setContentType('image/png;base64')}
                  className={clsx(
                    'flex w-32 items-center justify-center gap-2 rounded-2xl px-2 py-2',
                    contentType === 'image/png;base64'
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
                    'flex w-32 items-center justify-center gap-2 rounded-2xl px-2 py-2',
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
