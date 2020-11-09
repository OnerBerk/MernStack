import React, { useState,useEffect } from "react";
import { Redirect, Link} from 'react-router-dom'
import axios from 'axios'

import useInput from '../../componentUi/Input/input'
import'./user.scss'


export function Register(props) {
    const { value:Name, bind:bindName, reset:resetName } = useInput('');
    const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');
    const [register, setregister]= useState(false)
    const config ={ header: {'Conetnt-Type':'application/json'}}


    useEffect (() => {
        redirect()       
      },[])
      
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //console.log(`${Name} ${Email} ${Password}`);
        resetName();
        resetEmail();
        resetPassword();
    }

    const postUser=()=>{
        axios.post("/register",{
            name: Name,
            email: Email,
            password: Password
        },config)
        .then(function(res){
            console.log(res.data)
        })
        .then(()=>setregister(true))
        .catch(function(err){
            console.error(err.res.data)
        })
    }
    const redirect=()=>{
        if(register){
        return(<Redirect to="/login"/>)}
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label> Name:<br/>
                <input type="text" placeholder="enter your Name" {...bindName} />
                </label><br/>

                <label> Email:<br/>
                <input type="text" placeholder="enter your Email"  {...bindEmail} />
                </label><br/>

                <label> Password:<br/>
                <input type="text" placeholder="enter your Password"  {...bindPassword} />
                </label><br/><br/>
                
                <input type="submit" value="Register" onClick={ postUser }/>
            </form>
            <div><Link to="/login">Already have an account ? Go ahead !</Link> </div>
            {redirect()}
      </div>
    );
  }

  export default Register