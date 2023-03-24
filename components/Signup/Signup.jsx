import { useState } from 'react';
import { useMutation } from 'react-query';

//components
import Button from '../Button';

//services
import { createAuthor } from '@epicapp/services/author';

export default function Signup({ close, switchHandler }) {
  const [userErrorMessage, setUserErrorMessage] = useState('');

  const register = useMutation((body) => createAuthor(body), {
    onSuccess() {
      switchHandler();
    },
  });

  const submitRegister = async (e) => {
    e.preventDefault();

    //TODO: Might make this server side to make all the errors come from one place.
    if (e.target.password.value != e.target.confirm_password.value) {
      setUserErrorMessage('ERROR: Passwords do not match');
    } else {
      register.mutate({
        displayName: e.target.username.value,
        password: e.target.password.value,
        github: e.target.github.value,
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-xl border-2 border-solid border-background p-10 text-white"
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

        {userErrorMessage ? (
          <div className="bg-errorF text-errorB mb-2 rounded-lg p-1">
            {userErrorMessage}
            <br />
          </div>
        ) : null}

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
