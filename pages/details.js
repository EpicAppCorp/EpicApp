import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import HomeLayout from '@epicapp/layouts/HomeLayout';
import Profile from '@epicapp/components/Home/Profile';

//services
import { getAuthorDetails } from '@epicapp/services/author';
import Stream from '@epicapp/components/Profile/Stream/Stream';

export default function ProfilePage() {
  const author = useQuery(['author'], getAuthorDetails, {
    retry: 1,
    staleTime: 10000,
  });

  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen overflow-y-auto bg-background">
        {author.isLoading ? (
          <div className="flex h-full items-center justify-center text-9xl text-primary">
            {/* // maybe a ekelton loading animation here? */}
            <i className="fa-solid fa-spinner-third animate-spin bg-transparent text-2xl text-primary" />
          </div>
        ) : (
          <HomeLayout route="PROFILE" author={author.data?.data}>
            <div className="grid grid-cols-4 gap-8">
              <section className="col-span-2 col-start-2 w-full">
                {/* might need to make another component, idk depending on what you want to do */}
                <Profile author={author.data?.data} />
              </section>
              <section className="col-span-2 col-start-2 flex flex-col gap-6">
                {/* SHOULD ONLY HAVE POSTS FROM THIS AUTHOR */}
                <Stream author={author?.data?.data} />
              </section>
            </div>
          </HomeLayout>
        )}
      </main>
    </>
  );
}

// export async function getServerSideProps(context) {
//   if (!context.req.headers.cookie?.includes('access=')) {
//     return {
//       props: {},
//       redirect: {
//         permanent: false,
//         destination: '/',
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// }