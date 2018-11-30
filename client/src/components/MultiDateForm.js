import React from 'react';
import AirDatePicker from "../plugin/AirDatePicker";

class MultiDateForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>일자</label>
                {/*<AirDatePicker onSelect={this.test}/>*/}
                <AirDatePicker
                    onSelect={(dp, ani) => ani ? this.props.searchParams.booking_dates = dp.selectedDates : null}/>
            </div>
        )
    }
}

export default MultiDateForm;