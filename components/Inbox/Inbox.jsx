import Stream from '../Home/Stream';

export default function Inbox({ author }) {
  return (
    <section className="absolute right-0 top-full mt-2 w-96 bg-surface rounded-xl shadow-2xl overflow-hidden border border-layer select-none">
      <Stream author={author} isInbox={true} />
    </section>
  );
}
