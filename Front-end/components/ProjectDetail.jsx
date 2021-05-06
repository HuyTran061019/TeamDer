import React from 'react'
import { Redirect, Link } from 'react-router-dom'

const url = 'http://localhost:9000/posts'
export default class ProjectDetail extends React.Component {
    //Constructor for the selected student
    constructor(props) {
        super(props)
        this.state = {
            Setid: this.props.match.params.postId,
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

        }

    }
    //fetch data of the chosen student 
    fetchData() {


        fetch(url + "/" + this.state.Setid)
            .then(res => res.json())
            .then(json => this.setState({ posts: json }))
    }
    //render
    componentDidMount() {
        this.fetchData()
    }
    render() {
        return (
            <div class="container mb-3">
                <div>
                    {this.state.posts.map(s =>
                        <div>
                            <h1 class="font-weight-bold" style={{ color: "red" }}> Post Detail: </h1>
                            <br />
                            {/* Project info */}
                            <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Post Info:   </h2>
                            <div class="card mb-2" >
                                <div class="card-body border border black" >

                                    <h4 class="font-weight-bold">Post name : {s.postName}</h4>
                                    <h4>Post id :{s.postId}</h4>
                                    <h5>Posted by: {s.ownerId} </h5>
                                    <Link to={`/StudentDetail/${s.ownerId}`}>
                                    <h5>Post Owner Detail </h5>
                                                </Link>
                                    <h5>Available Slot: {s.postAvailableSlot} </h5>

                                </div>
                            </div>
                            {/* List out student in Project */}
                            <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Student in project list:</h2>
                            <table class="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Student Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>

                                        <td>{s.s1Id}</td>
                                        <td>{s.s1Name}</td>

                                    </tr>
                                    <tr>

                                        <td>{s.s2Id}</td>
                                        <td>{s.s2Name}</td>

                                    </tr>
                                    <tr>

                                        <td>{s.s3Id}</td>
                                        <td>{s.s3Name}</td>

                                    </tr>

                                </tbody>
                            </table>
                            {/* Description info */}
                            <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Assignment Detail:</h2>
                            <div class="card mb-2" >
                                <div class="card-body border border black" >
                                    <h4 class="font-weight-bold">Course Name : {s.courseName}</h4>
                                    <h5 class="font-weight-bold">Semester  : {s.semester}</h5>
                                    
                                </div>
                            </div>
                            {/* Project Ideas */}
                            <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Project Idea:</h2>
                            <div class="card mb-2" >
                                <div class="card-body border border black" >
                                    <h5 class> Scope : {s.scope}</h5>
                                    <h6 class> Scope : {s.description}</h6>

                                </div>
                            </div>
                            {/* Criteria for teammate */}
                            <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Looking For :</h2>
                            <div class="card mb-2" >
                                <div class="card-body border border black" >
                                    <h6>Criteria :{s.lookingFor}</h6>

                                </div>
                            </div>

                        </div>


                    )}
                </div>
            </div>



        )
    }
}