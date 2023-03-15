import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

export default function Navbar({ author, route }) {
  const classBuilder = (type) => {
    return clsx(
      ' transition-all duration-150 hover:text-primary',
      route === type ? 'text-primary' : 'text-text',
    );
  };

  return (
    <nav className="grid grid-cols-3 text-text">
      <div className="flex items-center">epicapp</div>
      <ul className="flex items-center justify-center gap-10 text-xl">
        <li>
          <Link className={classBuilder('HOME')} href="/">
            <i
              className={clsx(
                route === 'HOME'
                  ? 'fa-solid fa-house'
                  : 'fa-regular fa-house-blank',
              )}
            />
          </Link>
        </li>
        <li>
          <Link className={classBuilder('PROFILE')} href="/profile">
            <i
              className={clsx(
                route === 'PROFILE' ? 'fa-solid fa-user' : 'fa-regular fa-user',
              )}
            />
          </Link>
        </li>
        <Link className={classBuilder('LIKES')} href="/likes">
          <i
            className={clsx(
              route === 'LIKES' ? 'fa-solid fa-heart' : 'fa-regular fa-heart',
            )}
          />
        </Link>
      </ul>
      <div className="flex justify-end text-text">
        <button
          type="button"
          className="flex w-max min-w-max max-w-2xl items-center gap-4 rounded-xl bg-surface py-2 pl-1 pr-3"
        >
          <Image
            className="overflow-hidden rounded-full object-cover"
            src="profile image"
            loader={() => author.profile_image}
            width={30}
            height={30}
          />
          <span className="font-normal">{author.displayName}</span>
          <i className="fa-regular fa-solid fa-caret-down pl-2" />
        </button>
      </div>
    </nav>
  );
}
