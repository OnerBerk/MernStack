import React, {useState} from 'react'
import { Squash as Hamburger } from 'hamburger-react'
import './navbar.scss'

const MenuItem =(props)=>{
    const [open, setOpen] = useState(false)
    console.log(open)
    return (
        <div className="hamburger" >   
            <Hamburger rounded duration={0.8} toggled={open} toggle={setOpen} 
            onToggle={tooggled => {
                if(tooggled)
                {
       
                } 
                else
                {
                    return('adaaddaad')
                }

            }}/>
        </div>
    )
}
export default MenuItem