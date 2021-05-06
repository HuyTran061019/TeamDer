import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Home from './components/Home.jsx'
import StudentList from './components/StudentList.jsx'
import ProjectList from './components/ProjectList.jsx'
import MyProjectList from './components/MyProjectList.jsx'
import StudentDetail from './components/StudentDetail.jsx'

import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx"
import Logout from "./components/Logout.jsx"

import ProjectDetail from './components/ProjectDetail.jsx'




export default class App extends React.Component {


    render() {
        return (
            <div>
                {/* Header of the website */}
                <div class="jumbotron jumbotron-fluid" style={{ margin: 0, backgroundColor: 'pink  ' }} >
                    <div class="container">

                        <div class="row">
                            <div class="col-md-2">
                                <img src="https://uxwing.com/wp-content/themes/uxwing/download/10-brands-and-social-media/tinder.png" style={{ width: '130px', height: '120px' }} alt="" />
                            </div>

                            <div class="col-md-10">
                                <br />
                                <h1 style={{ color: 'white' }}>TeamDer</h1>
                                <p style={{ color: 'white' }}>Where RMIT Students find best Teammates !! ( or atleast gud heh)</p>
                            </div>
                        </div>



                    </div>
                </div>
                <BrowserRouter>
                    <nav class="navbar navbar-expand-sm bg-dark navbar-dark">

                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item ml-5">
                                <Link to="/Home" className="nav-link">
                                    User View
                </Link>
                            </li>
                            <li className="nav-item ml-5">
                                <Link to="/Register" className="nav-link">
                                    Register
                </Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link to="/" className="nav-link">
                                    Login
                </Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link to="/Profile" className="nav-link">
                                    Profile
                </Link>
                            </li>

                        </ul>

                    </nav>


                    <ul>

                    </ul>

                    {/* Go to another component */}
                    <Switch>

                        <Route exact path='/' component={Login} />

                        <Route path='/Profile' component={Profile} />
                        <Route path='/Register' component={Register} />
                        <Route path='/Logout' component={Logout} />
                        <Route path='/Home' component={Home} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />

                        <Route path='/MyProjectList' component={MyProjectList} />

                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />



                    </Switch>


                </BrowserRouter>

            </div>
        )
    }
}