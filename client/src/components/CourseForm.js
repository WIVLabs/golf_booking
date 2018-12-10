import * as React from "react";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
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
        const courses = this.state.courses.map(_course => {
            return {'text': _course.name, 'id': _course.id}
        });
        return (
            <div className="form-group">
                <label>골프장</label>
                <Select2
                    data={courses}
                    onChange={(ob) => {
                        this.props.onChange(ob.target.value);
                    }}
                    options={{
                        placeholder: '전체',
                        width: '100%'
                    }}
                    defaultValue={this.state.course}
                />
            </div>
        );
    }
}

export default CourseForm;