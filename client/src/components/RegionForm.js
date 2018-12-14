import * as React from "react";
import Api from "./Api";

class RegionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {regions: [], region: this.props.region};
    }

    componentDidMount() {
        Api.getAllRegions()
            .then(data => {
                this.setState({regions: data});
            });
    }

    render() {
        return (
            <div className="form-group">
                <label>지역</label>
                {this.state.regions ?
                    <select className="form-control" value={this.state.region}
                            onChange={(ob) => {
                                this.setState({region: ob.target.value});
                                this.props.onChange(ob.target.value);
                            }}>
                        {this.state.regions.map((_region, i) => {
                            return (<option key={i} value={_region.id}>{_region.name}</option>);
                        })}
                    </select>
                    : <span>Loading...</span>
                }
            </div>
        );
    }
}

export default RegionForm;