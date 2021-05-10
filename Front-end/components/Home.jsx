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
                    <div className="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                        <h1>This is a column</h1>
                        <div> Welcome student with ID: {this.state.check}</div>

                        <Link to="/Logout" className="nav-link">
                            <button>
                                Log Out
                            </button>

                        </Link>
                        <div style={{  height: '1000px' }}></div>

                    </div>
                    <div className="col-md-8">
                        {/* Select to see Student List or Project List */}
                        <h2>Please select what to search: </h2>
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