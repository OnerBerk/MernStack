import React, { useContext, useState } from "react";
import { Link, useHistory } from 'react-router-dom'
import {connect }from 'react-redux'
import axios from 'axios'

import { UserContext } from "../../../App"
import useInput from '../../componentUi/Input/input'
import'../user.scss'


const Register = (props) =>{
    const { value:Name, bind:bindName, reset:resetName } = useInput('');
    const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
    const { value:Password, bind:bindPassword, reset:resetPassword } = useInput('');
    
    const { setUserData} = useContext(UserContext)
    const [formError, setFormError]= useState()

    const history = useHistory()
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        resetName();
        resetEmail();
        resetPassword();
    }
    
    const postUser= async(req, res, next)=>{
        //const errors = validationResult(req)


       await axios.post("/register",{
        name:Name,
        email:Email,
        password:Password
        })    
        .then(function(res){
            console.log("resdata", res.data)
                setUserData({ 
                    token:res.data.token,
                    user:res.data.name
                })
                localStorage.setItem("auth-token",res.data.token)
                history.push('/')
        
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
            <h2> Register </h2>
            { formError && 
                <div className="containerError"> {displayErrors() } 
                </div> }
 
            <form onSubmit={handleSubmit}>
            
                <br/>
                <label> Name:<br/>
                <input 
                    type="text" 
                    placeholder="enter your Name" 
                    {...bindName} />
                </label><br/>

                <label> Email:<br/>
                <input type="text" 
                    placeholder="enter your Email"
                    {...bindEmail} />
                </label><br/>

                <label> Password:<br/>
                <input
                    type="text" 
                    placeholder="enter your Password"
                {...bindPassword} />
                </label><br/><br/>
                
                <input type="submit" value="Register" onClick={ postUser }/>
            </form><br/>
            <div className="register" ><Link to="/login">Already have an account ?<br/> Go ahead !</Link> </div>
      </div>
    );
  }
  Register.propTypes ={
  }

  export default connect(
      null, 
)(Register)
