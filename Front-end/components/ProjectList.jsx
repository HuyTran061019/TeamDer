import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

const url = 'http://localhost:9000/posts'

export default class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        
            posts: [],
            //Basic Info
            postId: '',
            ownerId: '',
            postName:'',
            postStatus:'',
            postAvailableSlot:'',
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
            lookingFor:  '',
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
            <div className="container ">
                <div className="row">
                    <div className="col-md-4" style={{ backgroundColor: 'lightgrey' }} >
                        <h1>Search For Project</h1>
                        <div>
                            <input type="text" name='keyword' placeholder="Name, ID etc."
                            onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div style={{  height: '1000px' }}></div>
                    </div>
                    <div className="col-md-8">
                       {/* Select to see Student List or Project List */}
                        <h2>Project List </h2>
                        <div>
                            {this.state.posts.filter(s => s.postId.toLowerCase().includes(this.state.keyword.toLowerCase())||s.postName.toLowerCase().includes(this.state.keyword.toLowerCase())).map(filteredS =>
                                <div className="list">
                                    <table className="table table-bordered">
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
                                            <tr>
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
        )
    }
}