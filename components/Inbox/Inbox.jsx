import Stream from '../Home/Stream';

export default function Inbox({ author }) {
  return (
    <section className="absolute right-0 top-full mt-5 w-96 rounded-xl shadow-2xl overflow-hidden">
      <Stream author={author} isInbox={true} />
    </section>
  );
}
