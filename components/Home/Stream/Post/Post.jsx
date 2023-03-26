import { useState, useRef } from 'react';
import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { formatDistance } from 'date-fns';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';

//components
import Button from '@epicapp/components/Button';
import Comment from './Comment';

//services
import { getComments, newComment } from '@epicapp/services/comment';
import { getLikes, newLike } from '@epicapp/services/like';

export default function Post({ post, author, liked }) {
  const commentInputRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const queryClient = useQueryClient();
  const isLiked = liked?.includes(post.id);

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
      showComments &&
        queryClient.setQueryData(['comments', post.id], (oldData) => ({
          ...oldData,
          data: {
            ...oldData.data,
            comments: [...oldData.data.comments, data.data],
          },
        }));
    },
  });

  //like mutation
  const addPostLike = useMutation((post) => newLike(post), {
    onSuccess() {
      //update cache
      queryClient.setQueryData(['liked', author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: [...oldData.data.items, { object: post.id }],
        },
      }));
    },
  });

  const submitComment = (e) => {
    e.preventDefault();
    addComment.mutate({
      type: 'comment',
      contentType: 'text/plain',
      comment: e.target.comment.value,
      author: author.id,
      post: post.id,
    });
  };

  const submitLike = () => {
    addPostLike.mutate({
      type: 'Like',
      author: author.id,
      post: post.id,
    });
  };

  return (
    <div key={post.id} className="rounded-3xl bg-surface p-4">
      <div className="flex gap-4">
        {post.author?.profileImage ? (
          <Image
            className="self-start overflow-hidden rounded-full border-4 border-background object-cover"
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
        <div className="w-full">
          <div className="flex justify-between">
            <span className="text-textAlt">@{post.author.displayName}</span>
            <div
              title={post.author.host}
              className={clsx(
                'mt-1 w-max items-center gap-2 rounded-xl bg-primary/10 px-2 text-xs text-primary',
                process.env.NEXT_PUBLIC_API.includes(post.author.host)
                  ? 'hidden'
                  : 'flex',
              )}
            >
              <i className="fa-solid fa-square-up-right" /> {post.author.host}
            </div>
          </div>
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
      </div>
      <div className="my-8">
        {post.contentType.includes('image/') && (
          <div className="relative h-96 w-full">
            <Image
              alt={post.description}
              src={post.content}
              className="rounded-2xl object-cover"
              fill={true}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
            />
          </div>
        )}
        {post.contentType === 'text/plain' && (
          <div className="text-text">{post.content}</div>
        )}
        {post.contentType === 'text/markdown' && (
          <ReactMarkdown children={post.content} className="text-text" />
        )}
      </div>
      <div className="flex items-center justify-between text-2xl text-textAlt">
        <div className="flex gap-6">
          <Button
            disabled={!author || isLiked}
            loading={addPostLike.isLoading}
            onClick={() => submitLike(post.id)}
          >
            <i
              className={clsx(
                'transition-colors duration-150',
                isLiked
                  ? 'fa-solid fa-heart text-[#880808]'
                  : 'fa-regular fa-heart hover:text-[#880808]',
              )}
            />
          </Button>
          <Button
            disabled={!author}
            loading={comments.isLoading}
            onClick={() => setShowComments(!showComments)}
          >
            <i
              className={clsx(
                'fa-regular fa-comment-dots transition-colors duration-150 ',
                showComments ? 'text-white' : 'hover:text-white',
              )}
            />
          </Button>
        </div>
        <div className="flex gap-2 text-xs">
          {post?.categories.map((category, idx) => (
            <span className="rounded-xl text-textAlt" key={idx}>
              {category}
            </span>
          ))}
        </div>
      </div>
      <form
        className={clsx(
          'mt-6 border-t border-layer pt-4',
          author ? 'block' : 'hidden',
        )}
        onSubmit={submitComment}
      >
        {showComments && comments.isFetched && (
          <div
            className={clsx(
              'mb-4 max-h-48 min-h-0 flex-col gap-3 overflow-y-scroll',
              comments.data.data.comments.length ? 'flex' : 'hidden',
            )}
          >
            {comments.data.data.comments.map((comment) => (
              <Comment
                key={comment.id}
                author={author}
                comment={comment}
                liked={liked}
              />
            ))}
          </div>
        )}
        <div className="flex gap-4">
          <Image
            className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
            src="profile image"
            alt="profile image"
            loader={() => author?.profileImage}
            width={40}
            height={40}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
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
      </form>
    </div>
  );
}
