import { useMutation } from 'react-query';
import Image from 'next/image';
import Link from 'next/link';

//components
import Button from '@epicapp/components/Button';

//services
import { logoutAuthor } from '@epicapp/services/author';

export default function Profile({ author}) {

  const logout = useMutation(() => logoutAuthor(), {
    onSuccess() {
      window.location.reload();
    },
  });

  if (!author)
    return (
      <div className="sticky top-10 w-full overflow-hidden rounded-xl bg-surface">
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
          Create an account for a better experience
        </div>
      </div>
    );

  return (
    <div className={`sticky top-10 w-full overflow-hidden rounded-t-3xl rounded-b-none bg-surface`}>
      <div className="h-32 w-full bg-primary" />
      <div>
        <div className="relative h-24 w-full">
          <div className="absolute grid w-full -translate-y-1/2 grid-cols-3">
            <div className="self-end text-center">
              <h6 className="text-2xl text-text">123</h6>
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
              <h6 className="text-2xl text-text">136</h6>
              <span className="text-lg text-textAlt">Following</span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 py-4 text-center">
        <h2 className="text-2xl font-semibold text-text">
          {author.displayName}
        </h2>
      </div>
    </div>
  );
}
