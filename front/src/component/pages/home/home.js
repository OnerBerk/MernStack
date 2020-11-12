import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from "../../../App"
import Place from '../place/place'

const Home =(props)=>{
    const { userData} = useContext(UserContext)
    return(
        <div className="home">
           {!userData.token &&<h1> Hello les bloggeurs </h1>}
           {!userData.token && <Link to='/register' > Enregitrez vous !</Link>}<br/>
           {!userData.token && <Link to='/login' > Connectez vous !</Link>}
           
           {userData.token &&<h1> Hello {userData.name} !</h1>}
           {userData.token &&  <Place/>}
        </div>
    )
}
export default Home