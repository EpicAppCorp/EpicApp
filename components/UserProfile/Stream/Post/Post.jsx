import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { formatDistance } from 'date-fns';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

//components
import Button from '@epicapp/components/Button';

//services
import { getComments, newComment } from '@epicapp/services/comment';
import { getLikes, newLike } from '@epicapp/services/like';
import { reactStrictMode } from '@epicapp/next.config';
import { getUserPost } from '@epicapp/services/userPosts';

export default function Post({ post, author }) {
  const commentInputRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const queryClient = useQueryClient();
  const [dropdown, setDropdown] = useState(false);
  const [editPost, setEditPost] = useState(false);

  console.log(dropdown)
  function setValues() {
    setEditPost(!editPost);
    setDropdown(!dropdown);
  }

  //get all comments
  const comments = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => getComments(post.id),
    enabled: showComments,
  });

  //get likes
  // const likes = useQuery({
  //   queryKey: ['likes', post.id],
  //   queryFn: () => getLikes(post.id),
  // });

  //comment mutation
  const addComment = useMutation((post) => newComment(post), {
    onSuccess(data) {
      commentInputRef.current.value = '';
      //update cache
      queryClient.setQueryData(['comments', post.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          comments: [...oldData.data.comments, data.data],
        },
      }));
    },
  });

  const classBuilder = (type) => {
    return clsx(
      ' transition-all duration-150 hover:text-primary',
      route === type
        ? 'relative text-primary after:mt-4 after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[""]'
        : 'text-text',
    );
  };

  //like mutation
  const addLike = useMutation((post) => newLike(post), {
    onSuccess(data) {
      //update cache
      queryClient.setQueryData(['likes', post.id], (oldData) => ({
        ...oldData,
        data: [...oldData.data, data.data],
      }));
    },
  });

  const submitComment = (e) => {
    e.preventDefault();
    addComment.mutate({
      comment: e.target.comment.value,
      post_id: post.id,
      author: {
        type: 'author',
        id: author.id,
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profileImage: author.profileImage,
      },
      author_id: author.id,
    });
  };

  const submitLike = () => {
    addLike.mutate({
      type: 'Like',
      author: {
        type: 'author',
        id: author.id,
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profileImage: author.profileImage,
      },
      object: post.id,
    });
  };

  return (
    <div key={post.id} className="rounded-3xl bg-surface p-4">
      <div className="flex gap-4">
        <Image
          className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
          src="profile image"
          alt="profile image"
          loader={() => post.author.profileImage}
          width={60}
          height={60}
          priority={true}
        />
        {!editPost && (
          <div>
          <span className="text-textAlt">@{post.author.displayName}</span>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text">{post.title}</h1>
            <span className="text-xs font-light text-primary before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:content-['']">
              {formatDistance(new Date(post.published), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
          <p className="text-xs text-textAlt">{post.description}</p>
        </div>
        )}
        {editPost && (
          <div>
            <span className="text-textAlt">@{post.author.displayName}</span>
            <div className="w-full">
            </div>
            <p className="text-xs text-textAlt">{post.description}</p>
          </div>
        )}
        <div className="flex grow flex-row-reverse">
          <div className="relative">
            <button 
              onClick={() => setDropdown(!dropdown)}
              type="button"
              className="text-textAlt"
            >
              <i 
              className={clsx(
                    'pl-4',
                    dropdown
                      ? 'fa-light fa-circle-ellipsis transition-colors hover:text-primary'
                      : 'fa-light fa-circle-ellipsis transition-primary',
                  )}
              />
            </button>
            {dropdown && (
              <div className="absolute right-0 overflow-hidden rounded-xl bg-background text-base hover:shadow-lg">
                <li>
                  <Button
                    onClick={() => setValues()}
                    className="grid h-11 grid-cols-12 items-center gap-3 px-4 text-white transition-colors duration-150 hover:bg-primary hover:text-black"
                    href="/profile"
                  >
                    <i className="fa-solid fa-pencil col-span-2" />
                    Edit
                  </Button>
                  <Button
                    className="grid h-11 grid-cols-12 items-center gap-3 px-4 text-white transition-colors duration-150 hover:bg-primary hover:text-black"
                    href="/profile"
                  >
                    <i className="fa-regular fa-trash col-span-2" />
                    Delete
                  </Button>
                </li>
              </div>
            )}
          </div>
        </div>
      </div>
      {!editPost && (
        <div className="my-8">
          {post.contentType.includes('image/') && (
            <div className="relative h-96 w-full">
              <Image
                alt={post.description}
                src={post.content}
                className="rounded-2xl object-cover"
                fill={true}
              />
            </div>
          )}
          {post.contentType === 'text/plain' && (
            <div className="text-text">{post.content}</div>
          )}
          {post.contentType === 'text/markdown' && (
            <ReactMarkdown className="text-text">{post.content}</ReactMarkdown>
          )}
        </div>
      )}
      {editPost && (
        <div className="w-full">
          <div className="w-full overflow-hidden rounded-2xl my-6 bg-foreground text-text py-2">
          <input
                  className="h-9 w-full border-b border-layer bg-transparent p-3 placeholder:text-textAlt focus:outline-none"
                  type="text"
                  name="title"
                  placeholder={post.title}
            />
            <input
                  className="h-9 w-full bg-transparent px-3 py-6 placeholder:text-textAlt focus:outline-none"
                  type="text"
                  name="body"
                  placeholder={post.content}
            />
          </div>
        </div>
      )}
        <div className="flex justify-between items-center text-2xl text-textAlt">
        <div className='flex gap-6'>
          <Button loading={addLike.isLoading} onClick={() => addLike.mutate()}>
            <i className="fa-regular fa-heart transition-colors duration-150 hover:text-quaternary" />
          </Button>
          <Button
            loading={comments.isLoading}
            onClick={() => setShowComments(!showComments)}
          >
            <i
              className={clsx(
                'fa-regular fa-comment-dots transition-colors duration-150 ',
                showComments ? 'text-tertiary' : 'hover:text-tertiary',
              )}
            />
          </Button>
        </div>
        <div className="flex gap-2 text-xs">
          {post?.categories.map((category, idx) => (
            <span
              className="rounded-xl bg-primary/5 px-2 py-1 text-primary"
              key={idx}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <form
        className="mt-6 border-t border-layer pt-4"
        onSubmit={submitComment}
      >
        {showComments && comments.isFetched && (
          <div
            className={clsx(
              'mb-4 max-h-48 min-h-0 flex-col gap-3 overflow-y-auto',
              comments.data.data.comments.length ? 'flex' : 'hidden',
            )}
          >
            {comments.data.data.comments.map((comment) => (
              <div className="flex items-center gap-4" key={comment.id}>
                <Image
                  className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
                  src="profile image"
                  alt="profile image"
                  loader={() => author.profileImage}
                  width={40}
                  height={40}
                />
                <div className="flex flex-col gap-1">
                  <p className="flex gap-2 text-text">
                    <span className="font-bold">
                      {comment.author.displayName}
                    </span>
                    {comment.comment}
                  </p>
                  <span className="flex items-center gap-2 text-xs text-textAlt">
                    <Button className="flex text-sm">
                      <i className="fa-regular fa-heart transition-colors duration-150 hover:text-quaternary" />
                    </Button>
                    {formatDistance(new Date(comment.published), new Date(), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
        {!editPost && (
          <div className="flex gap-4">
          <Image
            className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            loader={() => author.profileImage}
            width={40}
            height={40}
          />
          <div className="flex w-full overflow-hidden rounded-2xl bg-foreground">
            <input
              ref={commentInputRef}
              name="comment"
              className="w-full bg-transparent px-4 py-3 text-text placeholder:text-textAlt/20 focus:outline-none"
              placeholder="Write a cool comment."
            />
            <Button
              type="submit"
              loading={addComment.isLoading}
              className="px-4 text-textAlt transition-colors hover:text-primary"
            >
              <i className="fa-solid fa-paper-plane" />
            </Button>
          </div>
        </div>
        )}
        {editPost && (
          <div>
            <Button
                  onClick={() => setEditPost(!editPost)}
                  className="rounded-2xl bg-layer px-6 py-2 mr-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
                >
                  Cancel
            </Button>
            <Button
                  type="submit"
                  //loading={createPost.isLoading}
                  className="rounded-2xl bg-layer px-6 py-2 text-textAlt transition-colors hover:bg-primary hover:text-black"
                >
                  Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
