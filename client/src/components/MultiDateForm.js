import React from 'react';
import Calendar from "react-calendar-multiday";

class MultiDateForm extends React.Component {
    render() {
        return (<div className="form-group">
            <label>일자</label>
            <a className="btn btn-light text-primary ml-2" role="button" data-toggle="collapse" href="#date-calendar">
                <i className="fa fa-calendar-check"></i></a>
            <div id="date-calendar" className="collapse">
                <Calendar isMultiple={true} onChange={this.props.changeCalendar}/>
            </div>
        </div>)
    }
}

export default MultiDateForm;