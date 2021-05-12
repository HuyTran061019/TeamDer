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

                var list = json.filter(s => typeof s.postId !== 'undefined' && s.postId !== "")
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
                            <input className="form-control form-control-lg" type="text" name='keyword' placeholder="Enter project ID or Name" onChange={this.handleChange.bind(this)} />
                        </div>
                        <div className="col-md-8 card border-success mb-3 px-0">
                            {/* Select to see Student List or Project List */}
                            <h2 className="card-header">Project List </h2>
                            <div>
                                {this.state.posts.filter(s => s.postId.toLowerCase().includes(this.state.keyword.toLowerCase()) || s.postName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                    <div key={filteredS.postId}>
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Post ID</th>
                                                    <th>Owner ID</th>
                                                    <th>Post Name</th>
                                                    <th>Post Status</th>
                                                    <th>Available Slots</th>
                                                    <th>Course Name</th>
                                                    <th>Looking For</th>
                                                    <th>Detail</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className='table-active'>
                                                    <td>{filteredS.postId}</td>
                                                    <td>{filteredS.ownerId}</td>
                                                    <td>{filteredS.postName}</td>
                                                    <td>{filteredS.postStatus}</td>
                                                    <td>{filteredS.postAvailableSlot}</td>
                                                    <td>{filteredS.courseName}</td>
                                                    <td>{filteredS.lookingFor}</td>
                                                    <td>
                                                        <Link to={`/ProjectDetail/${filteredS.postId}`}>
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