import Card from '@epicapp/components/Card';
import Stream from '@epicapp/components/Stream';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CreatePost() {

  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

  const createPost = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/authors/1d0110ad-51eb-48da-aaa5-def7073ac5dd/posts', {
      "title": "this is a title",
      "source": "http://localhost:8000",
      "origin": "http://localhost:8000",
      "description": "this is test 3",
      "content": content,
      "contentType": "text/plain",
      "published": "uhhh",
      "visibility": "PUBLIC",
      "categories": ["something", "anothring thing"],
      "author": {
          "type": "author",
          "id": "1d0110ad-51eb-48da-aaa5-def7073ac5dd",
          "host": "http://localhost:8000",
          "displayName": "testusername",
          "url": "http://localhost:8000",
          "github": "githubsthff",
          "profile_image": "more images stuff"
      }
    }).then(res => console.log('Posting data', res)).catch(err => console.log(err))

    setContent('')
    setImage('')

    window.location.reload(true)

  }

  function addPhotos(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setImage(reader.result)
      setContent(reader.result)
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    }
  }

    return (
      <Card>
        <div className="flex gap-2 pb-5">
          <div>
            <div className="w-12 rounded-full overflow-hidden">
              <img src="data:image/png;base64,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" alt =""/>
            </div>
          </div>
          {image.length > 0 && (
            <div className="">
              <div className="">
                <img src={image} alt="" className="w-auto h-60 rounded-md"/>
              </div>
            </div>
          )}
          {image.length === 0 && (
            <input 
            value={content}
            onChange={e => setContent(e.target.value)}
            className="grow py-3" placeholder={`What's on your mind?`} />
          )}
        </div>
        <div className="flex gap-3 item-center mt-3 pd-6">
          <div>
            <label className="flex gap-3">
              <input accept="image/*" type="file" className="hidden" onChange={addPhotos}/>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Upload Photo
            </label>
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
  