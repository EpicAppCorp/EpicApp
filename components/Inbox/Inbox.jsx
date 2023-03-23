import Stream from '../Home/Stream';

export default function Inbox({ author }) {
  return (
    <section className="absolute left-1/2 top-full mt-5 -translate-x-1/2 w-96 rounded-xl shadow-2xl overflow-hidden">
      <Stream author={author} isInbox={true} />
    </section>
  );
}
