import Head from 'next/head';
import Link from 'next/link';
import { useQuery } from 'react-query';

//components
import Post from '@epicapp/components/Home/Stream/Post';

//services
import { getAuthorDetails } from '@epicapp/services/author';
import { getItem } from '@epicapp/services/inbox';
import { getLiked } from '@epicapp/services/like';

export default function PostPage({ postId }) {
  const auth = useQuery(['author'], () => getAuthorDetails(null), {
    staleTime: Infinity,
  });

  const post = useQuery(['post', postId], () => getItem(postId), {
    staleTime: Infinity,
  });

  const liked = useQuery(
    ['liked', auth.data?.data?.id],
    () => getLiked(auth.data?.data?.id),
    {
      enabled: !!auth.data?.data?.id,
      staleTime: 10000,
    },
  );

  if (post.isLoading || auth.isLoading || liked.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center py-4 text-9xl text-primary">
        <Head>
          <title>Epic App: Loading</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/logo.svg" />
        </Head>
        <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
      </div>
    );
  }

  return (
    <main className="container flex flex-col gap-4 py-8">
      <Head>
        <title>{`Epic App: ${post.data.data.title}`}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/clone-solid.svg" />
      </Head>
      <Link href="/">
        <i className="fa-solid fa-arrow-left text-xl text-primary" />
      </Link>
      <Post
        post={post.data?.data}
        author={auth.data?.data}
        liked={liked.data?.data?.items.map((like) => like.object)}
      />
    </main>
  );
}

export async function getServerSideProps(context) {
  if (
    !context.query.postId ||
    !context.req.headers.cookie?.includes('access=')
  ) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      postId: context.query.postId,
    },
  };
}