import Card from '../Card';
import React, { useState, useEffect, useContext } from 'react';
import Post from './Post';
import axios from 'axios';
import AppContext from '@epicapp/context/AppContext';

export default function Stream() {
  const [stream, setStream] = useState([]);
  const [user, setUser] = useContext(AppContext);
  const inboxEndpoint = user.host + "api/authors/" + user.id + "/inbox";

  console.log(inboxEndpoint);
  useEffect(() => {
    axios.get(inboxEndpoint)
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
            console.log(post);
            return (
              <Post key={post.id} post={post} user={user}/>
            )
          }
        })
      }
      </div>
    </Card>
  )
}
