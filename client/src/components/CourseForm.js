import * as React from "react";

class CourseForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>골프장</label>
                <select className="form-control" onChange={(ob) => this.props.searchParams.course = ob.target.value}>
                    <option value="A골프장">A골프장</option>
                    <option value="B골프장">B골프장</option>
                    <option value="C골프장">C골프장</option>
                    <option value="D골프장">D골프장</option>
                </select>
            </div>
        );
    }
}

export default CourseForm;