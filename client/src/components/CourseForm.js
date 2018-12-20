import * as React from "react";
import Select2 from 'react-select2-wrapper';
import 'react-select2-wrapper/css/select2.css';
import Api from "./Api";

class CourseForm extends React.Component {
    constructor(props) {
        console.log('코스 constructor')
        super(props);
        this.changeCourse = this.changeCourse.bind(this);
        this.state = {courses: []};
    }

    componentDidMount() {
        console.log('코스 렌더링 componentDidMount')
        Api.getGolfCourses(this.props.region)
            .then(data => {
                this.setState({courses: data});
            });
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps', nextProps)
        if (nextProps.region) {
            this.setState({courses: []});
            Api.getGolfCourses(nextProps.region)
                .then(data => {
                    this.setState({courses: data});
                });
        }
    }

    changeCourse(ob) {
        this.props.onChange(ob.target.value);
    }

    render() {
        const courses = this.state.courses.map(_course => {
            sessionStorage.setItem('course_'+_course.id, _course.name);
            return {'text': _course.name, 'id': _course.id}
        });
        return (
            <div className="form-group row">
                {this.props.hastitle === "true" ?
                    <label className="search-title col-form-label">
                        <i className="fa fa-golf-ball"></i> 골프장
                    </label> : ''
                }
                <div className="col">
                    <Select2
                        data={courses}
                        onChange={this.changeCourse}
                        options={{
                            placeholder: '골프장 전체',
                            width: '100%',
                            allowClear: true
                        }}
                        defaultValue={this.props.course}
                    />
                </div>
            </div>
        );
    }
}

export default CourseForm;