import React, {useState, useContext, useEffect} from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { UserContext } from "../../../App"
import {NavLink }from 'react-router-dom'
import './navbar.scss'

const MenuItem =(props)=>{
    const {userData} = useContext(UserContext)
    const [open, setOpen] = useState(false)

    useEffect (() => { 

    },[])

    const close =()=>{
       
    }

    return (
        <div className="hamburger" aria-label="hamburger-Menu">   
            <Hamburger 
                rounded duration={0.8} 
                toggled={open} 
                toggle={setOpen} 
                color="snow" 
                aria-label="hamburger-Menu"
            />
            {open && 
                <div>
                {userData.token ? (
                    <ul className="ham">
                        <li><NavLink to='/'> Home </NavLink></li>
                        <li><NavLink to='/contact'> contact </NavLink></li>
                        <li><NavLink to='/logout'> logout </NavLink></li>
                    </ul>
                ):(
                    <ul className="ham">
                        <li><NavLink to='/'> Home </NavLink></li>
                        <li><NavLink to='/contact'> contact </NavLink></li>
                        <li><NavLink to='/register'> Register </NavLink></li>
                        <li><NavLink to='/login'> Login </NavLink></li>
                    </ul>
                )}                    
                </div>
            }
        </div>
    )
}
export default MenuItem