import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Selection from './components/Home.jsx'
import StudentList from './components/StudentList.jsx'
import ProjectList from './components/ProjectList.jsx'
import StudentDetail from './components/StudentDetail.jsx'
import Register from "./components/Register.jsx"
import Login from "./components/Login.jsx"
import Profile from "./components/Profile.jsx"
import ProjectDetail from './components/ProjectDetail.jsx'

import BoardUser from './components/BoardUser.jsx'
import BoardAdmin from './components/BoardAdmin.jsx'

//BackEnd
// import UserService from "../services/user.service";


export default class App extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.logOut = this.logOut.bind(this);
    
    //     this.state = {
    //       showModeratorBoard: false,
    //       showAdminBoard: false,
    //       currentUser: undefined,
    //     };
    //   }
    
    //   componentDidMount() {
    //     const user = AuthService.getCurrentUser();
    
    //     if (user) {
    //       this.setState({
    //         currentUser: user,
    //         showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
    //         showAdminBoard: user.roles.includes("ROLE_ADMIN"),
    //       });
    //     }
    //   }
    
    //   logOut() {
    //     AuthService.logout();
    //   }

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
                                <Link to="/" className="nav-link">
                                    User View
                </Link>
                            </li>
                            <li className="nav-item ml-5">
                                <Link to="/Register" className="nav-link">
                                    Register
                </Link>
                            </li>

                            <li className="nav-item ml-5">
                                <Link to="/Login" className="nav-link">
                                    Login
                </Link>
                            </li>

                        </ul>

                        {/* Current User is not defined */}
{/* 
                        {currentUser ? (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/Profile"} className="nav-link">
                                        {currentUser.username}
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <a href="/Login" className="nav-link" onClick={this.logOut}>
                                        LogOut
                </a>
                                </li>
                            </div>
                        ) : (
                            <div className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link to={"/Login"} className="nav-link">
                                        Login
                </Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/Register"} className="nav-link">
                                        Sign Up
                </Link>
                                </li>
                            </div>
                        )} */}
                    </nav>


                    <ul>

                    </ul>

                    {/* Go to another component */}
                    <Switch>

                        <Route exact path='/' component={Selection} />
                        <Route path='/Register' component={Register} />
                        <Route path='/Login' component={Login} />
                        <Route path='/Profile' component={Profile} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />
                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />

                        <Route path="/user" component={BoardUser} />
                        <Route path="/admin" component={BoardAdmin} />

                    </Switch>


                </BrowserRouter>

            </div>
        )
    }
}