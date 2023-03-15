import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import HomeLayout from '@epicapp/layouts/HomeLayout';
import Profile from '@epicapp/components/Home/Profile';

//services
import { getAuthorDetails } from '@epicapp/services/author';

export default function SigninPage() {
  const author = useQuery(['author'], getAuthorDetails, {
    retry: 1,
    staleTime: 10000,
  });

  return (
    <>
      <Head>
        <title>Epic App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-background">
        {author.isLoading ? (
          <div className="h-full flex justify-center items-center text-9xl text-primary">
            {/* // maybe a ekelton loading animation here? */}
            <i className="fa-solid fa-spinner-third text-secondary animate-spin bg-transparent text-2xl" />
          </div>
        ) : (
          <HomeLayout route="HOME" author={author.data.data}>
            <div className="grid grid-cols-4 gap-4">
              <section className="col-span-1 w-full">
                <Profile author={author.data.data}/>
              </section>
              <section className="col-span-3">
                {/* stream component ggoes here */}
              </section>
            </div>
          </HomeLayout>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps(context) {
  if (!context.req.headers.cookie?.includes('token=')) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
  return {
    props: {},
  };
}
