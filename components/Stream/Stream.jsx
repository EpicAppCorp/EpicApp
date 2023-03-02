import Card from '../Card';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import sendIcon from "./assets/send-icon.png"

export default function Stream() {
  const [stream, setStream] = useState([]);
  const [objContent, setObjectContent] = useState()
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/authors/c2900cf7-a019-48f7-822a-ffa4023aba91/inbox")
    .then((res) =>  {
        setStream({
            items: res.data,
            DataisLoaded: true
        });
    })
  }, [setStream]);
  console.log(stream.items);

  

  return (
    <Card>
      <div className="divide-y ...">
      {
        stream.items?.items?.map((post) => {
          if (post.type === "post") {
            return (
              <Post post={post} />
            )
          }
          if (post.type === "comment") {
            return (
              <div>
                <div className="p-4 text-gray-900 md:text-2xl">
                  {post.author.displayName} commented:
                </div>
                <div className="ml-4">
                  {post.comment}
                </div>
              </div>
            )
          }
          // <div key={post.id} className="m-auto p-5 ">
          //   <div>{post.summary}</div>
          //   { 
          //     <div>
          //       {
          //         post.objectContent?.description
          //       }
          //     </div>
          //   }
          // </div>
        })
      }
      </div>
    </Card>
  )
}
