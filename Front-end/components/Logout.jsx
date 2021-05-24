import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Logout extends Component{

    constructor(props){
        super(props)
        localStorage.removeItem("token")

    }

    render(){
        return(
            <div className=" container text-center">
                <h4>You have been logged out!</h4>
                    <button className='btn btn-success'>
                        <Link to="/" className="nav-link h5">
                            Login again
                        </Link>
                    </button>
                <div style={{  height: '500px' }}></div>
            </div>
        )
    }
}