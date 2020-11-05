import React from 'react'
import {Link }from 'react-router-dom'
import './navbar.scss'

const RightNav =(props)=>{
    return (
            <ul className="rightnav">
                <li><Link to='/'> Home </Link></li>
                <li><Link to='/login'> Login </Link></li>
                <li><Link to='/register'> Register </Link></li>
                <li><Link to='/contact'> contact </Link></li>
            </ul>
    )
}
export default RightNav
