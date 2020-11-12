import React, {useEffect, useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { UserContext } from "../../../App"

const Logout=(props)=>{
    const {setUserData} = useContext(UserContext)
    useEffect (() => { 
        setNull()
    },[])

   
    const setNull =()=>{
        setUserData({
            token:undefined,
            user:undefined
        })
        localStorage.setItem("auth-token", "")
        return(
            <Redirect to path="/" />
        )
}
return(
    <>
    {setNull()}
    </>
)
}

export default Logout