import Image from 'next/image';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { formatDistance } from 'date-fns';

//services
import { getComments, newComment } from '@epicapp/services/comment';
import { getLikes, newLike } from '@epicapp/services/like';

export default function Post({ post, author }) {
  const queryClient = useQueryClient();

  //get all comments
  const comments = useQuery({
    queryKey: ['comments', post.id],
    queryFn: () => getComments(post.id),
  });

  //get likes
  const likes = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () => getLikes(post.id),
  });

  //comment mutation
  const addComment = useMutation((post) => newComment(post), {
    onSuccess(data) {
      //update cache
      queryClient.setQueryData(['comments', post.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          comments: [data.data, ...oldData.data.comments],
        },
      }));
    },
  });

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
          className="self-center overflow-hidden rounded-full border-4 border-background object-cover"
          src="profile image"
          alt="profile image"
          loader={() => author.profileImage}
          width={60}
          height={60}
          priority={true}
        />
        <div>
          <span className="text-textAlt">@{author.displayName}</span>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-text">{post.title}</h1>
            <span className="text-xs font-light text-primary before:mr-2 before:inline-block before:h-2 before:w-2 before:rounded-full before:bg-primary before:content-['']">
              {formatDistance(new Date(post.published), new Date(), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </div>
      {post.contentType === 'image/jpeg;base64' && (
        <div>
          <img
            src={post.content}
            className="w3-left w3-circle w3-margin-right"
            width="400px"
            height="300px"
          />
        </div>
      )}
      {post.contentType === 'text/plain' && (
        <div className="my-4 text-text">{post.content}</div>
      )}
      <form className="my-2 flex flex-row" onSubmit={submitComment}>
        <div>
          <input
            name="comment"
            className="py-2 px-2"
            placeholder="Comment your thoughts"
          />
        </div>
        <button
          type="submit"
          className="mr-4 rounded-md bg-submitBg px-4 py-1 text-white"
        >
          <p className="font-black">→</p>
        </button>
        <button
          type="button"
          className="rounded-md bg-submitBg px-4 py-1 text-white"
          onClick={submitLike}
        >
          <p className="font-black">♥</p>
        </button>
        {likes.isLoading ? null : (
          <div className="m-auto ml-4">Likes: {likes.data.data.length}</div>
        )}
      </form>

      {comments.isLoading ? (
        <div>lol</div>
      ) : (
        <div>
          <div>Comments:</div>
          {comments.data.data.comments.map((comment) => {
            return (
              <div key={comment.id}>
                {comment.author.displayName}: {comment.comment}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
