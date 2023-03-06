import Card from '@epicapp/components/Card';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AppContext from '@epicapp/context/AppContext';

export default function CreatePost() {

  const [content, setContent] = useState('');
  const [user, setUser] = useContext(AppContext);
  const authorEndpoint = user.host + "api/authors/" + user.id;;

  const createPost = (e) => {
    e.preventDefault();
    axios.post(authorEndpoint + "/posts", {
      "title": "Hard Coded Title",
      "source": "http://localhost:8000",
      "origin": "http://localhost:8000",
      "description": "This is a test Description",
      "content": content,
      "contentType": "text/plain",
      "published": "uhhh",
      "visibility": "PUBLIC",
      "categories": ["something", "anothring thing"],
      "author": {
        "type": "author",
        "id": user.id, // Temporarily hardcoded
        "host": user.host,
        "displayName": user.displayName,
        "url": user.url,
        "github": user.github,
        "profile_image": user.profile_image
      }
    }).then((res) => {
      console.log('Posting data', res);
      axios.post(authorEndpoint + "/inbox", {
        "@context": "https://www.w3.org/ns/activitystreams",
        "title": "Hard Coded Title",
        "source": "http://localhost:8000",
        "origin": "http://localhost:8000",
        "content": content,
        "contentType": "text/plain",
        "type": "post",
        "author": {
          "type": "author",
          "id": user.id, // Temporarily hardcoded
          "host": user.host,
          "displayName": user.displayName,
          "url": user.url,
          "github": user.github,
          "profile_image": user.profile_image
        },
        "object": res.data.id
      })  
    })
      .catch(err => console.log(err))
  }
  
    return (
      <Card>
        <div className="flex gap-2">
          <div>
            <div className="w-12">
              photo
            </div>
          </div>
          <textarea 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="grow py-3" placeholder={"What's on your mind?"} />
        </div>
        <div className="flex gap-3 item-center mt-3 pd-6">
          <div>
            <button className="flex gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Upload Photo
            </button>
          </div>
          <div className="grow text-right">
            <button onClick={createPost} className="bg-submitBg text-white px-4 py-1 rounded-md">
              Share
            </button>
          </div>
        </div>
      </Card>
    )
  }
  