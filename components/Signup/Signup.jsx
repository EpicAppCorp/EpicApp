import { useMutation } from 'react-query';

//components
import Button from '../Button';

//services
import { createAuthor } from '@epicapp/services/author';

export default function Signup({ close, switchHandler }) {
  const register = useMutation((body) => createAuthor(body), {
    onSuccess() {
      switchHandler();
    },
  });

  const submitRegister = async (e) => {
    e.preventDefault();

    register.mutate({
      displayName: e.target.username.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirm_password.value,
      github: e.target.github.value,
    });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-2xl bg-background p-10 text-text"
        onSubmit={submitRegister}
      >
        <div className="mb-3 text-2xl">
          Create an Account:
          <br />
        </div>
        {register.isError && (
          <div className="bg-errorF text-errorB mb-2 rounded-lg p-1">
            {Object.keys(register.error.response.data).map((key) => (
              <div>{register.error.response.data[key]}</div>
            ))}
          </div>
        )}

        <input
          className="mb-5 border border-solid border-foreground bg-background text-center"
          type={'text'}
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          className="mb-5 border border-solid border-foreground bg-background text-center"
          type={'password'}
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <input
          className="mb-5 border border-solid border-foreground bg-background text-center"
          type={'password'}
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
        />
        <input
          className="mb-5 border border-solid border-foreground bg-background text-center"
          type={'url'}
          id="github"
          name="github"
          placeholder="Github Url"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-layer px-5 py-1 font-semibold text-white "
        >
          Create New Account
        </button>
        <hr className="my-4 w-3/4 border-foreground" />

        <Button
          loading={register.isLoading}
          type="button"
          className="rounded-lg bg-layer px-5 py-1 font-semibold text-white "
          onClick={switchHandler}
        >
          Back to Login
        </Button>
      </form>
    </div>
  );
}
