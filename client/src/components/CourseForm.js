import * as React from "react";
import {Api} from "./Api";

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: [], course: this.props.course};
    }

    componentDidMount() {

        Api.getGolfCourses()
            .then(data => {
                // console.log(data);
                this.setState({courses: data});
            });
    }

    render() {
        return (
            <div className="form-group">
                <label>골프장</label>
                <select className="form-control" value={this.state.course} onChange={(ob) => {
                    this.setState({course: ob.target.value});
                    this.props.onChange(ob.target.value);
                }}>
                    <option value="">전체</option>
                    {this.state.courses.map((_course, i) => {
                        return (<option key={i} value={_course.id}>{_course.name}</option>);
                    })}
                </select>
            </div>
        );
    }
}

export default CourseForm;