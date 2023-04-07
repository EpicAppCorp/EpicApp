import { useState } from 'react';
import Image from 'next/image';
import { useQueryClient, useMutation } from 'react-query';

//componenets
import Button from '@epicapp/components/Button';
import Modal from '@epicapp/components/Modal/Modal';

//services
import { followRequest } from '@epicapp/services/inbox';
import { unfollow } from '@epicapp/services/follow';
import { updateAuthor } from '@epicapp/services/author';

export default function Details({ auth, author }) {
  const following = auth?.following.includes(author.url);
  const follower = auth.followers.includes(author.url);
  const [showEditModal, setShowEditModal] = useState(false);

  const queryClient = useQueryClient();

  const followAuthor = useMutation(() => followRequest(auth, author), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: [...oldData.data.following, author.url],
        },
      }));
    },
  });

  const unfollowAuthor = useMutation(() => unfollow(author.url, auth.id), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          following: oldData.data.following.filter((u) => u !== author.url),
        },
      }));
    },
  });

  const removeFollower = useMutation(() => unfollow(auth.id, author.url), {
    onSettled() {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...oldData.data,
          followers: oldData.data.followers.filter((u) => u !== author.url),
        },
      }));
    },
  });

  const updateAuthorMutation = useMutation((author) => updateAuthor(author), {
    onSuccess(data, variables) {
      queryClient.setQueryData(['author'], (oldData) => ({
        ...oldData,
        data: {
          ...variables,
        },
      }));
      queryClient.setQueryData(['profile', author.url], (oldData) => ({
        ...oldData,
        data: {
          ...variables,
        },
      }));
      setShowEditModal(false);
    },
  });

  const formHandler = (e) => {
    e.preventDefault();
    updateAuthorMutation.mutate({
      ...auth,
      displayName: e.target.username.value,
      github: 'https://github.com/' + e.target.github.value,
    });
  };

  return (
    <>
      <div className="w-full overflow-hidden rounded-xl bg-surface shadow-xl">
        <div className="relative h-32 w-full bg-primary">
          {!process.env.NEXT_PUBLIC_API.includes(author.host) && (
            <div className="absolute right-4 top-4 flex items-center gap-2 text-xs font-bold text-black">
              <i className="fa-solid fa-square-up-right" />
              EXTERNAL
            </div>
          )}
        </div>
        <div className="relative h-32 w-full">
          <div className="absolute w-full -translate-y-1/2 px-12">
            <div className="flex justify-between">
              <div className="flex">
                {author.profileImage ? (
                  <Image
                    className="aspect-square overflow-hidden rounded-full border-8 border-background object-cover"
                    alt="profile image"
                    src="profile image"
                    loader={() => author.profileImage}
                    width={144}
                    height={144}
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
                    priority={true}
                  />
                ) : (
                  <div className="flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden rounded-full border-4 border-layer bg-background object-cover text-7xl text-textAlt">
                    <i className="fa-solid fa-question" />
                  </div>
                )}
                <div className="my-4 flex flex-col justify-center self-end px-4">
                  <h2 className="text-2xl font-semibold text-text">
                    @{author.displayName}
                  </h2>
                  <p className="text-xs text-textAlt">{author.host}</p>
                </div>
              </div>
              <div className="flex gap-2 text-lg">
                {auth.url !== author.url ? (
                  <Button
                    loading={followAuthor.isLoading || unfollowAuthor.isLoading}
                    onClick={() =>
                      following
                        ? unfollowAuthor.mutate()
                        : followAuthor.mutate()
                    }
                    className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105"
                  >
                    {following ? 'Unfollow' : 'Follow'}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setShowEditModal(!showEditModal)}
                    className="my-auto flex h-max w-full items-center gap-2 rounded-xl bg-white px-4 py-1 hover:scale-105"
                  >
                    <i className="fa-regular fa-pencil" /> Edit Profile
                  </Button>
                )}
                {follower && (
                  <Button
                    loading={removeFollower.isLoading}
                    onClick={() => removeFollower.mutate()}
                    className="my-auto h-max rounded-xl bg-text px-6 py-2 text-black hover:scale-105"
                  >
                    Remove follower
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showEditModal}>
        <form
          className="relative w-[550px] rounded-xl bg-background px-6 py-4"
          onSubmit={formHandler}
        >
          <div className="flex items-center gap-4">
            <Image
              className="aspect-square overflow-hidden rounded-full border-8 border-background object-cover"
              alt="profile image"
              src="profile image"
              loader={() => auth.profileImage}
              width={144}
              height={144}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNUqgcAAMkAo/sGMSwAAAAASUVORK5CYII="
              priority={true}
            />
            <div className="flex flex-col gap-2 text-text">
              <input
                className="h-10 w-full rounded-xl bg-foreground px-4 placeholder:text-textAlt/20 focus:outline-none"
                defaultValue={auth.displayName}
                type="text"
                name="username"
                placeholder="Display Name"
              />
              <div className="flex w-full overflow-hidden rounded-xl bg-foreground">
                <div className="flex items-center bg-layer px-4 text-textAlt">
                  www.github.com/
                </div>
                <input
                  className="h-10 w-full bg-transparent px-4 placeholder:text-textAlt/20 focus:outline-none"
                  type="text"
                  id="github"
                  name="github"
                  defaultValue={auth.github.split('.com/')[1]}
                  placeholder="Github Username"
                  required
                />
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Button
              type="button"
              onClick={() => setShowEditModal(false)}
              className="rounded-xl bg-layer py-2 text-lg text-textAlt transition-all duration-150 hover:scale-105 hover:bg-primary hover:text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={updateAuthorMutation.isLoading}
              className="rounded-xl bg-layer py-2 text-lg text-textAlt transition-all duration-150 hover:scale-105 hover:bg-primary hover:text-black"
            >
              Submit
            </Button>
            {updateAuthorMutation.isError && (
              <div className="col-span-2 flex place-content-center">
                {Object.keys(updateAuthorMutation.error?.response?.data).map(
                  (key) => (
                    <div className='text-quaternary' key={key}>
                      {updateAuthorMutation.error?.response?.data[key]}
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
}
