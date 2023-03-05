import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  return (
    <div className="w-full overflow-hidden rounded-xl bg-surface">
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
                src="profile image"
                loader={() =>
                  'https://api.multiavatar.com/c83779f7491ce19ad6.png'
                }
                width={150}
                height={150}
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
        <h2 className="text-2xl font-semibold text-text">John Appleseed</h2>
        <p className="my-1 text-lg text-textAlt">Author</p>
        <hr className="my-6 border-background" />
        <Link
          href="/profile"
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-layer text-xl text-textAlt transition-all hover:scale-105 hover:bg-primary hover:text-black"
        >
          My Profile
        </Link>
      </div>
    </div>
  );
}
