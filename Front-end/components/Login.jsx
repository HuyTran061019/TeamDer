import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/students'
export default class Register extends React.Component {


    constructor(props) {
        super(props)
        //check token
        let loggedIn = false
        this.state = {

            //Basic info
            insertId: '',
            insertPassword: '',
            loggedIn,

            //Basic info
            students: [],

            studentId: '',
            studentName: '',
            studentYear: '',

            //Detail 
            description: '',
            specialtyExpertise: '',
            status: '',
            birthDate: '',
            major: '',
            studyingCourse: '',
            password: ''



        }

    }

    //Read all students from list
    fetchData() {
        fetch(url).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s.studentId !== 'undefined' && s.studentId !== "")
                this.setState({ students: list })
            })
    }


    //render 
    componentDidMount() {
        this.fetchData()
    }

    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }



    handleLogin(e) {
        e.preventDefault()
        if( this.state.insertId === "A" && this.state.insertPassword ==="A"){
            location.replace("/AdminPage")
        }else{
            fetch(url).then(res => res.json())
        for (let i = 0; i < this.state.students.length; i++) {
            if (this.state.insertId === this.state.students[i].studentId) {
                if (this.state.insertPassword === this.state.students[i].password) {
                    localStorage.setItem("token",this.state.students[i].studentId)
                    this.setState({
                        loggedIn: true
                    })
                    // this.props.history.push('/Selection');

                } else {
                    this.setState({ message: "Invalid name or password! Please try again. " })
                    return false;
                }
            }

        }
        this.setState({ message: "Invalid ! Please try again. " })
        }
        
    }
    // login() {
    //     if ((this.state.studentId !== "") &&(this.state.password !== "")) {
    //         console.log(this.state);
    //         fetch(url, {
    //             method: 'POST',
    //             body: JSON.stringify({ studentId: this.state.studentId, password: this.state.password })
    //         }).then(res => res.json())
    //            // .then(json => this.checkResult(json))
    //         //    .then(res => res.json())
    //         // .then(json => this.checkResult( json))
    //         //.then(function(response) => response.json())
    //         .then((responseData) => {
    //         console.log(responseData);
    //         })
    //         //this.setState({ message: "Login Succesfully  " })

    //     } else {
    //         this.setState({ message: "Login failed " })
    //     }


    // }
    render() {
        if (this.state.loggedIn) {
            return <Redirect to="/Home" />
        }
        return (
            <div className=" container ">
                  <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <br />
                        <h1>Login Form </h1>

                    <div>
                    <div className="form-group">
                        <input type="text" name="insertId" className="form-control" placeholder="ID" value={this.state.insertId} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" name="insertPassword" className="form-control" placeholder="Password" value={this.state.insertPassword} onChange={this.handleChange.bind(this)}/>
                    </div>
                    <button onClick={this.handleLogin.bind(this)} className="btn btn-success">Log in</button>
                    <div>
                        <h5 style={{ color: "red" }}>{this.state.message}</h5>
                    </div>
                    <div>
                        Don't have an account ? 
                        <Link to="/Register">
                            <button className="btn btn-info ml-2"> Register</button>
                        </Link>
                    </div>
                </div>
                <br />
                    </div>

                    <div className="col-md-3"></div>
         
            </div>
            </div>
        )
    }
}

