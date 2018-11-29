import React from 'react';
import AirDatePicker from "../plugin/AirDatePicker";

class MultiDateForm extends React.Component {
    constructor(props) {
        super(props);
        // this.state.defaultSelectedDays = [];
    }

    componentDidMount() {
        //console.log(this.state.defaultSelectedDays);
    }

    render() {
        return (<div className="form-group">
            <label>일자</label>
            <AirDatePicker onSelect={(dp, ani) => ani ? this.props.changeCalendar(dp) : null}/>
        </div>)
    }
}

export default MultiDateForm;