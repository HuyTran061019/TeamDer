import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/students'
export default class StudentList extends React.Component {

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
            birthDate: '',
            major: '',
            studyingCourse: '',


            //Keyword
            keyword: ''

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

    //handle type changes
    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }


    render() {
        return (
            <div>
                <Navbar />
                <div className="container ">
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <h3>Search For Student:</h3>
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Enter Name or ID" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="col-md-8 card border-success mb-3 px-0">
                            {/* Select to see Student List or Project List */}
                            <h2 className="card-header">Student List </h2>
                            <div>
                                {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                    <div className='table-responsive' key={filteredS.studentId}>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th className="align-middle text-center">Student ID</th>
                                                    <th className="align-middle text-center">Student Name</th>
                                                    <th className="align-middle text-center">Student Year</th>
                                                    <th className="align-middle text-center">Major</th>
                                                    <th className="align-middle text-center">Expertise</th>
                                                    <th className="align-middle text-center">Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='table-active'>
                                                    <td className="align-middle text-center">{filteredS.studentId}</td>
                                                    <td className="align-middle text-center">{filteredS.studentName}</td>
                                                    <td className="align-middle text-center">{filteredS.studentYear}</td>
                                                    <td className="align-middle text-center">{filteredS.major}</td>
                                                    <td className="align-middle text-center">{filteredS.specialtyExpertise}</td>
                                                    <td className="align-middle text-center">
                                                        <Link to={`/StudentDetail/${filteredS.studentId}`}>
                                                            <button type="button" className="btn btn-success">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-lg" viewBox="0 0 16 16">
                                                                    <path d="m10.277 5.433-4.031.505-.145.67.794.145c.516.123.619.309.505.824L6.101 13.68c-.34 1.578.186 2.32 1.423 2.32.959 0 2.072-.443 2.577-1.052l.155-.732c-.35.31-.866.434-1.206.434-.485 0-.66-.34-.536-.939l1.763-8.278zm.122-3.673a1.76 1.76 0 1 1-3.52 0 1.76 1.76 0 0 1 3.52 0z"/>
                                                                </svg>
                                                            </button>
                                                        </Link>
                                                    </td>

                                                </tr>
                                            </tbody>
                                        </table>
                                        <br />
                                    </div>
                                )}
                                <br />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}