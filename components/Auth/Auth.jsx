import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import clsx from 'clsx';
import Cookies from 'js-cookie';

//components
import Button from '../Button';
import SignIn from './SignIn';
import Signup from './Signup';

//services
import { authenticateAuthor, createAuthor } from '@epicapp/services/author';
import { axiosClient } from '@epicapp/libs/axios';

export default function Auth({ close, option }) {
  const queryClient = useQueryClient();
  const [authType, setAuthType] = useState(option);

  //login mutation
  const authenticate = useMutation((body) => authenticateAuthor(body), {
    onSuccess(data) {
      Cookies.set('access', data.data.cookie, {
        secure: true,
      });
      queryClient.setQueryData(['author'], () => data);
      axiosClient.defaults.headers = {
        Authorization: data.data.cookie,
      };
      close();
    },
  });

  //register mutation
  const register = useMutation((body) => createAuthor(body), {
    onSuccess() {
      setAuthType('Sign In');
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (authType === 'Sign In') {
      return authenticate.mutate({
        displayName: e.target.displayname.value,
        password: e.target.password.value,
      });
    }
    return register.mutate({
      displayName: e.target.username.value,
      password: e.target.password.value,
      confirmpassword: e.target.confirm_password.value,
      github: 'https://github.com/' + e.target.github.value,
    });
  };

  return (
    <form
      onSubmit={submitHandler}
      className={clsx(
        'relative flex w-[500px] flex-col justify-between rounded-2xl bg-background p-6 transition-all duration-75',
        authType === 'Sign In' ? 'h-[475px]' : 'h-[605px]',
      )}
    >
      <Button onClick={close} type="button" className="absolute right-6 top-4">
        <i className="fa-solid fa-xmark text-2xl text-textAlt hover:text-primary" />
      </Button>
      <div className="flex flex-col gap-6">
        <div className="mt-3">
          <h1 className="text-center text-3xl font-bold text-text">
            {authType === 'Sign In' ? 'Welcome Back!' : 'Create An Account'}
          </h1>
          <p className="text-center text-sm text-textAlt">
            {authType === 'Sign In'
              ? 'Enter your details below'
              : 'Trust us, our site is really epic!'}
          </p>
        </div>
        <div className="grid w-full grid-cols-2 justify-between rounded-xl bg-layer p-1">
          <Button
            type="button"
            onClick={() => {
              setAuthType('Sign In');
              authenticate.reset();
              register.reset();
            }}
            className={clsx(
              'rounded-xl px-1 py-2 text-lg transition-colors duration-150 ',
              authType === 'Sign In'
                ? 'bg-primary'
                : 'bg-transparent text-textAlt/50',
            )}
          >
            Sign In
          </Button>
          <Button
            type="button"
            onClick={() => {
              setAuthType('Signup');
              authenticate.reset();
              register.reset();
            }}
            className={clsx(
              'rounded-xl px-1 py-2 text-lg transition-colors duration-150 ',
              authType === 'Signup'
                ? 'bg-primary'
                : 'bg-transparent text-textAlt/40',
            )}
          >
            Signup
          </Button>
        </div>
        {authType === 'Sign In' ? <SignIn /> : <Signup />}
        <div className="flex justify-center text-quaternary">
          {register.isError && (
            <div className="bg-errorF text-errorB mb-2 rounded-lg p-1">
              {Object.keys(register.error?.response?.data).map((key) => (
                <div>{register.error?.response?.data[key]}</div>
              ))}
            </div>
          )}

          {authenticate?.isError && (
            <div className="bg-errorF text-errorB mb-5 rounded-lg p-1">
              {authenticate?.error?.response?.data}
            </div>
          )}
        </div>
      </div>
      <Button
        type="submit"
        loading={register.isLoading | authenticate.isLoading}
        className="rounded-xl bg-layer py-3 text-lg text-textAlt transition-all duration-150 hover:scale-105 hover:bg-primary hover:text-black"
      >
        Submit
      </Button>
    </form>
  );
}
