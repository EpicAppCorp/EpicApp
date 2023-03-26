import Head from 'next/head';
import { useQuery } from 'react-query';

//components
import Layout from '@epicapp/components/UserProfile/Layout';
import CreatePost from '@epicapp/components/Home/CreatePost';
import Stream from '@epicapp/components/UserProfile/Stream';

//services
import { getAuthorDetails } from '@epicapp/services/author';
import HomeLayout from '@epicapp/layouts/HomeLayout/HomeLayout';

export default function ProfilePage() {
    const author = useQuery(['author'], getAuthorDetails, {
        retry: 1,
        staleTime: 10000,
      });

  return (
    <>
      <Head>
        <title>{author.data?.data.displayName}'s Profile | Epic App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen w-screen bg-background overflow-y-auto">
      {author.isLoading ? (
          <div className="flex h-full items-center justify-center text-9xl text-primary">
            {/* // maybe a ekelton loading animation here? */}
            <i className="fa-solid fa-spinner-third text-secondary animate-spin bg-transparent text-2xl" />
          </div>
        ) : (
        <HomeLayout route="PROFILE" author={author.data?.data}>
            <div className="flex mt-4 max-w-6xl mx-auto gap-6">
                <div className="w-1/6" />
                <div className="w-4/6">
                    <section className="col-span-1 w-full">
                        <Layout author={author.data?.data}/>
                    </section>
                    <section className="col-span-3 flex flex-col gap-6">
                        <CreatePost removeRounded={'true'} author={author.data?.data}/>
                        <Stream author={author.data?.data} />
                    </section>
                </div>
                <div className="w-1/6" />
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
