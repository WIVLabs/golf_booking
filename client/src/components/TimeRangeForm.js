import * as React from "react";
import IonSlider from "../plugin/IonSlider";

const timeRangeData = "04:00,05:00,06:00,07:00,08:00,09:00,10:00,11:00,12:00,13:00,14:00,15:00," +
    "16:00,17:00,18:00,19:00,20:00,21:00,22:00,23:00";

class TimeRangeForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>시간대</label>
                <IonSlider type="text" data-min="5"
                           data-max="8" data-from="0" data-to="10"
                           data-type="double" data-step="1"
                           data-prettify="false" data-hasgrid="true"
                           data-values={timeRangeData}
                           onChange={(ob) => this.props.searchParams.time_range = {
                               from: ob.from_value,
                               to: ob.to_value
                           }}/>
            </div>
        );
    }
}

export default TimeRangeForm;

