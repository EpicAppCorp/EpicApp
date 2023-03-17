import { useQuery, useMutation, useQueryClient } from 'react-query';

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
        profile_image: author.profile_image,
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
        profile_image: author.profile_image,
      },
      object: post.id,
    });
  };

  return (
    <div key={post.id} className="rounded-3xl bg-surface">
      <div className="m-4 font-bold text-text md:text-2xl">{post.title}</div>
      {post.contentType === 'image/jpeg;base64' && (
        <div className="m-4">
          <img
            src={post.content}
            className="w3-left w3-circle w3-margin-right"
            width="400px"
            height="300px"
          />
        </div>
      )}
      {post.contentType === 'text/plain' && (
        <div className="m-4">{post.content}</div>
      )}
      <form className="mb-4 flex flex-row" onSubmit={submitComment}>
        <div>
          <input
            name="comment"
            className="ml-4 mr-2 grow py-2 pl-2"
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
        <div className="m-4">
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
