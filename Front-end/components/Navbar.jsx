import React from 'react'
import { BrowserRouter, Router, Link} from 'react-router-dom'
function Navbar(){
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <ul className="navbar-nav align-items-center w-100">
                <li className="nav-item ml-5">
                    <Link to="/Home" className="nav-link">Home</Link>
                </li>
                <li className="nav-item ml-5">
                    <Link to="/Profile" className="nav-link">
                        Profile
                    </Link>
                </li>
                <li className="nav-item ml-5">
                    <Link to="/Logout" className="nav-link">
                        Log Out
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
