import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Logout extends Component{

    constructor(props){
        super(props)
        localStorage.removeItem("token")

    }

    render(){
        return(
            <div class=" container mb-sm-5">
                    <h1>You have been logged out!!</h1>
                    <Link to="/" className="nav-link">
                                    Login again
                </Link>
            </div>
        )
    }
}