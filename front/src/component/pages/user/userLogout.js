import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom'

const Logout=(props)=>{
    const history = useHistory()
    useEffect (() => { 
        setNull()
    },[])

   
    const setNull =()=>{
        localStorage.removeItem("auth-token")
        localStorage.clear()
        history.push('/')
        window.location.reload()
}
return(
    <>
    {setNull()}
    </>
)
}

export default Logout