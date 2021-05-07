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
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token
        console.log(token)

        let loggedIn = false
        if (token != null) {
            loggedIn = true
        }
        this.state = {
            loggedIn,
            check
        }
        console.log(loggedIn)
    }


    componentDidMount() {
        this.setState({});
      }

    render() {
        let {loggedIn} = this.state;
        return (
            <div>
                {/* Header of the website */}
                <div class="jumbotron jumbotron-fluid" style={{ margin: 0, backgroundColor: 'green  ' }} >
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
                                    <nav class="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">

                    <ul className="navbar-nav align-items-center">
                        <li className="nav-item ml-5">
                            <Link to="/" className="nav-link">
                                User View
                    </Link>
                        </li>


                        <li className="nav-item ml-5">
                            <Link to="/Profile" className="nav-link">
                        Profile
                            
                    </Link>
                        </li>
                        <li   className="nav-item ml-5">
                            <Link to="/Logout" className="nav-link">
                        Log Out
                    </Link>
                 

                         </li>
       {/* </li> 

                        {loggedIn ?
                         <button>Logout</button> : <button>Login</button>
                         }
                         <li > */}
                    </ul>

                    </nav>
                    {/* Go to another component */}
                    <Switch>

                        <Route exact path='/' component={Home} />

                        <Route path='/Profile' component={Profile} />
                        <Route path='/Register' component={Register} />
                        <Route path='/Logout' component={Logout} />
                        <Route path='/Login' component={Login} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />

                        <Route path='/MyProjectList' component={MyProjectList} />

                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />



                    </Switch>


                </BrowserRouter>
                <div class="jumbotron jumbotron-fluid" style={{ margin: 0, backgroundColor: 'green ' }} >
                    <div class="container ">
                        <div class="row ">
                            <div  style={{ color: 'white' }} class="col-md-3 pr-1" >
                                <h6 >Studying at RMIT</h6>
                                <div >Bachelor program</div>
                                <div> Post-graduate program</div>
                                <div> International student</div>
                                <div> Exchange to RMIT Melbourne</div>
                                <div> Scholarship</div>
                                <div> Frequently asked question</div>

                            </div>
                            <div style={{ color: 'white' }} class="col-md-3 pr-1" >
                                <h6 >About TeamDer</h6>
                                <div >Life at RMIT</div>
                                <div> Clubs at school</div>
                                <div> Student support</div>
                                <div> Opportunies </div>

                            </div>
                            <div  style={{ color: 'white' }} class="col-md-3 pr-1" >
                                <h6 >Payment method</h6>
                                <img src="https://i0.wp.com/www.sakuramobile.jp/wp-content/themes/FoundationPress/dist/assets/images/image-payment-method-card-360x240.png?resize=360%2C240&ssl=1" alt="Payment card method" width="200px" />

                            </div>
                            <div style={{ color: 'white' }} class="col-md-3 pr-1" >
                                <h6 >Connect with us</h6>
                                <img src="https://cdn130.picsart.com/257361938030212.png" alt="social media logo" width="200px" />


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}