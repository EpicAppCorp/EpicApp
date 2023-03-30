import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import HomeLayout from '@epicapp/layouts/HomeLayout';
import Details from '@epicapp/components/Profile/Details';
import Timeline from '@epicapp/components/Profile/Timeline';

//services
import { getAuthorDetails } from '@epicapp/services/author';

export default function ProfilePage({ id }) {
  const author = useQuery(['profile', id], () => getAuthorDetails(id), {
    staleTime: 10000,
  });

  return (
    <>
      <Head>
        <title>Epic App: Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-background">
        {author.isLoading ? (
          <div className="flex h-full items-center justify-center text-9xl text-primary">
            {/* // maybe a ekelton loading animation here? */}
            <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
          </div>
        ) : (
          <HomeLayout route="PROFILE" author={author.data?.data}>
            <div className="container">
              <Details author={author.data?.data} />
              <Timeline author={author?.data?.data} />
            </div>
          </HomeLayout>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!context.query.id || !context.req.headers.cookie?.includes('access=')) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }
  return {
    props: {
      id: context.query.id,
    },
  };
}
