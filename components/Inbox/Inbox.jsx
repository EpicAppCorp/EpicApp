import Stream from '../Home/Stream';

export default function Inbox({ author }) {
  return (
    <section className="absolute right-0 overflow-y-auto top-full mt-2 w-96 h-[35.1rem] bg-surface rounded-xl shadow-2xl overflow-hidden border border-layer select-none">
      <Stream author={author} isInbox={true} />
    </section>
  );
}
