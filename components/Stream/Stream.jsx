export default function Stream({ inbox }) {
  return (
    <div>
      {inbox.map((post) => (
        <div key={post.id}>
          <h1>{post.author}</h1>
          <p>{post.text}</p>
          <div>
            Likes: {post.likes}
            <button className="p-3">Like</button>
          </div>
        </div>
      ))}
    </div>
  );
}
