import * as React from "react";
import IonSlider from "../plugin/IonSlider";

class TimeRangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.timerange.from,
            to: this.props.timerange.to,
        }
    }

    render() {
        return (
            <div className="form-group row">
                <label className="col-form-label search-title">
                    {this.props.hastitle === "true" ?
                        <span><i className="fa fa-clock"></i> 시간대</span> :
                        <i className="fa fa-clock fa-2x"></i>
                    }
                </label>
                <div className="col-sm-10">
                    <IonSlider {...this.props} options={{
                        type: 'double',
                        min: '4',
                        max: '23',
                        from: this.state.from,
                        to: this.state.to,
                        postfix: '시',
                        skin: 'round',
                        onChange: (range) => this.props.onChange({from: range.from, to: range.to})
                    }}/>
                </div>
            </div>
        );
    }
}

export default TimeRangeForm;

