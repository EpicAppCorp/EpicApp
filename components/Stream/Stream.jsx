import Card from '../Card';
import React, { useState, useEffect } from 'react';
import Post from './Post';
import axios from 'axios';
import sendIcon from "./assets/send-icon.png"

export default function Stream() {
  const [stream, setStream] = useState([]);
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/authors/c2900cf7-a019-48f7-822a-ffa4023aba91/inbox")
    .then((res) =>  {
        setStream({
            items: res.data,
            DataisLoaded: true
        });
    })
  }, [setStream]);

  return (
    <Card>
      <div className="divide-y ...">
      {
        stream.items?.items?.map((post) => {
          if (post.type === "post") {
            return (
              <Post key={post.id} post={post} />
            )
          }
        })
      }
      </div>
    </Card>
  )
}
