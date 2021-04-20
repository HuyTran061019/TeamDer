import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

import Selection from './Selection.jsx'
import StudentList from './StudentList.jsx'
import ProjectList from './ProjectList.jsx'
import StudentDetail from './StudentDetail.jsx'
import Hello from './Hello.jsx'
import ProjectDetail from './ProjectDetail.jsx'

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
                   
                        <Route  exact path='/' component={Selection} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />
                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />
                        {/* <Route path='/DifferentView' component={DifferentView} />
                        <Route path='/AdminLogin' component={AdminLogin} />
                        <Route path='/AdminManagement' component={AdminManagement} />
                        <Route path={'/StudentDetail/:id'} component={StudentDetail} /> */}

                    </Switch>


                </BrowserRouter>

            </div>
        )
    }
}