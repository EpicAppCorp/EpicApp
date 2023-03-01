import React from 'react';
import { useRouter } from "next/router";

export default function Signin() {
    let router= useRouter()
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
          if(res.status == 200){
            router.push('/stream')
          } else{
            setErrorMessage("Username and/or Password are invalid. Please try again.")
          }
        })

    }

    return <main>
      <form class="login-container" onSubmit={loginRoute}>
        <div class="title">
            Welcome to Epic App, the most epic place to post<br/>
        </div>
        <div class="subtext">
            Please <span class="emphasis">Sign In</span> below or <span class="emphasis">Create An Account</span> and get posting!
        </div>
        {errorMessage? <div class="error-message">{errorMessage}</div>: null}

      
        <input class="login" type={"text"} id="username" name="username" placeholder="Username" required/>
        <input class="login" type={"password"} id="password" name="password" placeholder="Password" required/>
        <button type="submit" class="login">Log in</button>
        <hr/>
        <button type="button" class="login" onClick={createAccountRoute}>Create a new account</button>

      </form>
    </main>;
  }
  