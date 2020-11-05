import React,{useState, useEffect} from "react";
import { Redirect, Link} from 'react-router-dom'
import axios from 'axios'

import useInput from '../../componentUi/Input/input'
import'./user.scss'

export function Register(props) {
    const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');
    const [login, setlogin]= useState(false)

    useEffect (() => {
      redirect()       
    },[])


    const handleSubmit = (evt) => {
        evt.preventDefault();
        resetEmail();
        resetPassword();
    }

    const loginUser=()=>{
      axios.post("/login",{
        email: Email,
        password: Password
    })
    .then(function(res){
        console.log("token",res.data)
    })
    .then(()=>setlogin(true))
    .catch(function(error){
      alert(error, "Veuillez verifier votre email ou votre mot de passe.");
    })
    }
    const redirect=()=>{
      if(login){
      return(<Redirect to="/"/>)}
  }
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Email:<br/>
            <input placeholder="enter your Email" type="text" {...bindEmail} />
          </label><br/>
          <label>
            Password:<br/>
            <input placeholder="enter your Password" type="text" {...bindPassword} />
          </label><br/><br/>
          <input  type="submit" value="Login" onClick={loginUser} />
        </form><br/>
        <div><Link to="/register">If you don't have an account , make it one ! </Link> </div>
        {redirect()}
      </div>
    );
  }

  export default Register