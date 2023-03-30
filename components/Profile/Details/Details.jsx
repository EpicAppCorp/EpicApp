import Image from 'next/image';

//componenets
import Button from '@epicapp/components/Button';

export default function Details({ auth, author }) {
  const following = auth.following.includes(author.url);
  const follower = auth.followers.includes(author.url);

  return (
    <div className="w-full overflow-hidden rounded-xl bg-surface shadow-xl">
      <div className="h-32 w-full bg-primary" />
      <div className="relative h-32 w-full">
        <div className="absolute w-full -translate-y-1/2 px-12">
          <div className="flex justify-between">
            <div className="flex">
              {author.profileImage ? (
                <Image
                  className="aspect-square overflow-hidden rounded-full border-8 border-background object-cover"
                  alt="profile image"
                  src="profile image"
                  loader={() => author.profileImage}
                  width={144}
                  height={144}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                  priority={true}
                />
              ) : (
                <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-7xl text-textAlt">
                  <i className="fa-solid fa-question" />
                </div>
              )}
              <div className="my-4 flex flex-col justify-center self-end px-4">
                <h2 className="text-2xl font-semibold text-text">
                  @{author.displayName}
                </h2>
                <p className="text-xs text-textAlt">{author.host}</p>
              </div>
            </div>
            <div className="flex gap-2 text-lg">
              {auth.url !== author.url && (
                <Button className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105">
                  {following ? 'Unfollow' : 'Follow'}
                </Button>
              )}
              {follower && (
                <Button className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105">
                  Remove follower
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
