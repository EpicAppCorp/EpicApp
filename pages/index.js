import Head from 'next/head';

//components
import Stream from '@epicapp/components/Stream/Stream.jsx';
import Card from '@epicapp/components/Card';
import LeftSidebar from '@epicapp/components/Navigation/LeftSidebar.jsx';
import RightSidebar from '@epicapp/components/Navigation/RightSidebar.jsx';
import CreatePost from '@epicapp/components/CreatePost/CreatePost.jsx';

export default function Home() {
  // const inbox = [
  //   {
  //     id: 123,
  //     author: 'Samir Raza',
  //     privacy: 'public',
  //     type: 'text',
  //     text: 'This is text for a post',
  //     likes: 10,
  //     comments: [
  //       {
  //         commenterId: 12,
  //         commentText: 'This is a comment',
  //       },
  //       {
  //         commenterId: 21,
  //         commentText: 'This is another comment',
  //       },
  //     ],
  //   },
  // ];
  return (
    <main className="container grid h-screen grid-cols-3">
      <div className="mx-auto flex max-w-6xl gap-6 pt-4">
        <div className="w-1/5">
          <LeftSidebar />
        </div>
        <div className="grow">
          <CreatePost />
          <Card>inbox stream...</Card>
        </div>
        <div className="w-1/5">
          <RightSidebar />
        </div>
      </div>
    </main>
  );
}
