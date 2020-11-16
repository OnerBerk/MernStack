import React,{useEffect, useState} from 'react'
import axios from 'axios'
import moment from'moment'
import useInput from '../../componentUi/Input/input'
import Gravatar from 'react-gravatar'
import '../user.scss'
import {useHistory} from 'react-router-dom'

function UserProfil(){
    const token =localStorage.getItem("auth-token")
    const [id, setId]=useState('')
    const [name, setName]=useState('undefined')
    const [email, setEmail]=useState('')
    const [avatar, setAvatar]=useState()
    const [date, setDate]=useState('')
    const { value:Name, bind:bindName, reset:resetName } = useInput('');
    const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
    const history = useHistory()

    useEffect (() => { 
        getUser()
    },[])

    const getUser = async()=>{
        await axios.get('/user',{ headers :{Authorization: `Bearer ${token}`} } )
       .then((res)=>{
        setId(res.data.data._id)
        setAvatar(res.data.data.avatar)
        setName(res.data.data.name)
        setEmail(res.data.data.email)
        setDate(res.data.data.date)
       })
       .catch(function(err){
        console.log(err)
      })
     }

     const handleSubmit = (evt) => {
        evt.preventDefault();
        resetName();
        resetEmail();
    }  

     const getUserNameAndUpdate = async()=>{
       await axios.post('/update',
            {  name: Name, email:email },
            { headers: { Authorization: `Bearer ${token}`} }
        )
        .then (res =>{
            if (Name){
                if( window.confirm("Do you really want to update Name")){
                    setName(Name)}}
                    console.log("user updated")
        })
        .catch(function(err){
            console.log(err.response)
        })
     }
     const getUserEmailAndUpdate = async()=>{
        await axios.post('/update',
             { name:name, email: Email} ,
             {headers: { Authorization: `Bearer ${token}`}}
         )
         .then (res =>{
        if (Email){
            if( window.confirm("Do you really want to update Email")){
                 setEmail(Email)}}
                 console.log("user updated")
         })
         .catch(function(err){
             console.log(err.response)
         })
      }

        
      const deleteUser = async()=>{ 
        await axios.delete("/delete/"+id )
        .then (res =>{
            if (id){
                if( window.confirm("Do you really want to delete your account")){
                     localStorage.removeItem('auth-token')
                     history.push('/')
                     window.location.reload()
                    }}
                     console.log("user deleted")
             })
             .catch(function(err){
                 console.log(err.response)
             })
      
      }


    return (
        <div className="user" >

                        <br/><strong> {name} </strong>  c'est ta page <br/>
                        Dans la place depuis <strong>  {moment(date).format("MMM Do YY") }</strong><br/><br/>

                        <>
                        <Gravatar email={avatar} size={100} rating="pg" default="monsterid" className="CustomAvatar-image"/>  </><br/><br/><br/>
                        <form onSubmit={handleSubmit}>
                        <table >
                            <tbody>
                                <tr >
                                    <td className="formTitle"> UserName </td>
                                    <td> {name}</td>
                                    <td>
                                        <input 
                                        type="text"
                                        placeholder='new name' 
                                        {...bindName}
                                        minLength="4"
                                        /> 
                                    </td>
                                    <td> <button type="submit" className="updatButton" 
                                    onClick={ getUserNameAndUpdate} > Update  </button> </td>
                                </tr>

                                <tr>
                                    <td className="formTitle"> Email  </td>
                                    <td> {email} </td>
                                    <td>
                                        <input 
                                        type="email"
                                        placeholder='new email' 
                                        {...bindEmail} 
                                        autoComplete="off"
                                        /> 
                                    </td>
                                    <td> <input type="submit" className="updatButton" onClick={getUserEmailAndUpdate} value="Update"/></td>
                                </tr>
                            </tbody>
                        </table>
                        </form><br/><br/>
                        <button  className="deleteButton" onClick={deleteUser}> Delete Account </button>
                </div>
    )
}

export default UserProfil
