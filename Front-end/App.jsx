import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import AuthPage from './components/AuthPage.jsx'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import StudentList from './components/StudentList.jsx'
import ProjectList from './components/ProjectList.jsx'
import MyProjectList from './components/MyProjectList.jsx'
import StudentDetail from './components/StudentDetail.jsx'
import AdminPage from './components/AdminPage.jsx'

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
                <div className='container-fluid card text-white bg-secondary mb-2'>
                    <div className="row display-flex align-items-center">
                        <div className="col-md-2">
                            <img className='float-right'src="https://cdn.discordapp.com/attachments/818327233163952133/840103037644701706/logo_no_border.png" style={{ width: '130px', height: '120px' }} alt="" />
                        </div>
                        <div className="col-md-10 font-weight-bold">
                            <h1 className='card-title'>TeamDer</h1>
                            <p className='card-text'><em>A place to find great RMIT teammates</em></p>
                        </div>
                    </div>
                </div>
                
                <BrowserRouter>
                    {/* <nav className="navbar navbar-expand-sm bg-dark navbar-dark sticky-top">
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
                        </ul>
                    </nav> */}
                    {/* Go to another component */}
                    <Switch>
                        <Route exact path='/' component={Landing} />
                        <Route path='/Home' component={Home} />
                        <Route path='/Profile' component={Profile} />
                        <Route path='/AdminPage' component={AdminPage} />
                        <Route path='/Register' render={props => <AuthPage {...props} authRoute='/Register'/>} />
                        <Route path='/Logout' component={Logout} />
                        <Route path='/Login' render={props => <AuthPage {...props} authRoute='/Login'/>} />
                        <Route path='/StudentList' component={StudentList} />
                        <Route path='/ProjectList' component={ProjectList} />
                        <Route path='/MyProjectList' component={MyProjectList} />
                        <Route path='/StudentDetail/:studentId' component={StudentDetail} />
                        <Route path='/ProjectDetail/:postId' component={ProjectDetail} />
                    
                    </Switch>
                </BrowserRouter>

                <div className="container card bg-secondary mt-3">
                    <div className="row">
                        <div className="col-md-3 pr-0" >
                            <a href="https://www.rmit.edu.vn/study-at-rmit"><h5 className='card-header mb-2' >Studying at RMIT</h5></a>
                            <a href="https://www.rmit.edu.vn/study-at-rmit/undergraduate-programs"><div>Bachelor program</div></a>
                            <a href="https://www.rmit.edu.vn/study-at-rmit/postgraduate-programs"><div> Postgraduate programs</div></a>
                            <a href="https://www.rmit.edu.vn/study-at-rmit/international-students"><div> International student</div></a>
                            <a href="https://www.rmit.edu.vn/study-at-rmit/global-experiences/cross-campus-to-rmit-melbourne"><div> Exchange to RMIT Melbourne</div></a>
                            <a href="https://www.rmit.edu.vn/study-at-rmit/scholarships"><div> Scholarship</div></a>
                        </div>
                        <div className="col-md-3 px-0" >
                            <h5 className='card-header mb-2'>About TeamDer</h5>
                            <div >Life at RMIT</div>
                            <div> Clubs at school</div>
                            <div> Student support</div>
                            <div> Opportunies </div>
                        </div>
                        <div className="col-md-3 px-0" >
                            <h5 className='card-header mb-2'>Payment method</h5>
                            <img src="https://i0.wp.com/www.sakuramobile.jp/wp-content/themes/FoundationPress/dist/assets/images/image-payment-method-card-360x240.png?resize=360%2C240&ssl=1" alt="Payment card method" width="200px"/>
                        </div>
                        <div className="col-md-3 pl-0" >
                            <h5 className='card-header mb-3'>Connect with us</h5>
                            <img src="https://cdn130.picsart.com/257361938030212.png" alt="social media logo" width="200px" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}