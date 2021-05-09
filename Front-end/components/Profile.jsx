import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/students'
export default class Profile extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)
        const token = localStorage.getItem("token")
        let check = token

        let loggedIn = true
        if (token == null) {
            loggedIn = false
        }
        this.state = {
            loggedIn,
            check,
            //Basic info
            students: [],

            studentId: '',
            studentName: '',
            studentYear: '',

            contactMail: '',
            phoneNumber: '',

            //Detail 
            description: '',
            specialtyExpertise: '',
            status: '',
            birthDate: '',
            major: '',
            studyingCourse: ''
        }

    }
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }
    fetchData() {
        fetch(url + "/" + this.state.check)
            .then(res => res.json())
            .then(json => this.setState({ students: json }))
    }

    componentDidMount() {
        this.fetchData()
    }
    edit(studentId, studentName, studentYear, contactMail, phoneNumber, description, specialtyExpertise, status, birthDate, major, studyingCourse) {
        this.setState({
            studentId: studentId, studentName: studentName, studentYear: studentYear, contactMail: contactMail, phoneNumber: phoneNumber,description: description, specialtyExpertise: specialtyExpertise, status: status, birthDate: birthDate, major: major ,studyingCourse: studyingCourse
        })
    }
    save(){
        fetch(url, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                studentId: this.state.studentId,
                studentName: this.state.studentName, studentYear: this.state.studentYear, contactMail: this.state.contactMail, phoneNumber: this.state.phoneNumber, description: this.state.description, specialtyExpertise: this.state.specialtyExpertise, status: this.state.status, birthDate: this.state.birthDate, major: this.state.major, studyingCourse: this.state.studyingCourse
            })
        }).then(res => res.json())
            .then(json => this.fetchData())
    }
    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/Login" />
        }
        return (
            <div className="container ">
                <div>
                    <div className="row">
                        <div className="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                            <h1>This is a column</h1>
                            <div> Welcome student with ID: {this.state.check}</div>

                            <Link to="/MyProjectList" className="nav-link">
                                <button>
                                    My Posts
                            </button>

                            </Link>

                            <Link to="/Logout" className="nav-link">
                                <button>
                                    Log Out
                            </button>

                            </Link>

                        </div>
                        <div className="col-md-8">
                            <div>This is the profile</div>
                            {this.state.students.map(s =>
                                <div key={s.studentId}>
                                    <h1 className="font-weight-bold" style={{ color: "red" }}> Student Detail: </h1>
                                    <br />
                                    {/* Course info */}
                                    <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Student Info:   </h2>
                                    <div className="card mb-2" >
                                        <div className="card-body border border black" >
                                            <h4 className="font-weight-bold">Student name : {s.studentName}</h4>
                                            <h4>Student id :{s.studentId}</h4>
                                            <h5>Year: {s.studentYear} </h5>
                                            <h5>Birth Date: {s.birthDate} </h5>
                                            <h5>Contact Mail: {s.contactMail} </h5>
                                            <h5>Phone Number: {s.phoneNumber} </h5>
                                            <h5>Status: {s.status} </h5>
                                        </div>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#studentInfoModal" onClick={this.edit.bind(this, s.studentId, this.state.studentName, this.state.studentYear, this.state.contactMail, this.state.phoneNumber,this.state.description, this.state.specialtyExpertise, this.state.status, this.state.birthDate, this.state.major, this.state.studyingCourse)}>EDIT</button>
                                        <div className="modal fade" id="studentInfoModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Student Information</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                                            Student Name: <input className="mt-1" type="text" id="studentName" name="studentName" className="form-control" value={s.studentName}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Student Year: <input className="mt-1" type="text" id="studentYear" name="studentYear" className="form-control" value={s.studentYear}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Birth Date: <input className="mt-1" type="date" id="birthDate" name="birthDate" className="form-control" value={s.birthDate}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Contact Mail: <input className="mt-1" type="text" id="contactMail" name="contactMail" className="form-control" value={s.contactMail}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Phone Number: <input className="mt-1" type="text" id="phoneNumber" name="phoneNumber" className="form-control" value={s.phoneNumber}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Status: <input className="mt-1" type="text" id="status" name="status" className="form-control" value={s.status}
                                                            onChange={this.handleChange.bind(this)} />
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Specialty and Description info */}
                                    <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Description Detail:</h2>
                                    <div className="card mb-2" >
                                        <div className="card-body border border black" >
                                            <h4 className="font-weight-bold">Experises : {s.specialtyExpertise}</h4>
                                            <br />

                                            <h6 className="mb-2">Description detail: {s.description}</h6>
                                        </div>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#studentDescModal" onClick={this.edit.bind(this, s.studentId, this.state.studentName, this.state.studentYear, this.state.contactMail, this.state.phoneNumber, this.state.description, this.state.specialtyExpertise, this.state.status, this.state.birthDate, this.state.major, this.state.studyingCourse)}>EDIT</button>
                                        <div className="modal fade" id="studentDescModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Student Description</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                                            Expertises: <input className="mt-1" type="text" id="specialtyExpertise" name="specialtyExpertise" className="form-control" value={s.specialtyExpertise}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Description Detail:
                                                            <textarea name="description" value={s.description}
                                                            onChange={this.handleChange.bind(this)} cols="30" rows="5"></textarea>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Major and course and others */}
                                    <h2 style={{ color: "midnightblue" }} className="font-weight-bold"> Major Detail:</h2>
                                    <div className="card mb-2" >
                                        <div className="card-body border border black" >

                                            <h6>Major Name :{s.major}</h6>
                                            <br />
                                            <h6>Studying Course : {s.studyingCourse}</h6>
                                        </div>
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#majorDetailModal" onClick={this.edit.bind(this, s.studentId, this.state.studentName, this.state.studentYear, this.state.contactMail, this.state.phoneNumber, this.state.description, this.state.specialtyExpertise, this.state.status, this.state.birthDate, this.state.major, this.state.studyingCourse)}>EDIT</button>
                                        <div className="modal fade" id="majorDetailModal">
                                            <div className="modal-dialog">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title">Major Detail</h5>
                                                    </div>
                                                    <div className="modal-body">
                                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                                            Major Name: <input className="mt-1" type="text" id="major" name="major" className="form-control" value={s.major}
                                                            onChange={this.handleChange.bind(this)} />
                                                            <br />
                                                            Studying Course:
                                                            <textarea name="studyingCourse" value={s.studyingCourse}
                                                            onChange={this.handleChange.bind(this)} cols="30" rows="5"></textarea>
                                                        </div>
                                                    
                                                    </div>
                                                    <div className="modal-footer">
                                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        <button type="button" className="btn btn-primary" onClick={this.save.bind(this)}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>


                            )}
                        </div>
                    </div>

                </div>
            </div>



        )
    }
}