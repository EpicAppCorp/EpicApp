import { useState } from 'react';
import { useMutation } from 'react-query';
import Link from 'next/link';
import Image from 'next/image';
import clsx from 'clsx';

//components
import Button from '../Button';
import Inbox from '@epicapp/components/Inbox';

//services
import { logoutAuthor } from '@epicapp/services/author';

export default function Navbar({ author, route, openModal }) {
  const [dropdown, setDropdown] = useState(false);
  const [inbox, setInbox] = useState(false);

  const classBuilder = (type) => {
    return clsx(
      'transition-all duration-150 hover:text-primary cursor-pointer',
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
    <nav className="sticky top-0 z-50 grid w-screen grid-cols-3 bg-background px-8 py-4 text-text">
      <div className="flex items-center">epicapp</div>
      <ul className="flex items-center justify-center gap-10 text-xl">
        <li>
          <Link className={classBuilder('HOME')} href="/">
            <i
              className={clsx(
                route === 'HOME'
                  ? 'fa-duotone fa-house'
                  : 'fa-duotone fa-house',
              )}
            />
          </Link>
        </li>
        <li>
          <Link
            className={classBuilder('PROFILE')}
            href={{
              pathname: '/details',
              query: {
                id: author?.id,
              },
            }}
          >
            <i
              className={clsx(
                route === 'PROFILE'
                  ? 'fa-duotone fa-user'
                  : 'fa-duotone fa-user',
              )}
            />
          </Link>
        </li>
        <li>
          <Link className={classBuilder('EXPLORE')} href="/explore">
            <i
              className={clsx(
                route === 'EXPLORE'
                  ? 'fa-duotone fa-magnifying-glass'
                  : 'fa-duotone fa-magnifying-glass',
              )}
            />
          </Link>
        </li>
      </ul>
      <div className="flex items-center justify-end text-text">
        {author ? (
          <div className="relative flex items-center gap-6">
            <div>
              <i
                onClick={() => setInbox(!inbox)}
                className={clsx(
                  'cursor-pointer text-xl',
                  inbox
                    ? 'fa-solid fa-bell text-primary'
                    : 'fa-regular fa-bell hover:animate-bellshake hover:text-primary',
                )}
              />
              {inbox && <Inbox author={author} />}
            </div>
            <button
              onClick={() => setDropdown(!dropdown)}
              type="button"
              className="flex w-max min-w-max max-w-2xl items-center gap-4 rounded-xl bg-surface px-4 py-2"
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
              <ul className="absolute right-0 top-full mt-2 w-full overflow-hidden rounded-xl bg-surface text-base shadow-2xl">
                <li>
                  <Link
                    className="grid h-11 grid-cols-12 items-center gap-2 px-4 transition-colors duration-150 hover:bg-primary hover:text-black"
                    href={{ pathname: '/details', query: { id: author.url } }}
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
              onClick={() => openModal('Sign In')}
              className="px-6 py-2 text-text transition-colors duration-150 hover:text-primary"
            >
              Login
            </Button>
            <Button
              onClick={() => openModal('Signup')}
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
