import * as React from "react";
import IonSlider from "../plugin/IonSlider";

class GreenFeeRangeForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: this.props.greenfeerange.from,
            to: this.props.greenfeerange.to
        }
    }

    render() {
        return (
            <div className="form-group">
                <label>그린피</label>
                <IonSlider options={{
                    type: 'double',
                    min: '10000',
                    max: '400000',
                    from: this.state.from,
                    to: this.state.to,
                    step: '10000',
                    postfix: '원',
                    prettifySeparator: ',',
                    skin: 'round',
                    grid: 'true',
                    onChange: (ob) => this.props.onChange({from: ob.from, to: ob.to})
                }}
                />
            </div>
        );
    }

}

export default GreenFeeRangeForm;