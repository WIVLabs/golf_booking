import * as React from "react";
import IonSlider from "../plugin/IonSlider";

class GreenFeeRangeForm extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>그린피</label>
                <IonSlider type="text" data-min="10000"
                           data-max="400000" data-from="10000" data-to="100000"
                           data-type="double" data-step="10000"
                           data-prettify="false" data-hasgrid="true"
                           onChange={this.props.changeGreenFeeRange}/>
            </div>
        );
    }

}

export default GreenFeeRangeForm;