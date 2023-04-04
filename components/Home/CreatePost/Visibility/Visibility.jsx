import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button/Button';

//utils
import { iconMap } from '@epicapp/utils/visibility';

export default function Visibility({ visibility, setVisibility }) {
  return (
    <div className="relative">
      <Button
        type="button"
        onClick={() => setVisibility({ ...visibility, open: !visibility.open })}
        className="flex w-full justify-center gap-2 py-4 text-lg text-textAlt"
      >
        <i className={iconMap[visibility.type]} />
        <i
          className={clsx(
            'text-sm',
            visibility.open
              ? 'fa-regular fa-solid fa-caret-up'
              : 'fa-regular fa-solid fa-caret-down',
          )}
        />
      </Button>
      {visibility.open && (
        <ul className="absolute left-1/2 top-10 z-40 -translate-x-1/2 overflow-hidden rounded-xl bg-foreground text-sm text-textAlt shadow-xl">
          <li
            className="flex cursor-pointer items-center gap-2 border-b border-b-textAlt/20 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
            onClick={() =>
              setVisibility({
                open: false,
                type: 'PUBLIC',
              })
            }
          >
            <i className="fa-regular fa-earth-asia" /> Public
          </li>
          <li
            className="flex cursor-pointer items-center gap-2 border-b border-b-textAlt/20 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
            onClick={() => {
              setVisibility(() => ({
                open: false,
                type: 'FRIENDS',
              }));
            }}
          >
            <i className="fa-regular fa-user-group" /> Friends
          </li>
          <li
            className="flex cursor-pointer items-center gap-2 border-b border-b-textAlt/20 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
            onClick={() =>
              setVisibility({
                open: false,
                type: 'PRIVATE',
              })
            }
          >
            <i className="fa-regular fa-lock" /> Private
          </li>
          <li
            className="flex cursor-pointer items-center gap-2 px-4 py-2 transition-colors duration-100 hover:bg-primary hover:text-background"
            onClick={() =>
              setVisibility({
                open: false,
                type: 'UNLISTED',
                icon: 'fa-regular fa-unlock',
              })
            }
          >
            <i className="fa-regular fa-unlock" /> Unlisted
          </li>
        </ul>
      )}
    </div>
  );
}
