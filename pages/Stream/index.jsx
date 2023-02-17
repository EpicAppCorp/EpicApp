import LikeButton from "./LikeButton";

const Stream = ({ inbox }) =>
  inbox.map((post) => (
    <div key={post.id}>
      <div className="post-author">{post.author}</div>
      <div className="post-text">{post.text}</div>
      <div className="post-likes">
        Likes: {post.likes}
        <LikeButton />
      </div>
    </div>
  ));

export default Stream;
