import React from 'react';
import { useRouter } from "next/router";
export default function Signup() {
  const router = useRouter()
  const [profileImage, setProfileImage] = React.useState("");
  const [userErrorMessage, setUserErrorMessage] = React.useState("");
  const [gitErrorMessage, setGitErrorMessage] = React.useState("");

  const verifyCredentials= async (e) => {
    e.preventDefault()
    if(e.target.password.value != e.target.confirm_password.value){
      setUserErrorMessage("ERROR: Passwords do not match")
    } else{
      const options = {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "displayName": e.target.username.value,
          "password": e.target.password.value,
          "github": e.target.github.value,
          "host": "http://127.0.0.1:8000/",
          "url": "http://127.0.0.1:8000/",
          "profile_image": e.target.profileimg.files[0].name,
        })
      }

      await fetch("http://127.0.0.1:8000/api/auth/register/", options)
      .then((res)=> {
        if(res.status == 200){
          router.push('/stream')
        }
        return res.json()
        
      })
      .then((json) => {
        console.log(typeof json.displayName)
        if((typeof json.displayName) == "object"){
          if(json.displayName[0] == "user with this displayName already exists."){
            setUserErrorMessage("Username already exists")
          }
        }else{
          setUserErrorMessage("")
        }
        
        if((typeof json.github) == "object"){
          if(json.github[0] == "user with this github already exists."){
            setGitErrorMessage("Github link already in use.")
          } 
        }else{
          setGitErrorMessage("")
        }

      })
    }
  }

  const routeLogin = () => {
    router.push('/')
  }

  const displayFile = (e) => {
    setProfileImage(e.target.files[0]?.name)
   
  }
  
  return <main>
    <form class="login-container" onSubmit={verifyCredentials}>
      <div class="title">
          Create an Account:<br/>
      </div>
      {gitErrorMessage ? <div class="error-message">{gitErrorMessage}</div>: null}
      {userErrorMessage ? <div class="error-message">{userErrorMessage}</div>: null}

      <input class="login" type={"text"} id="username" name="username" placeholder="Username" required/>
      <input class="login" type={"password"} id="password" name="password" placeholder="Password" required/>
      <input class="login" type={"password"} id="confirm_password" name="confirm_password" placeholder="Confirm Password" required/>
      <input class="login" type={"url"} id="github" name="github" placeholder="Github Url" required/>
      <input class="login" type={"file"} id="profileimg" name="profileimg"  style={{"display": "none"}} required onChange={displayFile}/>
      <label class="login" for="profileimg"> Click to upload profile image</label>
      {profileImage? <div class="emphasis"><u>Uploaded:</u> {profileImage}</div>: null }
      <br/>
      <button type="submit" class="login" >Create New Account</button>
      <hr/>

      <button type="button" class="login" onClick={routeLogin}>Back to Login</button>
    </form>
  </main>;
      
  }
  