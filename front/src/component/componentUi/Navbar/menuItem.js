import React, {useState, useEffect} from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import { NavLink }from 'react-router-dom'
import './navbar.scss'

const MenuItem =(props)=>{
    const [open, setOpen] = useState(false)
    const token = localStorage.getItem('auth-token')

    useEffect (() => { 

    },[])

    const close =()=>{
        setOpen(!open)
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
                {token ? (
                    <ul className="ham">
                        <li><NavLink onClick={close} to='/'> Home </NavLink></li>
                        <li><NavLink onClick={close} to='/user'> Your Profile </NavLink></li>
                        <li><NavLink onClick={close} to='/contact'> contact </NavLink></li>
                        <li><NavLink onClick={close} to='/logout'> logout </NavLink></li>
                    </ul>
                ):(
                    <ul className="ham">
                        <li><NavLink onClick={close} to='/'> Home </NavLink></li>
                        <li><NavLink onClick={close} to='/contact'> contact </NavLink></li>
                        <li><NavLink onClick={close} to='/register'> Register </NavLink></li>
                        <li><NavLink onClick={close} to='/login'> Login </NavLink></li>
                    </ul>
                )}                    
                </div>
            }
        </div>
    )
}
export default MenuItem