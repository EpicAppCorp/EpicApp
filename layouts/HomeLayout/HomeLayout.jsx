//components
import Navbar from '@epicapp/components/Navbar';

export default function HomeLayout({ children, route, author }) {
  return (
    <div className="h-full w-full px-8 py-4 font-sans">
      <Navbar author={author} route={route} />
      <div className="py-8">{children}</div>
    </div>
  );
}
