import clsx from 'clsx';

//components
import Button from '@epicapp/components/Button';

export default function ({ filter, changeFilter, setSearch }) {
  return (
    <div className="">
      <div className="flex w-max items-center rounded-xl bg-foreground px-4 text-lg text-text">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          className="h-14 w-96 bg-transparent px-4 placeholder:text-textAlt/20 focus:outline-none"
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          id="authorDisplayName"
          name="authorDisplayName"
          placeholder="Search for an author"
          required
        />
      </div>

      <ul className="mt-8 flex justify-center gap-6">
        <li>
          <Button
            className={clsx(
              filter === 'ALL' ? 'font-semibold text-text' : 'text-textAlt',
            )}
            onClick={() => changeFilter('ALL')}
          >
            All
          </Button>
        </li>
        <li>
          <Button
            className={clsx(
              filter === 'FOLLOWERS'
                ? 'font-semibold text-text'
                : 'text-textAlt',
            )}
            onClick={() => changeFilter('FOLLOWERS')}
          >
            Followers
          </Button>
        </li>
        <li>
          <Button
            className={clsx(
              filter === 'FOLLOWING'
                ? 'font-semibold text-text'
                : 'text-textAlt',
            )}
            onClick={() => changeFilter('FOLLOWING')}
          >
            Following
          </Button>
        </li>
      </ul>
    </div>
  );
}
