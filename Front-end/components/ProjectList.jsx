import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'
import Navbar from './Navbar.jsx'
const url = 'http://localhost:9000/posts'

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {

            posts: [],
            //Basic Info
            postId: '',
            ownerId: '',
            postName: '',
            postStatus: '',
            postAvailableSlot: '',
            //StudentList
            s1Id: '',
            s1Name: '',

            s2Id: '',
            s2Name: '',

            s3Id: '',
            s3Name: '',
            //Extra Info
            courseName: '',
            semester: '',
            //Other
            scope: '',
            description: '',
            lookingFor: '',
            //keyword
            keyword: ''

        }

    }

    //Read all posts from list
    fetchData() {
        fetch(url).then(res => res.json())
            .then(json => {

                var list = json.filter(s => typeof s._id !== 'undefined' && s._id !== "")
                this.setState({ posts: list })
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
                            <h3>Search For Project</h3>
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Project Name or Project Owner ID" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="col-md-8 card border-success mb-3 px-0">
                            {/* Select to see Student List or Project List */}
                            <h2 className="card-header">Project List </h2>
                            <div>
                            {this.state.posts.filter(s => s.ownerId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.postName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                    <div key={filteredS._id}>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th className="align-middle text-center">Owner ID</th>
                                                    <th className="align-middle text-center">Post Name</th>
                                                    <th className="align-middle text-center">Post Status</th>
                                                    <th className="align-middle text-center">Available Slots</th>
                                                    <th className="align-middle text-center">Course Name</th>
                                                    <th className="align-middle text-center">Looking For</th>
                                                    <th className="align-middle text-center">Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='table-active'>
                                                    <td className="align-middle text-center">{filteredS.ownerId}</td>
                                                    <td className="align-middle text-center">{filteredS.postName}</td>
                                                    <td className="align-middle text-center">{filteredS.postStatus}</td>
                                                    <td className="align-middle text-center">{filteredS.postAvailableSlot}</td>
                                                    <td className="align-middle text-center">{filteredS.courseName}</td>
                                                    <td className="align-middle text-center">{filteredS.lookingFor}</td>
                                                    <td className="align-middle text-center">
                                                        <Link to={`/ProjectDetail/${filteredS._id}`}>
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