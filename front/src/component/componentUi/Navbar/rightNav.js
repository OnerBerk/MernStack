import React, {useContext} from 'react'
import {NavLink}from 'react-router-dom'
import './navbar.scss'
import { UserContext } from "../../../App"

const RightNav =(props)=>{
    const {userData} = useContext(UserContext)

    return (
        <div>
            {
                userData.token ? (
                <ul className="rightnav">
                    <li><NavLink to='/'> Home </NavLink></li>
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
