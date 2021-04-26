import React from 'react'
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom'

const url = ''
export default class ProjectList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            //Basic Info
            postId: '',
            postName:"",
            postStatus:'',
            postType:'',
            postAvailabeSlot:'',
            //StudentList
            s1Id: '',
            s1Name: '',

            s2Id: '',
            s2Name: '',

            s3Id: '',
            s3Name: '',
            //Extra Info
            courseId: '',
            courseName: '',
            semester: '',
            asgName: '',
            asgDescription: '',
            asgPercentage: '',
            techUsed: '',
            scope: '',
            description: '',
            lookingFor:  '',
            application: ''

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
                        <div class="container mt-n3">
                <div class="row">
                    <div class="col-md-4" style={{ backgroundColor: 'lightgrey' }} >

                        <h1>This is a column</h1>

                    </div>
                    <div class="col-md-8">
                       {/* Select to see Student List or Project List */}
                        <h2>Student List </h2>
                        <div>
                            {this.state.posts.map(s =>
                                <div class="list">
                                    <table class="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Post ID</th>
                                                <th>Post Name</th>
                                                <th>Post Status</th>
                                                <th>Available Slots</th>
                                                <th>Course Id</th>
                                                <th>Looking For</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>

                                                <td>{s.postId}</td>
                                                <td>{s.postName}</td>
                                                <td>{s.postStatus}</td>
                                                <td>{s.postAvailabeSlot}</td>
                                                <td>{s.courseId}</td>
                                                <td>{s.lookingFor}</td>


                                                <Link to={`/ProjectDetail/${s.postId}`}>
                                                    <a href="#" class="btn btn-primary mt-2 mr-2 ml-2">Detail</a>
                                                </Link>

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