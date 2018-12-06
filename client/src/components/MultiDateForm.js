import React from 'react';
import AirDatePicker from "../plugin/AirDatePicker";

class MultiDateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDates: this.props.bookingdates.map(_d => new Date(_d))
        }

        console.log(this.state);
    }

    render() {
        return (
            <div className="form-group">
                <label>일자</label>
                <AirDatePicker bookingdates={this.state.bookingDates}
                               onSelect={(dp, ani) => ani ? this.props.onChange(dp.selectedDates) : null}/>
            </div>
        )
    }
}

export default MultiDateForm;