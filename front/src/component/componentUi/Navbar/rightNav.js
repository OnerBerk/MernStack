import React from 'react'
import {NavLink}from 'react-router-dom'
import './navbar.scss'

const RightNav =(props)=>{
    const token = localStorage.getItem('auth-token')


    return (
        <div>
            {
                token ? (
                <ul className="rightnav">
                    <li><NavLink to='/'> Home </NavLink></li>
                    <li><NavLink to='/user'> Your Profile </NavLink></li>
                    <li><NavLink to='/contact'> contact </NavLink></li>
                    <li><NavLink to='/logout'> logout </NavLink></li>
                </ul>
            ):(
                <>
                <ul className="rightnav">
                    <li><NavLink to='/'> Home </NavLink></li>
                    <li><NavLink to='/contact'> contact </NavLink></li>
                    <li><NavLink to='/register'> Register </NavLink></li>
                    <li><NavLink to='/login'> Login </NavLink></li>
                </ul>
                </>
            )
            }
        </div>
        )}
        

export default RightNav
