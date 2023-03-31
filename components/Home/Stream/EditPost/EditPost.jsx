import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import clsx from 'clsx';
import Image from 'next/image';

//components
import Button from '@epicapp/components/Button/Button';

//services
import { editPost } from '@epicapp/services/post';
import { convertBase64 } from '@epicapp/utils/image';

export default function EditPost({ post, isInbox, back }) {
  const queryClient = useQueryClient();
  const [contentType, setContentType] = useState('text/plain');
  const [imageFileName, setImageFileName] = useState(null);

  // mutation
  const editPostMutation = useMutation((post) => editPost(post), {
    onSuccess(data, variables) {
      //update cache
      queryClient.setQueryData(['posts', post.author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: oldData.data.items.map((p) => {
            if (p.id === post.id) return variables;
            return p;
          }),
        },
      }));
      back();
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
    editPostMutation.mutate({
      ...post,
      type: 'post',
      title: title.value,
      description: description.value,
      content: body,
      contentType:
        contentType === 'image/png;base64'
          ? body.split(',')[0].split('data:')[1]
          : contentType,
    });
  };

  return (
    <div
      className={clsx(
        'bg-surface p-4',
        isInbox ? 'rounded-3xl' : 'rounded-b-3xl',
      )}
    >
      <form className="flex gap-4" onSubmit={formHandler}>
        {post.author?.profileImage ? (
          <Image
            className="aspect-square self-start overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
            loader={() => post.author.profileImage}
            width={60}
            height={60}
            priority={true}
          />
        ) : (
          <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-3xl text-textAlt">
            <i className="fa-solid fa-question" />
          </div>
        )}
        <div className="flex w-full flex-col gap-1">
          <input
            className="w-full bg-foreground px-2 text-2xl font-bold text-text placeholder:text-textAlt/20 focus:outline-none"
            type="text"
            name="title"
            placeholder="Title"
            defaultValue={post.title}
          />
          <input
            className="w-full bg-foreground px-2 text-textAlt placeholder:text-textAlt/20 focus:outline-none"
            type="text"
            name="description"
            placeholder="Description"
            defaultValue={post.description}
          />
          <div className="flex h-14 items-center">
            {contentType !== 'image/png;base64' ? (
              <textarea
                className="min-h-14 m-0 h-full max-h-14 w-full bg-foreground p-2 text-text placeholder:text-textAlt/20 focus:outline-none"
                placeholder="What is that you want to tell the world?"
                name="body"
                required={true}
                defaultValue={post.content}
              />
            ) : (
              <label className="h-full w-full bg-foreground">
                <div className="flex w-full cursor-pointer items-center gap-2 p-3 text-textAlt focus:outline-none">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/25 text-primary">
                    <i className="fa-solid fa-plus" />
                  </div>
                  <span>{imageFileName} (Click here to upload an image)</span>
                </div>
                <input
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
            <div className="flex gap-3">
              <Button
                type="button"
                onClick={back}
                className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                loading={editPostMutation.isLoading}
                className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
              >
                Share
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
