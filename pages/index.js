import Head from 'next/head';

//components
import Stream from '@epicapp/components/Stream/Stream.jsx';
import Card from '@epicapp/components/Card';
import LeftSidebar from '@epicapp/components/Navigation/LeftSidebar.jsx';
import RightSidebar from '@epicapp/components/Navigation/RightSidebar.jsx';
import CreatePost from '@epicapp/components/CreatePost/CreatePost.jsx';

export default function Home() {
  return (
    <div className="flex mt-4 max-w-6xl mx-auto gap-6">
      <div className="w-1/5">
        <LeftSidebar />  
      </div>
      <div className="grow">
        <CreatePost />
        <Stream />
      </div>
      <div className="w-1/5">
        <RightSidebar />  
      </div>
    </div> 
  )
}
