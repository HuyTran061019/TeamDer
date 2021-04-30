import React from 'react'

const url = 'http://localhost:9000/students'
export default class Register extends React.Component {


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

            password: '',

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

    handleChange(e) {
        var obj = {}
        obj[e.target.name] = e.target.value
        this.setState(obj)
    }

    save() {
        if ((this.state.studentId !== "") &&( this.state.studentName !== "") &&(this.state.password !== "")) {
            fetch(url, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ studentId: this.state.studentId, studentName: this.state.studentName, password: this.state.password })
            }).then(res => res.json())
                .then(json => this.fetchData())
            this.setState({ message: "Succesful Registered " })

        } else {
            this.setState({ message: "Invalid Input " })
        }


    }
    render() {
        return (
            <div class=" container mb-sm-5">
                <h1>This is register page </h1>
                <div class="row">
                    <div class="col-md-3"></div>
                    <div class="col-md-6">

                        <div class="card">
                            <br />

                            {/* Admin login form */}
                            <h2 class=" pl-4">Register Form</h2>
                            <form class=" mb-4 pl-4  pt-2 pm-2">

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Id:
                                    <input type="text" name="studentId" className="form-control" placeholder="Id" value={this.state.studentId} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>

                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Name:
                                    <input type="text" name="studentName" className="form-control" placeholder="Name" value={this.state.studentName} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10">
                                        Password:
                                    <input type="text" name="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)}
                                        />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-10" >
                                        <button type="button" className="btn btn-primary" class=" btn btn-success mb-2  " onClick={this.save.bind(this)} data-toggle="modal" data-target="#myModal" >Register</button>
                                        <div id="myModal" class="modal fade" role="dialog">
                                            <div class="modal-dialog">

                                                {/* Modeal content */}
                                                <div class="modal-content">
                                                    <div class="modal-body">
                                                        <p style={{ color: "blue" }}>{this.state.message}</p>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>

                        </div>
                    </div>
                    <div class="col-md-3"></div>
                </div>

            </div>


        )
    }
}