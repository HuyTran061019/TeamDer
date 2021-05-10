import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/students'
export default class Register extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
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

            password: '',

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

    save() {

        // e.preventDefault()
        fetch(url).then(res => res.json())
        for (let i = 0; i < this.state.students.length; i++) {
            if (this.state.studentId === this.state.students[i].studentId) {
                this.setState({ message: "Duplicated ID " })
                return
            } else  if (this.state.studentName === this.state.students[i].studentName) {
                this.setState({ message: "Duplicated Name " })
                return
            }

        }   
        if( this.state.password.length <8 ){
            this.setState({ message: "Password needs to be at least 8 letters long " })
            return
        }    else if ((this.state.studentId !== "") &&( this.state.studentName !== "") &&(this.state.password !== "")) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ studentId: this.state.studentId, studentName: this.state.studentName, password: this.state.password })
            }).then(res => res.json())
                .then(json => this.fetchData())
            this.setState({ message: "Succesful Registered " })

        } else {
            this.setState({ message: "Invalid Input " })
        }


    }
    render() {
        return (
            <div className=" container mb-sm-5">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">

                        <div>
                            <br />

                            {/* Admin login form */}
                            <h2 className=" pl-4">Register Form</h2>
                            <form className=" mb-4 pl-4  pt-2 pm-2">

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Id:
                                    <input type="text" name="studentId" className="form-control" placeholder="Id" value={this.state.studentId} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Name:
                                    <input type="text" name="studentName" className="form-control" placeholder="Name" value={this.state.studentName} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Password:
                                    <input type="text" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10" >
                                        <button type="button" className="btn btn-primary" className=" btn btn-success mb-2  " onClick={this.save.bind(this)} data-toggle="modal" data-target="#myModal" >Register</button>
                                        <div id="myModal" className="modal fade" role="dialog">
                                            <div className="modal-dialog">

                                                {/* Modeal content */}
                                                <div className="modal-content">
                                                    <div className="modal-body">
                                                        <p style={{ color: "blue" }}>{this.state.message}</p>
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        
                        </div>
                        <div>
                        Already have an account ?: 
                        <Link to="/Login">
                            <button className="btn btn-info ml-2 pt-2"> Login</button>
                        </Link>
                    </div>
                    </div>
                    <div className="col-md-3"></div>
                </div>

            </div>


        )
    }
}