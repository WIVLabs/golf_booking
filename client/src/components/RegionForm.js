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
        let _options = [(<option key='00' value="">지역 전체</option>)];
        this.state.regions.map((_region, i) => {
            _options.push(<option key={i} value={_region.id}>{_region.name}</option>)
        });

        return (
            <div className="form-group row">
                <label className="search-title col-form-label">
                    {this.props.hastitle === "true" ?
                        <span><i className="fa fa-map-marked-alt"></i> 지역</span> :
                        <i className="fa fa-map-marked-alt fa-2x"></i>
                    }
                </label>
                <div className="col">
                    {this.state.regions ?
                        <select className="form-control" value={this.state.region}
                                onChange={(ob) => {
                                    this.setState({region: ob.target.value});
                                    console.log(ob.target.selectedOptions[0].innerText);
                                    this.props.onChange(ob.target.value);
                                }}>
                            {_options}
                        </select>
                        : <span>Loading...</span>
                    }
                </div>
            </div>
        );
    }
}

export default RegionForm;

