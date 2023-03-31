import { useMutation, useQueryClient } from 'react-query';

//components
import Stream from '../Home/Stream';
import Button from '../Button';

//services
import { clearInbox } from '@epicapp/services/inbox';

export default function Inbox({ author }) {
  const queryClient = useQueryClient();

  const deleteInbox = useMutation(() => clearInbox(author.id), {
    onSuccess() {
      queryClient.setQueryData(['inbox', author?.id], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          items: [],
        },
      }));
    },
  });

  return (
    <section className="absolute right-0 top-full mt-2 select-none">
      <div className="relative">
        <div className="absolute -bottom-6 left-1/2 mt-3 flex -translate-x-1/2 translate-y-1/2 justify-center shadow-2xl">
          {queryClient
            ?.getQueryData(['inbox', author.id])
            ?.data?.items?.filter(({ type }) => type !== 'post').length ? (
            <Button
              loading={deleteInbox.isLoading}
              onClick={() => deleteInbox.mutate()}
              className="flex items-center text-sm gap-1 rounded-xl bg-text px-4 py-1 text-black transition-colors hover:bg-primary duration-150"
            >
              <i className="fa-regular fa-trash text-xs" />
              Clear Inbox
            </Button>
          ) : null}
        </div>
        <div className="max-h-[35.1rem] min-h-0 w-96 overflow-hidden overflow-y-auto rounded-xl border border-foreground bg-surface shadow-2xl">
          <Stream author={author} isInbox={true} />
        </div>
      </div>
    </section>
  );
}
