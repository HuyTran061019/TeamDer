import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Selection from './componets/Home.jsx'
import StudentList from './componets/StudentList.jsx'
import ProjectList from './componets/ProjectList.jsx'
import StudentDetail from './componets/StudentDetail.jsx'
import Register from "./componets/Register.jsx"
import Hello from './componets/Hello.jsx'
import ProjectDetail from './componets/ProjectDetail.jsx'

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
                                <Link to="/" className="nav-link">
                                    User View
                </Link>
                            </li>
                            <li className="nav-item ml-5">
                                <Link to="/Register" className="nav-link">
                                    Register
                </Link>
                            </li>
                        </ul>
                        {/* <ul className="navbar-nav align-items-center">
                            <li className="nav-item ml-5">
                                <Link to="/AdminLogin" className="nav-link">
                                    Admin login
                </Link>
                            </li>
                        </ul> */}

                    </nav>


                    <ul>

                    </ul>

                    {/* Go to another component */}
                    <Switch>

                        <Route exact path='/' component={Selection} />
                        <Route path='/Register' component={Register} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />
                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />

                    </Switch>


                </BrowserRouter>

            </div>
        )
    }
}