import { useQuery } from 'react-query';
import Image from 'next/image';

//components
import Post from '@epicapp/components/Home/Stream/Post';
import Comment from '@epicapp/components/Home/Stream/Post/Comment';

//services
import { getLiked } from '@epicapp/services/like';
import { getItem } from '@epicapp/services/inbox';

export default function Activity({ author, auth, authLiked }) {
  // author profile likes
  const liked = useQuery(['liked', author?.id], () => getLiked(author.url), {
    staleTime: 10000,
  });

  if (liked.isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-8 text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );
  }

  if (!liked.data?.data?.items?.length)
    return (
      <p className="text-center text-sm text-textAlt">
        {auth.url === author.url
          ? "You havent liked anything... you're probably a mean person :("
          : "This author hasn't liked anything yet, seems to be a cold hearted person."}
      </p>
    );

  return (
    <section className="flex flex-col gap-6">
      {liked.data?.data?.items?.map((like) => (
        <ActivityItem
          key={like.id}
          like={like}
          author={author}
          auth={auth}
          liked={liked.data?.data?.items}
          authLiked={authLiked}
        />
      ))}
    </section>
  );
}

function ActivityItem({ like, author, liked, auth, authLiked }) {
  const likedItem = useQuery(
    ['item', like.object],
    () => getItem(like.object),
    {
      staleTime: Infinity,
    },
  );

  if (likedItem.isLoading) {
    return (
      <div className="flex h-full items-center justify-center py-8 text-9xl text-primary">
        {/* // maybe a ekelton loading animation here? */}
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-4 rounded-t-xl bg-layer px-4 py-1 text-text">
        {author?.profileImage ? (
          <div className="relative">
            <Image
              className="aspect-square self-start overflow-hidden rounded-full border-4 border-background object-cover"
              src="profile image"
              alt="profile image"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              loader={() => author.profileImage}
              width={40}
              height={40}
              priority={true}
            />
            <i className="fa-solid fa-heart absolute left-7 top-4 text-lg text-[#880808]" />
          </div>
        ) : (
          <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-3xl text-textAlt">
            <i className="fa-solid fa-question" />
          </div>
        )}
        <p>
          {author.displayName} liked a{' '}
          {like.object.includes('comment') ? 'comment' : 'post'}
        </p>
      </div>
      <div>
        {like.object.includes('comment') ? (
          <div className="rounded-b-2xl bg-surface px-4 py-2">
            <Comment
              author={author}
              comment={likedItem?.data?.data}
              liked={authLiked}
            />
          </div>
        ) : (
          <Post
            post={likedItem?.data?.data}
            author={auth}
            type="LIKES"
            liked={authLiked}
          />
        )}
      </div>
    </div>
  );
}
