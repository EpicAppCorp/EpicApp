import React, { useContext }  from 'react';
import { useRouter } from "next/router";
import AppContext from '@epicapp/context/AppContext';

export default function Signin() {
    let router= useRouter()
    const [context, setContext] = useContext(AppContext)
  
    const [errorMessage, setErrorMessage] = React.useState("");

    const createAccountRoute = (e) => {
      router.push('/signup')
    }

    const loginRoute =  async (e) =>{
      e.preventDefault()
      const options = {
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "displayName": e.target.username.value,
            "password": e.target.password.value
          })
        }

        await fetch("http://127.0.0.1:8000/api/auth/authenticate/", options)
        .then((res) => {
          if(res.status != 200){
            setErrorMessage("Username and/or Password are invalid. Please try again.")
          }
          return res.json()
        })
        .then((json) => {
          if(errorMessage == ""){
            setContext(json)
            router.push('/homepage')
          }

        })
    }

    return(
      <div className='flex items-center justify-center h-screen'>
        <form className="flex flex-col items-center justify-center border-solid border-4 border-full rounded-lg p-10 shadow-lg shadow-full bg-epicBg" onSubmit={loginRoute}>
          <div className='mb-5 text-center'>
            <div className="text-2xl">
                Welcome to Epic App, the most epic place to post<br/>
            </div>
            <div className="text-lg">
                Please <span className="text-full font-bold">Sign In</span> below or <span className="text-full font-bold">Create An Account</span> and get posting!
            </div>
          </div>
          {errorMessage? <div className="bg-errorF rounded-lg p-1 mb-5 text-errorB">{errorMessage}</div>: null}
          <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"text"} id="username" name="username" placeholder="Username" required/>
          <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"password"} id="password" name="password" placeholder="Password" required/>
          <button type="submit" className="bg-medium text-white font-semibold px-5 py-1 rounded-lg">Log in</button>
          <hr className='w-3/4 border-full my-4'/>
          <button type="button" className="bg-medium text-white font-semibold px-5 py-1 rounded-lg" onClick={createAccountRoute}>Create a new account</button>
        </form>
      </div>
    );
  }
  