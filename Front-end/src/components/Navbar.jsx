import React from 'react'
import { BrowserRouter, Router, Link} from 'react-router-dom'
function Navbar(){
    return (
        <nav className="row navbar navbar-expand-lg navbar-dark bg-secondary fixed-top font-weight-bold">
            <div className='d-none d-sm-block col-sm-1'></div>

            <div className='col-4 col-sm-1 col-md-2 col-xl-1'>
                <Link to="/Home" className="nav-link btn btn-primary">Home</Link>
            </div>

            <div className='col-4 col-sm-1 col-md-2 col-xl-1'>
                <Link to="/Profile" className="nav-link btn btn-primary">Profile</Link>
            </div>

            <div className='d-none d-sm-block col-sm-7 col-md-4 col-xl-7'></div>
            <div className='col-4 col-sm-1 col-md-2 col-xl-1'>
                <Link to="/Logout" className="nav-link btn btn-secondary">Logout</Link>
            </div>

            <div className='d-none d-sm-block col-sm-1'></div>
        </nav>
    )
}

export default Navbar
