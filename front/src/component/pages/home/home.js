import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Place from '../place/place'

const Home =(props)=>{
    const token = localStorage.getItem('auth-token')
    const user = localStorage.getItem("user")
    const userPro =JSON.parse(user)

    return(
        <div className="home">
           {!token &&<h1> Hello les bloggeurs </h1>}
           {!token && <Link to='/register' > Enregitrez vous !</Link>}<br/>
           {!token && <Link to='/login' > Connectez vous !</Link>}
           
           {token &&<h1> Hello {userPro.name} !</h1>}
           {token &&  <Place/>}
        </div>
    )
}
export default Home