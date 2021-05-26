import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx';


const url = 'http://localhost:9000/students'
export default class AdminPage extends React.Component {

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

    delete(studentId) {
        if (confirm('Do you want to delete?')) {
            fetch(url + "/" + studentId, {
                method: 'delete',
            }).then(res => res.json())
                .then(json => this.fetchData())
        }

    }
    render() {
        return (
            <div>
                  <Navbar/>
       
            <div class="container ">
                <div className="row">
                    <div className="col-md-4" >
                        <h2 >Welcome Administrator!</h2>
                        <h3>Search For Student</h3>
                        <input className='form-control form-control-lg' type="text" name='keyword' placeholder="ID, Name, etc." onChange={this.handleChange.bind(this)} />
                        <div style={{ height: '1000px' }}></div>
                    </div>
                    <div className="col-md-8 card border-success mb-3 px-0">
                        {/* Select to see Student List or Project List */}
                        <h2 className="card-header">Student List </h2>
                        <div>
                            {this.state.students.filter(s => s.studentId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.studentName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                <div key={filteredS.studentId}>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th className="align-middle text-center">Student ID</th>
                                                <th className="align-middle text-center">Student Name</th>
                                                <th className="align-middle text-center">Student Year</th>
                                                <th className="align-middle text-center">Major</th>
                                                <th className="align-middle text-center">Expertise</th>
                                                <th className="align-middle text-center">Delete</th>
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
                                                    
                                                <button type="button" class="btn btn-danger"onClick={this.delete.bind(this, filteredS.studentId)}>Delete</button>
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