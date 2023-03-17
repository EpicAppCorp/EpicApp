import { useState } from 'react';
import { useMutation } from 'react-query';
import Image from 'next/image';

//services
import { newPost } from '@epicapp/services/post';

export default function CreatePost({ author }) {
  const [content, setContent] = useState('');
  // const authorEndpoint = user.host + "api/authors/" + user.id;;

  const createPost = useMutation((post) => newPost(author, post), {
    onSuccess() {},
  });

  // const createPost = (e) => {
  //   axios
  //     .post(authorEndpoint + '/posts', {
  //       title: 'Hard Coded Title',
  //       source: 'http://localhost:8000',
  //       origin: 'http://localhost:8000',
  //       description: 'This is a test Description',
  //       content: content,
  //       contentType: 'text/plain',
  //       published: 'uhhh',
  //       visibility: 'PUBLIC',
  //       categories: ['something', 'anothring thing'],
  //       author: {
  //         type: 'author',
  //         id: user.id, // Temporarily hardcoded
  //         host: user.host,
  //         displayName: user.displayName,
  //         url: user.url,
  //         github: user.github,
  //         profile_image: user.profile_image,
  //       },
  //     })
  //     .then((res) => {
  //       console.log('Posting data', res);
  //       axios.post(authorEndpoint + '/inbox', {
  //         '@context': 'https://www.w3.org/ns/activitystreams',
  //         title: 'Hard Coded Title',
  //         source: 'http://localhost:8000',
  //         origin: 'http://localhost:8000',
  //         content: content,
  //         contentType: 'text/plain',
  //         type: 'post',
  //         author: {
  //           type: 'author',
  //           id: user.id, // Temporarily hardcoded
  //           host: user.host,
  //           displayName: user.displayName,
  //           url: user.url,
  //           github: user.github,
  //           profile_image: user.profile_image,
  //         },
  //         object: res.data.id,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };

  const formHandler = (e) => {
    e.preventDefault();

    //deconstruct the elements in form element
    const { body } = e.target;

    //mutate the post stuff to server
    createPost.mutate({
      title: 'Hard Coded Title',
      source: 'http://localhost:8000',
      origin: 'http://localhost:8000',
      description: 'This is a test Description',
      content: body.value,
      contentType: 'text/plain',
      published: 'uhhh',
      visibility: 'PUBLIC',
      categories: ['something', 'anothring thing'],
      author: {
        type: 'author',
        id: author.id, // Temporarily hardcoded
        host: author.host,
        displayName: author.displayName,
        url: author.url,
        github: author.github,
        profile_image: author.profile_image,
      },
    });
  };

  if (!author) {
    return null;
  }

  return (
    <section className="rounded-3xl bg-layer py-2 px-4">
      <form onSubmit={formHandler}>
        <div className="flex gap-2">
          <Image
            className="self-center overflow-hidden rounded-full object-cover"
            src="profile image"
            alt="profile image"
            loader={() => author.profile_image}
            width={50}
            height={50}
            priority={true}
          />
          <textarea
            className="grow bg-surface p-2 text-textAlt"
            placeholder="What's on your mind?"
            name="body"
          />
        </div>
        <div className="item-center pd-6 mt-3 flex gap-3">
          <div>
            <button className="flex items-center gap-3">
              <i className="fa-regular fa-image" />
              Upload Photo
            </button>
          </div>
          <div className="grow text-right">
            <button
              type="submit"
              className="rounded-md bg-submitBg px-4 py-1 text-white"
            >
              Share
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
