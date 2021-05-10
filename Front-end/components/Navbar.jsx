import React from 'react'
import { BrowserRouter, Router, Link} from 'react-router-dom'
function Navbar(){
    return (
        <div>
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item ml-5">
                            <Link to="/Home" className="nav-link">User View</Link>
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
        </div>
    )
}

export default Navbar
