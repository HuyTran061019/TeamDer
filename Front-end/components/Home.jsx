import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import Navbar from './Navbar.jsx';


export default class Home extends React.Component {
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        console.log(token)

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            check
        }
    }

    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/Login" />
        }
        return (
            <div>
                <Navbar/>
                <div className="container " >
                    <div className="row">
                        <div className="col-md-4" >
                            <h3 > Welcome student with ID: {this.state.check}</h3>
                            <div style={{  height: '100px' }}></div>
                        </div>
                        <div className="col-md-8 card border-success mb-3 px-0">
                            {/* Select to see Student List or Project List */}
                            <h2 className='card-header'>Please select what to search: </h2>
                            <Link to="/StudentList" className="nav-link">
                                <button type="button" className="btn btn-success">Student List</button>
                            </Link>
                            <Link to="/ProjectList" className="nav-link">
                                <button type="button" className="btn btn-success">Project List</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}