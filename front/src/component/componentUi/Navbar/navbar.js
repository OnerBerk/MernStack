
import RightNav from './rightNav'
import MenuItem from './menuItem'
import './navbar.scss'

const Navbar =(props)=>{
    return (
            <nav className="nav">
                <div className="logo">LOGO</div>
                <RightNav/>
                <MenuItem/>
            </nav>
    )
}

export default Navbar