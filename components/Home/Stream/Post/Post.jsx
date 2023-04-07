import { useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { formatDistance } from 'date-fns';

//components
import Button from '@epicapp/components/Button';
import EditPost from '../EditPost/EditPost';
import Comment from './Comment';

//services
import { getComments, newComment } from '@epicapp/services/comment';
import { getLikes, newLike } from '@epicapp/services/like';
import { deletePost, repost } from '@epicapp/services/post';
import { iconMap } from '@epicapp/utils/visibility';

export default function Post({ post, author, liked, type }) {
  const postId = post.id.includes('http') ? post.id : post.origin;
  const queryClient = useQueryClient();
  const isLiked = liked?.includes(postId);

  const commentInputRef = useRef(null);
  const [showComments, setShowComments] = useState(false);
  const [optionsDropdown, setOptionsDropdown] = useState(false);
  const [editMode, setEditMode] = useState(false);

  //get all comments
  const comments = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: showComments,
    onSuccess: (data) => {
      queryClient.setQueryData(['comments', postId], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          comments: data.data.comments ?? data.data.items,
        },
      }));
    },
  });

  // get likes
  const likes = useQuery({
    queryKey: ['likes', postId],
    queryFn: () => getLikes(postId),
  });

  //comment mutation
  const addComment = useMutation(
    (comment) => newComment(author, { ...post, id: postId, comment }),
    {
      onMutate: async (comment) => {
        commentInputRef.current.value = '';

        await queryClient.cancelQueries({ queryKey: ['comments', postId] });

        showComments &&
          queryClient.setQueryData(['comments', postId], (oldData) => ({
            ...oldData,
            data: {
              ...oldData.data,
              comments: [
                ...oldData.data.comments,
                {
                  author,
                  comment,
                  id: post.id,
                  contentType: 'text/markdown',
                  published: new Date().toISOString(),
                  type: 'comment',
                },
              ],
            },
          }));
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      },
    },
  );

  //like mutation
  const addPostLike = useMutation(
    () => newLike(author, { ...post, object: postId }),
    {
      onSuccess() {
        //update cache
        queryClient.setQueryData(['liked', author?.id], (oldData) => {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              items: [...oldData.data.items, { object: postId }],
            },
          };
        });
        queryClient.setQueryData(['likes', postId], (oldData) => ({
          ...oldData,
          data: {
            ...oldData.data,
            items: [...oldData.data.items, { object: postId }],
          },
        }));
      },
    },
  );

  const newRepost = useMutation(() => repost(author, { ...post }));

  const delPost = useMutation(() => deletePost(postId), {
    onSuccess() {
      //update cache
      queryClient.setQueryData(['posts', post.author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: oldData.data.items.filter((p) => p.id !== postId),
        },
      }));
      setOptionsDropdown(false);
    },
  });
  if (editMode)
    return <EditPost post={post} type={type} back={() => setEditMode(false)} />;

  return (
    <div className="relative">
      {post.source !== post.origin ? (
        <div className="absolute right-[-12px] top-[-13px] rounded-xl bg-primary px-2">
          Repost
        </div>
      ) : null}
      <div
        className={clsx(
          'bg-surface p-4',
          type !== 'LIKES' ? 'rounded-3xl' : 'rounded-b-3xl',
        )}
      >
        <div className="flex gap-4">
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
          <div className="w-full">
            <div className="relative flex justify-between">
              <Link
                href={{ pathname: '/details', query: { id: post.author.id } }}
                className="flex items-center gap-1 text-textAlt transition-colors duration-150 hover:text-primary"
              >
                @{post.author.displayName}
              </Link>
              <div
                title={post.author.host}
                className={clsx(
                  'mt-1 w-max items-center gap-2 rounded-xl bg-primary/10 px-2 text-xs text-primary',
                  !process.env.NEXT_PUBLIC_API.includes(post.author.host) &&
                    type === 'INBOX'
                    ? 'flex'
                    : 'hidden',
                )}
              >
                <i className="fa-solid fa-square-up-right" /> {post.author.host}
              </div>
              <div className="absolute right-0 h-10 w-10">
                <div
                  onClick={() => setOptionsDropdown(!optionsDropdown)}
                  className="relative flex h-full w-full cursor-pointer items-center justify-center rounded-full hover:bg-layer"
                >
                  <i className="fa-regular fa-ellipsis text-2xl text-textAlt" />

                  {optionsDropdown && (
                    <ul className="absolute right-0 top-full z-50 w-max overflow-hidden rounded-xl bg-background text-sm">
                      <li>
                        <Button
                          onClick={() => {
                            navigator.clipboard.writeText(
                              window.location.origin + `/post?postId=${postId}`,
                            );
                          }}
                          className="flex h-full w-full items-center gap-2 px-6 py-2 text-text transition-colors duration-150 hover:bg-primary hover:text-black"
                          href="/profile"
                        >
                          <i className="fa-solid fa-link" />
                          Copy Link
                        </Button>
                      </li>
                      <li
                        className={clsx(
                          post.author.id === author?.id && type === 'TIMELINE'
                            ? 'block'
                            : 'hidden',
                        )}
                      >
                        <Button
                          onClick={() => setEditMode(true)}
                          className="flex h-full w-full items-center gap-2 px-6 py-2 text-text transition-colors duration-150 hover:bg-primary hover:text-black"
                          href="/profile"
                        >
                          <i className="fa-solid fa-pencil col-span-2" />
                          Edit
                        </Button>
                      </li>
                      <li
                        className={clsx(
                          post.author.id === author?.id && type === 'TIMELINE'
                            ? 'block'
                            : 'hidden',
                        )}
                      >
                        <Button
                          loading={delPost.isLoading}
                          onClick={() => delPost.mutate()}
                          className="flex h-full w-full items-center gap-2 px-6 py-2 text-text transition-colors duration-150 hover:bg-primary hover:text-black"
                        >
                          <i className="fa-regular fa-trash col-span-2" />
                          Delete
                        </Button>
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text">{post.title}</h1>
              <i
                title={post.unlisted ? 'UNLISTED' : post.visibility}
                className={
                  'text-textAlt ' +
                  iconMap[post.unlisted ? 'UNLISTED' : post.visibility]
                }
              />
              <span className="text-xs font-light text-primary before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:content-['']">
                {formatDistance(new Date(post.published), new Date(), {
                  addSuffix: true,
                })}
              </span>
            </div>
            <p className="text-xs text-textAlt">{post.description}</p>
          </div>
        </div>
        <div
          className={clsx(
            'my-8',
            post.contentType.includes('image/') &&
              'overflow-hidden rounded-2xl bg-background',
          )}
        >
          {post.contentType.includes('image/') && (
            <div className="relative h-96 w-full">
              <Image
                alt={post.description}
                src={post.content}
                className="object-contain"
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
            <ReactMarkdown
              className={clsx(
                'relative h-96 w-full text-text',
                post.content.includes('<img src') ? 'h-96' : 'h-full',
              )}
              components={{
                img: (props) => (
                  <Image
                    src={props.src}
                    className="rounded-2xl object-cover"
                    alt={props.alt}
                    loader={() => props.src}
                    fill={true}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                    quality={100}
                  />
                ),
              }}
            >
              {post.content.includes('<img src')
                ? '![](' + post.content.split('"')[1] + ')'
                : post.content}
            </ReactMarkdown>
          )}
        </div>
        <div className="flex items-center justify-between text-xl text-textAlt">
          <div className="flex gap-4">
            <Button
              className="flex items-center"
              disabled={!author || isLiked}
              loading={addPostLike.isLoading | likes.isLoading}
              onClick={() => addPostLike.mutate()}
            >
              <i
                className={clsx(
                  'transition-colors duration-150',
                  isLiked
                    ? 'fa-solid fa-heart text-[#880808]'
                    : 'fa-regular fa-heart hover:text-[#880808]',
                )}
              />
              {likes.data?.data?.items.length ? (
                <span className="pl-2 text-base">
                  {likes.data?.data?.items.length}
                </span>
              ) : null}
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
            <Button
              disabled={!author}
              loading={newRepost.isLoading}
              onClick={() => newRepost.mutate()}
            >
              <i className="fa-regular fa-repeat transition-colors duration-150 hover:text-white" />
            </Button>
          </div>
          <div className="flex gap-2 text-xs">
            {[
              ...(typeof post.categories === 'string'
                ? [post.categories]
                : post.categories),
            ].map((category, idx) => (
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
          onSubmit={(e) => {
            e.preventDefault();
            return addComment.mutate(e.target.comment.value);
          }}
        >
          {showComments && comments.isFetched && (
            <div
              className={clsx(
                'mb-4 max-h-48 min-h-0 flex-col gap-3 overflow-y-auto',
                comments.data?.data?.comments?.length ? 'flex' : 'hidden',
              )}
            >
              {comments.data?.data?.comments?.map((comment) => (
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
              className="aspect-square self-center overflow-hidden rounded-full border-4 border-background object-cover"
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
    </div>
  );
}
