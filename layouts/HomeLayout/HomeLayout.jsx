import Navbar from '@epicapp/components/Navbar';

export default function HomeLayout({ route }) {
  return (
    <div className="h-full w-full bg-background px-8 py-4 font-sans">
      <Navbar route={route} />
    </div>
  );
}
