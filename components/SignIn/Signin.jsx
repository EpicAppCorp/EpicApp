import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signin() {
  let router = useRouter();

  const [errorMessage, setErrorMessage] = useState('');

  const createAccountRoute = (e) => {
    router.push('/signup');
  };

  const loginRoute = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: e.target.username.value,
        password: e.target.password.value,
      }),
    };

    await fetch(`${process.env.NEXT_PUBLIC_API}/auth/authenticate/`, options)
      .then((res) => {
        if (res.status != 200) {
          setErrorMessage(
            'Username and/or Password are invalid. Please try again.',
          );
        }
        return res.json();
      })
      .then((json) => {
        if (errorMessage == '') {
          setContext(json);
          router.push('/');
        }
      });
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-lg border-4 border-solid border-full bg-epicBg p-10 shadow-lg shadow-full"
        onSubmit={loginRoute}
      >
        <div className="mb-5 text-center">
          <div className="text-2xl">
            Welcome to Epic App, the most epic place to post
            <br />
          </div>
          <div className="text-lg">
            Please <span className="font-bold text-full">Sign In</span> below or{' '}
            <span className="font-bold text-full">Create An Account</span> and
            get posting!
          </div>
        </div>
        {errorMessage ? (
          <div className="mb-5 rounded-lg bg-errorF p-1 text-errorB">
            {errorMessage}
          </div>
        ) : null}
        <input
          className="mb-5 border border-solid border-full bg-epicBg text-center"
          type={'text'}
          id="username"
          name="username"
          placeholder="Username"
          required
        />
        <input
          className="mb-5 border border-solid border-full bg-epicBg text-center"
          type={'password'}
          id="password"
          name="password"
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="rounded-lg bg-medium px-5 py-1 font-semibold text-white"
        >
          Log in
        </button>
        <hr className="my-4 w-3/4 border-full" />
        <button
          type="button"
          className="rounded-lg bg-medium px-5 py-1 font-semibold text-white"
          onClick={createAccountRoute}
        >
          Create a new account
        </button>
      </form>
    </div>
  );
}
