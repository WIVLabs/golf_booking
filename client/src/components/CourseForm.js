import * as React from "react";

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {courses: [], course: this.props.course};
    }

    componentDidMount() {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/golf-courses';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({courses: data.data});
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