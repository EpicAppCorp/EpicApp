import { useState } from 'react';
import { useMutation } from 'react-query';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '../Button';

//services
import { logoutAuthor } from '@epicapp/services/author';

export default function Navbar({ author, route, openModal }) {
  const [dropdown, setDropdown] = useState(false);

  const classBuilder = (type) => {
    return clsx(
      ' transition-all duration-150 hover:text-primary',
      route === type
        ? 'relative text-primary after:mt-4 after:absolute after:-bottom-3 after:left-1/2 after:-translate-x-1/2 after:h-2 after:w-2 after:rounded-full after:bg-primary after:content-[""]'
        : 'text-text',
    );
  };

  const logout = useMutation(() => logoutAuthor(), {
    onSuccess() {
      window.location.reload();
    },
  });

  return (
    <nav className="grid h-12 grid-cols-3 text-text">
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
        <Link className={classBuilder('INBOX')} href="/inbox">
          <i
            className={clsx(
              route === 'INBOX' ? 'fa-solid fa-bell' : 'fa-regular fa-bell',
            )}
          />
        </Link>
      </ul>
      <div className="flex items-center justify-end text-text">
        {author ? (
          <div className="relative">
            <button
              onClick={() => setDropdown(!dropdown)}
              type="button"
              className="flex w-max min-w-max max-w-2xl items-center gap-4 rounded-xl bg-surface py-2 px-4"
            >
              <Image
                className="overflow-hidden rounded-full object-cover"
                src="profile image"
                alt="profile image"
                loader={() => author.profileImage}
                width={30}
                height={30}
                priority={true}
              />
              <span className="font-normal">{author.displayName}</span>
              <i
                className={clsx(
                  'pl-2',
                  dropdown
                    ? 'fa-regular fa-solid fa-caret-up'
                    : 'fa-regular fa-solid fa-caret-down',
                )}
              />
            </button>

            {dropdown && (
              <ul className="absolute top-full right-0 mt-2 w-full overflow-hidden rounded-xl bg-surface text-base hover:shadow-lg">
                <li>
                  <Link
                    className="grid h-11 grid-cols-12 items-center gap-2 px-4 transition-colors duration-150 hover:bg-primary hover:text-black"
                    href="/profile"
                  >
                    <i className="fa-solid fa-user col-span-2 text-base" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Button
                    loading={logout.isLoading}
                    onClick={() => logout.mutate()}
                    className="grid h-11 w-full grid-cols-12 items-center gap-2 px-4 text-start transition-colors duration-150 hover:bg-primary hover:text-black"
                  >
                    <i className="fa-regular fa-right-from-bracket col-span-2" />
                    Logout
                  </Button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div>
            <Button
              onClick={() => openModal('LOGIN')}
              className="px-6 py-2 text-text transition-colors duration-150 hover:text-primary"
            >
              Login
            </Button>
            <Button
              onClick={() => openModal('SIGNUP')}
              className="rounded-2xl bg-layer px-6 py-2 text-text transition-colors duration-150 hover:bg-primary hover:text-black"
            >
              Signup
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
