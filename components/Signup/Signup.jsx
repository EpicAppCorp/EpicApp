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
          router.push('/homepage')
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
  
  return(
    <div className='flex items-center justify-center h-screen'>
      <form className="flex flex-col items-center justify-center border-solid border-4 border-full rounded-lg p-10 shadow-lg shadow-full bg-epicBg" onSubmit={verifyCredentials}>
        <div className="mb-3 text-2xl">
            Create an Account:<br/>
        </div>
        {gitErrorMessage ? <div className="bg-errorF rounded-lg p-1 mb-2 text-errorB">{gitErrorMessage}</div>: null}
        {userErrorMessage ? <div className="bg-errorF rounded-lg p-1 mb-2 text-errorB">{userErrorMessage}<br/></div>: null}
        

        <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"text"} id="username" name="username" placeholder="Username" required/>
        <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"password"} id="password" name="password" placeholder="Password" required/>
        <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"password"} id="confirm_password" name="confirm_password" placeholder="Confirm Password" required/>
        <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"url"} id="github" name="github" placeholder="Github Url" required/>
        <input className="border-solid border border-full mb-5 bg-epicBg text-center" type={"file"} id="profileimg" name="profileimg"  style={{"display": "none"}} required onChange={displayFile}/>
        <label className="bg-light border-solid border-2 border-medium px-5 py-0.5 rounded-lg bg-epicBg" for="profileimg"> Click to upload profile image</label>
        {profileImage? <div className="font-semibold my-4"><u>Uploaded:</u> {profileImage}</div>: <br/> }
        <button type="submit" className="bg-medium text-white font-semibold px-5 py-1 rounded-lg " >Create New Account</button>
        <hr className='w-3/4 border-full my-4'/>

        <button type="button" className="bg-medium text-white font-semibold px-5 py-1 rounded-lg " onClick={routeLogin}>Back to Login</button>
      </form>
    </div>
  
  );
  }
  