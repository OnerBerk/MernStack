import React from 'react'
import { Link } from 'react-router-dom'
const Home =(props)=>{
    return(
        <div>
           <Link to='/register' > Enregitrez vous !</Link>
           <Link to='/login' > connectez vous !</Link>
        </div>
    )
}

export default Home