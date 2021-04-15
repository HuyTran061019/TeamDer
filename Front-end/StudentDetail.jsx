import React from 'react'

const url = 'http://localhost:9000/students'
export default class StudentDetail extends React.Component{
    //Constructor for the selected student
    constructor(props) {
        super(props)
        this.state = {
            Setid: this.props.match.params.studentId,
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

        }

    }
    //fetch data of the chosen student 
    fetchData() {


        fetch(url + "/" + this.state.Setid)
            .then(res => res.json())
            .then(json => this.setState({ students: json }))
    }
    //render
    componentDidMount() {
        this.fetchData()
    }

    render(){
        return(
            <div class="container mb-3">
            <div>
                {this.state.students.map(s =>
                    <div>
                        <h1 class="font-weight-bold" style={{ color: "red" }}> Student Detail: </h1>
                        <br />
                        {/* Course info */}
                        <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Student Info:   </h2>
                        <div class="card mb-2" >
                            <div class="card-body border border black" >

                                <h4 class="font-weight-bold">Student name : {s.studentName}</h4>
                                <h4>Student id :{s.studentId}</h4>
                                <h5>Year: {s.studentYear} </h5>
                                <h5>Birth Date: {s.birthDate} </h5>
                                <h5>Status: {s.status} </h5>

                            </div>
                        </div>
                        {/* Specialty and Description info */}
                        <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Description Detail:</h2>
                        <div class="card mb-2" >
                            <div class="card-body border border black" >
                                <h4 class="font-weight-bold">Experises : {s.specialtyExpertise}</h4>
                                <br />

                                <h6 class="mb-2">Description detail: {s.description}</h6>
                            </div>
                        </div>
                        {/* Major and course and others */}
                        <h2 style={{ color: "midnightblue" }} class="font-weight-bold"> Major Detail:</h2>
                        <div class="card mb-2" >
                            <div class="card-body border border black" >

                                <h6>Major Name :{s.major}</h6>
                                <br />
                                <h6 class>Studying Course : {s.studyingCourse}</h6>
                            </div>
                        </div>

                    </div>


                )}
            </div>
        </div>


            
        )
    }
}