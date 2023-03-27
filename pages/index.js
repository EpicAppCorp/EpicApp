import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import HomeLayout from '@epicapp/layouts/HomeLayout';
import Profile from '@epicapp/components/Home/Profile';
import CreatePost from '@epicapp/components/Home/CreatePost';
import Stream from '@epicapp/components/Home/Stream';

//services
import { getAuthorDetails } from '@epicapp/services/author';

export default function Homepage() {
  const author = useQuery(['author'], getAuthorDetails, {
    staleTime: Infinity,
  });

  return (
    <>
      <Head>
        <title>Epic App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen">
        {author.isLoading ? (
          <div className="flex h-full items-center justify-center text-9xl text-primary">
            {/* // maybe a ekelton loading animation here? */}
            <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
          </div>
        ) : (
          <HomeLayout route="HOME" author={author.data?.data}>
            <div className="grid grid-cols-8 gap-8">
              <section className="col-span-2 w-full">
                <Profile author={author.data?.data} />
              </section>
              <section className="col-span-4 flex flex-col gap-6">
                <CreatePost author={author.data?.data} />
                <Stream author={author.data?.data} />
              </section>
            </div>
          </HomeLayout>
        )}
      </main>
    </>
  );
}

//TODO: DO THIS WAY OR HAVE PUBLIC VIEW
// export async function getServerSideProps(context) {
//   if (!context.req.headers.cookie?.includes('access=')) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: '/login',
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }
