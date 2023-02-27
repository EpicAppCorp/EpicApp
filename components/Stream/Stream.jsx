import getInbox from "./getInbox";
import React, { useState, useEffect } from 'react';

export default function Stream({ inbox }) {
  const [stream, setStream] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/authors/4770a8cd-e8b7-434b-b818-e9bea84af2a0/inbox")
    .then((res) => res.json())
    .then((json) => {
        setStream({
            items: json,
            DataisLoaded: true
        });
    })
  }, []);
  console.log(stream);
  return (
    <div class="flex flex-col ...">
      {
        stream.items?.items?.map((post) => (
          <div key={post.id} class="m-auto">
            Hello
          </div>
        ))
      }
    </div>
  )
}
