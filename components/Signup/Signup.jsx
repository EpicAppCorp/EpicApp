import { useRouter } from "next/router";
export default function Signup() {
  const router = useRouter()
  function verifyCredentials(e) {
    e.preventDefault()
    console.log("verify credentials")
    // if credentials are verified/added after call route to stream page logged in?
    // else display error message about login
    // compare the two passwords
    
  }
  function routeLogin() {
    router.push('/')
  }

  return <main>
    <form class="login-container" onSubmit={verifyCredentials}>
      <div class="title">
          Create an Account:<br/>
      </div>
      <input class="login" type={"text"} id="email" name="email" placeholder="Email" required/>
      <input class="login" type={"password"} id="password" name="password" placeholder="Password" required/>
      <input class="login" type={"confirm_password"} id="confirm_password" name="confirm_password" placeholder="Confirm Password" required/>

      <br/>
      <button type="submit" class="login" >Create a new account</button>
      <hr/>

      <button type="button" class="login" onClick={routeLogin}>Back to login</button>


    </form>
  </main>;
      
  }
  