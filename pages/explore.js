import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import HomeLayout from '@epicapp/layouts/HomeLayout';
import Friends from '@epicapp/components/Friends';

//services
import { getAuthorDetails } from '@epicapp/services/author';

export default function Homepage({ filter }) {
  const author = useQuery(['author'], () => getAuthorDetails(null), {
    staleTime: Infinity,
  });

  return (
    <>
      <Head>
        <title>Epic App: Friends</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.svg" />
      </Head>
      <main className="h-screen w-screen">
        {author.isLoading ? (
          <div className="flex h-full items-center justify-center text-9xl text-primary">
            <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
          </div>
        ) : (
          <HomeLayout route="EXPLORE" author={author.data?.data}>
            <div className="container">
              <Friends filter={filter} author={author.data?.data} />
            </div>
          </HomeLayout>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!context.req.headers.cookie?.includes('access=')) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      filter: context.query.filter ?? null,
    },
  };
}
