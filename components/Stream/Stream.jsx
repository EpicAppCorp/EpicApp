import Card from '../Card';
import React, { useState, useEffect } from 'react';

export default function Stream({ inbox }) {
  const [stream, setStream] = useState([]);
  const [objContent, setObjectContent] = useState()
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/authors/4770a8cd-e8b7-434b-b818-e9bea84af2a0/inbox")
    .then((res) => res.json())
    .then((json) => {
        setStream({
            items: json,
            DataisLoaded: true
        });
    })
  }, [setStream]);

  stream.items?.items.forEach((post) => {
    fetch(post.object)
    .then((res) => res.json())
    .then((json) => {
        post.objectContent = json;
    })
  });
  console.log(stream);

  return (
    <Card>
      <div className="divide-y ...">
      {
        stream.items?.items?.map((post) => (
          <div key={post.id} className="m-auto p-5 ">
            <div>{post.summary}</div>
            { 
              <div>
                {
                  post.objectContent?.description
                }
              </div>
            }
          </div>
        ))
      }
      </div>
    </Card>
  )
}
