import React from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'



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

            <div class="container " >
                <div class="row">
                    <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                        <h1>This is a column</h1>
                        <div> Welcome student with ID: {this.state.check}</div>

                        <Link to="/Logout" className="nav-link">
                            <button>
                                Log Out
                            </button>

                        </Link>
                        <div style={{  height: '1000px' }}></div>

                    </div>
                    <div class="col-md-8">
                        {/* Select to see Student List or Project List */}
                        <h2>Please select what to search: </h2>
                        <Link to="/StudentList" className="nav-link">
                            <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Student List</a>
                        </Link>

                        <Link to="/ProjectList" className="nav-link">
                            <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Project List</a>
                        </Link>

                    </div>
                </div>

            </div>
        )
    }
}