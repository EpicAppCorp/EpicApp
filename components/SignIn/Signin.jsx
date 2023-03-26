import { useMutation, useQueryClient } from 'react-query';

//services
import { authenticateAuthor } from '@epicapp/services/author';

export default function Signin({ close, switchHandler }) {
  const queryClient = useQueryClient();
  const authenticate = useMutation((login) => authenticateAuthor(login), {
    onSuccess(data) {
      queryClient.setQueryData(['author'], () => data);
      close();
    },
  });

  const loginRoute = async (e) => {
    e.preventDefault();
    authenticate.mutate({
      displayName: e.target.username.value,
      password: e.target.password.value,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-2xl bg-background p-10 text-text"
        onSubmit={loginRoute}
      >
        <div className="mb-5 text-center">
          <div className="text-2xl">
            Welcome to Epic App, the most epic place to post
            <br />
          </div>
          <div className="text-lg">
            Please <span className="font-bold text-primary">Sign In</span> below
            or <span className="font-bold text-primary">Create An Account</span>{' '}
            and get posting!
          </div>
        </div>
        {authenticate.isError ? (
          <div className="bg-errorF text-errorB mb-5 rounded-lg p-1">
            {authenticate.error.response.data}
          </div>
        ) : null}
        <input
          className="mb-5 border border-solid border-foreground bg-foreground text-center"
          type="text"
          id="username"
          autoComplete="displayname"
          name="username"
          placeholder="Display Name"
          required
        />
        <input
          className="mb-5 border border-solid border-foreground bg-foreground text-center"
          type="password"
          id="password"
          autoComplete="current-password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-layer px-5 py-1 font-semibold text-white"
        >
          Log in
        </button>
        <hr className="my-4 w-3/4 border-foreground" />
        <button
          type="button"
          className="rounded-lg bg-layer px-5 py-1 font-semibold text-white"
          onClick={switchHandler}
        >
          Create a new account
        </button>
      </form>
    </div>
  );
}
