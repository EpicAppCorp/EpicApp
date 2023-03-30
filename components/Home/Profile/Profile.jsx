import { useMutation } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';

//components
import Button from '@epicapp/components/Button';

//services
import { logoutAuthor } from '@epicapp/services/author';

export default function Profile({ author }) {
  const logout = useMutation(() => logoutAuthor(), {
    onSuccess() {
      window.location.reload();
    },
  });

  if (!author)
    return (
      <div className="sticky top-[4.55rem] w-full overflow-hidden rounded-xl bg-surface">
        <div className="h-32 w-full bg-primary" />
        <div className="relative h-24 w-full">
          <div className="absolute flex w-full -translate-y-1/2 justify-center">
            <div className="flex justify-center">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-8 border-layer bg-background object-cover text-6xl text-textAlt">
                <i className="fa-regular fa-user" />
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4 text-center text-textAlt">
          Create and account for a better experience
        </div>
      </div>
    );

  return (
    <div className="sticky top-20 w-full overflow-hidden rounded-xl bg-surface">
      <div className="h-32 w-full bg-primary" />
      <div className="relative h-24 w-full">
        <div className="absolute grid w-full -translate-y-1/2 grid-cols-3">
          <Link
            href={{ pathname: '/explore', query: { filter: 'FOLLOWERS' } }}
            className="self-end text-center"
          >
            <h6 className="text-2xl text-text hover:underline hover:underline-offset-4">
              {author.followers.length}
            </h6>
            <span className="text-lg text-textAlt">Followers</span>
          </Link>
          <div className="flex justify-center">
            <Image
              className="overflow-hidden rounded-full border-8 border-background object-cover"
              alt="profile image"
              src="profile image"
              loader={() => author.profileImage}
              width={144}
              height={144}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              priority={true}
            />
          </div>
          <Link
            href={{ pathname: '/explore', query: { filter: 'FOLLOWING' } }}
            className="self-end text-center"
          >
            <h6 className="text-2xl text-text hover:underline hover:underline-offset-4">
              {author.following.length}
            </h6>
            <span className="text-lg text-textAlt">Following</span>
          </Link>
        </div>
      </div>
      <div className="px-8 py-4 text-center">
        <h2 className="text-2xl font-semibold text-text">
          @{author.displayName}
        </h2>
        <p className="my-1 text-lg text-textAlt">Author</p>
        <hr className="my-6 border-layer" />
        <div className="flex gap-4">
          <Link
            href={{ pathname: '/details', query: { id: author.url } }}
            className="flex h-14 w-full items-center justify-center rounded-2xl bg-layer text-xl text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
          >
            My Profile
          </Link>
          <Button
            loading={logout.isLoading}
            onClick={() => logout.mutate()}
            className="rounded-2xl bg-layer px-4 text-xl text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
          >
            <i className="fa-regular fa-right-from-bracket" />
          </Button>
        </div>
      </div>
    </div>
  );
}
