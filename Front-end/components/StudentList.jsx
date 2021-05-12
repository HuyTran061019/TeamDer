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
            status: '',
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
                        <div className="col-md-4">
                            <h3>Search For Student:</h3>
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Enter Name or ID" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="col-md-8 card border-success mb-3 px-0">
                            {/* Select to see Student List or Project List */}
                            <h2 className="card-header">Student List </h2>
                            <div>
                                {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                    <div key={filteredS.studentId}>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Student ID</th>
                                                    <th>Student Name</th>
                                                    <th>Student Year</th>
                                                    <th>Status</th>
                                                    <th>Major</th>
                                                    <th>Expertise</th>
                                                    <th>Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='table-active'>
                                                    <td>{filteredS.studentId}</td>
                                                    <td>{filteredS.studentName}</td>
                                                    <td>{filteredS.studentYear}</td>
                                                    <td>{filteredS.status}</td>
                                                    <td>{filteredS.major}</td>
                                                    <td>{filteredS.specialtyExpertise}</td>
                                                    <td>
                                                        <Link to={`/StudentDetail/${filteredS.studentId}`}>
                                                            <button type="button" className="btn btn-success">Detail</button>
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