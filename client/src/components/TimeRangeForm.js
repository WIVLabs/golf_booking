import * as React from "react";
import IonSlider from "../plugin/IonSlider";

class TimeRangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from : this.props.timerange.from,
            to : this.props.timerange.to,
        }
    }

    render() {
        return (
            <div className="form-group">
                <label>시간대</label>
                <IonSlider {...this.props} options={{
                    type: 'double',
                    min: '4',
                    max: '23',
                    from: this.state.from,
                    to: this.state.to,
                    postfix: '시',
                    onChange: (ob) => this.props.timerange = {
                        from: ob.from_value,
                        to: ob.to_value
                    }
                }}/>
            </div>
        );
    }
}

export default TimeRangeForm;

