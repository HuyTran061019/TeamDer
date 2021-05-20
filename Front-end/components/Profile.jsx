import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import Navbar from './Navbar.jsx'

const url = 'http://localhost:9000/students'
const url2 = 'http://localhost:9000/notifications'
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
            studyingCourse: '',

            //Noti
            notis: [],
            notiToUserId: '',
            commentedStudentId: '',
            content: ''
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
    fetchData2() {
        fetch(url2).then(res => res.json())
            .then(json => {
                var list = json.filter(s => s.notiToUserId == this.state.check)
                this.setState({ notis: list })
            })
    }



    componentDidMount() {
        this.fetchData()
        this.fetchData2()
    }
    edit(studentId, studentName, studentYear, contactMail, phoneNumber, description, specialtyExpertise, status, birthDate, major, studyingCourse) {
        this.setState({
            studentId: studentId, studentName: studentName, studentYear: studentYear, contactMail: contactMail, phoneNumber: phoneNumber, description: description, specialtyExpertise: specialtyExpertise, status: status, birthDate: birthDate, major: major, studyingCourse: studyingCourse
        })
    }
    save() {
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
            <div>
                <Navbar />
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4">
                            <div className='card align-middle text-center mb-3'>
                                <h4>Uploaded Posts</h4>
                                <Link to="/MyProjectList" className="nav-link pl-0">
                                    <button className="btn btn-success font-weight-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-post mr-1" viewBox="0 0 16 16">
                                    <path d="M4 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8z"/>
                                    <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                                    </svg>
                                        My Post
                                    </button>
                                </Link>
                            </div>
                            <div className='card'>
                                <h4 className='card-header bg-warning text-center'>
                                    Notification
                                </h4>
                                <div className='card-body'>
                                    {this.state.notis.map(i => 
                                        <div className="card mt-1" key={i.notiToUserIdId}>
                                            <div className="card-header bg-info mb-2 text-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bell-fill" viewBox="0 0 16 16">
                                                    <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                                                </svg>
                                            </div>
                                            <h4 className='d-inline text-white ml-2'>
                                                <Link className='mr-2' to={`/StudentDetail/${i.commentedStudentId}`}>
                                                    {i.commentedStudentId}
                                                </Link>
                                                commented on your post: "{i.content}""
                                            </h4>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-md-8">
                            {this.state.students.map(s =>
                                <div key={s.studentId} className='card border-success'>
                                    <div className='card-header mb-3'>
                                        <h1> My Profile </h1>
                                    </div>
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body">
                                            <h3> Student Information</h3>
                                            <hr className = 'mt-0' />
                                            <h4  className='text-muted'>Student Name: <h4 className='d-inline text-white'>{s.studentName}</h4></h4>
                                            <h4 className='text-muted'>Student ID: <h4 className='d-inline text-white'>{s.studentId}</h4></h4>
                                            <h4 className='text-muted'>Year: <h4 className='d-inline text-white'>{s.studentYear}</h4> </h4>
                                            <h4 className='text-muted'>Birth Date: <h4 className='d-inline text-white'>{s.birthDate}</h4> </h4>
                                            <h4 className='text-muted'>Contact Mail: <h4 className='d-inline text-white'>{s.contactMail}</h4> </h4>
                                            <h4 className='text-muted'>Phone Number: <h4 className='d-inline text-white'>{s.phoneNumber}</h4> </h4>
                                            <h4 className='text-muted'>Status: <h4 className='d-inline text-white'>{s.status} </h4></h4>
                                        </div>
                                        <hr className='m-0'/>
                                        <div className='text-center'>
                                            <button type="button" className="btn btn-success w-25 m-1 font-weight-bold" data-toggle="modal" data-target="#studentInfoModal" onClick={this.edit.bind(this, s.studentId, s.studentName, s.studentYear, s.contactMail, s.phoneNumber,
                                            s.description, s.specialtyExpertise, s.status, s.birthDate, s.major, s.studyingCourse)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-1" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>EDIT
                                            </button>
                                        </div>

                                    </div>
                                    {/* Specialty and Description info */}
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body" >
                                            <h3> Description Detail</h3>
                                            <hr className='mt-0'/>
                                            <h4 className="text-muted">Experises: <h4 className='d-inline text-white'>{s.specialtyExpertise}</h4></h4>
                                            <h4 className="text-muted"> Description: <h4 className='d-inline text-white'>{s.description}</h4></h4>
                                        </div>
                                        <hr className='m-0'/>
                                        <div className='text-center'>
                                            <button type="button" className="btn btn-success w-25 m-1 font-weight-bold" data-toggle="modal" data-target="#studentDescModal" onClick={this.edit.bind(this, s.studentId, s.studentName, s.studentYear, s.contactMail, s.phoneNumber, s.description, s.specialtyExpertise, s.status, s.birthDate, s.major, s.studyingCourse)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-1" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>EDIT
                                            </button>
                                        </div>

                                    </div>
                                    {/* Major and course and others */}
                        
                                    <div className="card mx-3 mb-3" >
                                        <div className="card-body" >
                                            <h3> Major Detail</h3>
                                            <hr className='mt-0'/>
                                            <h4 className= 'text-muted'>Major Name: <h4 className='d-inline text-white'>{s.major}</h4> </h4>
                                            <h4 className= 'text-muted'>Studying Course: <h4 className='d-inline text-white'>{s.studyingCourse}</h4> </h4>
                                        </div>
                                        <hr className='m-0'/>
                                        <div className='text-center'>
                                            <button type="button" className="btn btn-success w-25 m-1 font-weight-bold" data-toggle="modal" data-target="#majorDetailModal" onClick={this.edit.bind(this, s.studentId, s.studentName, s.studentYear, s.contactMail, s.phoneNumber, s.description, s.specialtyExpertise, s.status, s.birthDate, s.major, s.studyingCourse)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill mr-1" viewBox="0 0 16 16">
                                                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                                </svg>EDIT
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="modal fade" id="studentInfoModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title text-success">Student Information</h2>
                                    </div>
                                    <div className="modal-body text-muted font-weight-bold h4">
                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                            Student Name: <input className="mt-1" type="text" id="studentName" name="studentName" className="form-control" value={this.state.studentName}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Student Year: <input className="mt-1" type="text" id="studentYear" name="studentYear" className="form-control" value={this.state.studentYear}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Birth Date: <input className="mt-1" type="date" id="birthDate" name="birthDate" className="form-control" value={this.state.birthDate}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Contact Mail: <input className="mt-1" type="text" id="contactMail" name="contactMail" className="form-control" value={this.state.contactMail}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Phone Number: <input className="mt-1" type="text" id="phoneNumber" name="phoneNumber" className="form-control" value={this.state.phoneNumber}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Status: <input className="mt-1" type="text" id="status" name="status" className="form-control" value={this.state.status}
                                                onChange={this.handleChange.bind(this)} />
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg mr-1" viewBox="0 0 16 16">
                                            <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                        </svg>Close
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                            </svg>Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="studentDescModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title text-success">Student Description</h2>
                                    </div>
                                    <div className="modal-body text-muted font-weight-bold h4">
                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                            Expertises: <input className="mt-1" type="text" id="specialtyExpertise" name="specialtyExpertise" className="form-control" value={this.state.specialtyExpertise}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Description Detail:
                                        <textarea name="description" value={this.state.description}
                                                onChange={this.handleChange.bind(this)} cols="30" rows="5" className="bg-secondary"></textarea>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                            </svg>Close
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                            </svg>Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal fade" id="majorDetailModal">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h2 className="modal-title text-success">Major Detail</h2>
                                    </div>
                                    <div className="modal-body text-muted font-weight-bold h4">
                                        <div className="card mb-4 pl-4 pr-4 pt-2 pm-5 pb-3" >
                                            Major Name: <input className="mt-1" type="text" id="major" name="major" className="form-control" value={this.state.major}
                                                onChange={this.handleChange.bind(this)} />
                                            <br />
                                        Studying Course:
                                        <textarea name="studyingCourse" value={this.state.studyingCourse}
                                                onChange={this.handleChange.bind(this)} cols="30" rows="5" className="bg-secondary"></textarea>
                                        </div>

                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                                            </svg>Close
                                        </button>
                                        <button type="button" className="btn btn-success" onClick={this.save.bind(this)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg mr-1" viewBox="0 0 16 16">
                                                <path d="M13.485 1.431a1.473 1.473 0 0 1 2.104 2.062l-7.84 9.801a1.473 1.473 0 0 1-2.12.04L.431 8.138a1.473 1.473 0 0 1 2.084-2.083l4.111 4.112 6.82-8.69a.486.486 0 0 1 .04-.045z"/>
                                            </svg>Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}