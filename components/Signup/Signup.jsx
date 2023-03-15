import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup({ close, switchHandler }) {
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('');
  const [userErrorMessage, setUserErrorMessage] = useState('');
  const [gitErrorMessage, setGitErrorMessage] = useState('');

  const verifyCredentials = async (e) => {
    e.preventDefault();
    if (e.target.password.value != e.target.confirm_password.value) {
      setUserErrorMessage('ERROR: Passwords do not match');
    } else {
      let userObject = {
        displayName: e.target.username.value,
        password: e.target.password.value,
        github: e.target.github.value,
        host: 'http://127.0.0.1:8000/',
        url: 'http://127.0.0.1:8000/',
        profile_image: e.target.profileimg.files[0].name,
      };
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userObject),
      };

      await fetch('http://127.0.0.1:8000/api/auth/register/', options)
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (
            typeof json.displayName == 'string' &&
            typeof json.github == 'string'
          ) {
            setUserErrorMessage('');
            setContext(json);
            router.push('/homepage');
          } else {
            if (typeof json.github == 'object') {
              if (json.github[0] == 'user with this github already exists.') {
                setGitErrorMessage('Github link already in use.');
              }
            }
            if (typeof json.displayName == 'object') {
              if (
                json.displayName[0] ==
                'user with this displayName already exists.'
              ) {
                setUserErrorMessage('Username already exists');
              }
            }
          }
        });
    }
  };

  const displayFile = (e) => {
    setProfileImage(e.target.files[0]?.name);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        className="flex flex-col items-center justify-center rounded-xl border-4 border-solid border-full bg-epicBg p-10"
        onSubmit={verifyCredentials}
      >
        <div className="mb-3 text-2xl">
          Create an Account:
          <br />
        </div>
        {gitErrorMessage ? (
          <div className="mb-2 rounded-lg bg-errorF p-1 text-errorB">
            {gitErrorMessage}
          </div>
        ) : null}
        {userErrorMessage ? (
          <div className="mb-2 rounded-lg bg-errorF p-1 text-errorB">
            {userErrorMessage}
            <br />
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
        <input
          className="mb-5 border border-solid border-full bg-epicBg text-center"
          type={'password'}
          id="confirm_password"
          name="confirm_password"
          placeholder="Confirm Password"
          required
        />
        <input
          className="mb-5 border border-solid border-full bg-epicBg text-center"
          type={'url'}
          id="github"
          name="github"
          placeholder="Github Url"
          required
        />
        <input
          className="mb-5 border border-solid border-full bg-epicBg text-center"
          type={'file'}
          id="profileimg"
          name="profileimg"
          style={{ display: 'none' }}
          required
          onChange={displayFile}
        />
        <label
          className="rounded-lg border-2 border-solid border-medium bg-epicBg px-5 py-0.5"
          for="profileimg"
        >
          {' '}
          Click to upload profile image
        </label>
        {profileImage ? (
          <div className="my-4 font-semibold">
            <u>Uploaded:</u> {profileImage}
          </div>
        ) : (
          <br />
        )}
        <button
          type="submit"
          className="rounded-lg bg-medium px-5 py-1 font-semibold text-white "
        >
          Create New Account
        </button>
        <hr className="my-4 w-3/4 border-full" />

        <button
          type="button"
          className="rounded-lg bg-medium px-5 py-1 font-semibold text-white "
          onClick={switchHandler}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}
