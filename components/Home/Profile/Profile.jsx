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
      <div className="sticky top-24 w-full overflow-hidden rounded-xl bg-surface">
        <div className="h-32 w-full bg-primary" />
        <div className="relative h-24 w-full">
          <div className="absolute flex w-full -translate-y-1/2 justify-center">
            <div className="flex justify-center">
              <div className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border-8 border-layer bg-background object-cover text-6xl text-textAlt">
                <i className="fa-solid fa-user" />
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
    <div className="sticky top-24 w-full overflow-hidden rounded-xl bg-surface">
      <div className="h-32 w-full bg-primary" />
      <div className="relative h-24 w-full">
        <div className="absolute grid w-full -translate-y-1/2 grid-cols-3">
          <div className="self-end text-center">
            <h6 className="text-2xl text-text">{author.followers}</h6>
            <span className="text-lg text-textAlt">Followers</span>
          </div>
          <div className="flex justify-center">
            <Image
              className="overflow-hidden rounded-full border-8 border-background object-cover"
              alt="profile image"
              src="profile image"
              loader={() => author.profileImage}
              width={144}
              height={144}
              priority={true}
            />
          </div>
          <div className="self-end text-center">
            <h6 className="text-2xl text-text">{author.following}</h6>
            <span className="text-lg text-textAlt">Following</span>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 text-center">
        <h2 className="text-2xl font-semibold text-text">
          {author.displayName}
        </h2>
        <p className="my-1 text-lg text-textAlt">Author</p>
        <hr className="my-6 border-layer" />
        <div className="flex gap-4">
          <Link
            href="/profile"
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
