import React,{useContext, useRef, useEffect, useState} from "react";
import {Link, useHistory} from 'react-router-dom'
import { UserContext } from "../../../App"
import axios from 'axios'

import useInput from '../../componentUi/Input/input'
import'../user.scss'


const Login=(props)=>{

    const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');
    const { setUserData} = useContext(UserContext)
    const [formError, setFormError]= useState()

    const history = useHistory()
    const _isMounted = useRef(true)



    useEffect (() => { 
  },[])

    const handleSubmit = (evt) => {
        evt.preventDefault();
        resetEmail();
        resetPassword();
    }

     const loginUser = async (props) => {
       await axios.post("/login",{
        email: Email,
        password: Password
    })
    .then(function(res){
          console.log('connecté ')
          setUserData({ 
            token:res.data.token,
            user:res.data.user
          })
          localStorage.setItem("auth-token",res.data.token)
          localStorage.setItem("user", JSON.stringify( res.data.user))
          history.push('/')
          window.location.reload()
        
    })
    .catch(function(err){
      console.log(err.response.data.errors)
      err.response.data.errors && setFormError(err.response.data.errors)
    })
  }
  const displayErrors =(props)=>{
    setInterval(() => {
        setFormError(null)
    }, 5000);
    return (
    <>
    {formError.map( (item,i) => (
        <li key={i} className="displayError">
            {item.msg}
        </li>
    ))}

    </>
)}

    return (
      <div>
        <h2> Login </h2>
        { formError && 
                <div className="containerError"> {displayErrors() } 
                </div> }
        <form onSubmit={handleSubmit}>
          <br/>
          <label>
            Email:<br/>
            <input placeholder="enter your Email" type="text" {...bindEmail} />
          </label><br/>
          <label>
            Password:<br/>
            <input placeholder="enter your Password" type="text" {...bindPassword} />
          </label><br/><br/>
          <input  type="submit" value="Login" onClick={loginUser}  />
        </form><br/>
        <div className="login"><Link to="/register">If you don't have an account,<br/> make it one ! </Link> </div>
      </div>
    );
  }

  export default Login
