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
        let _options = [(<option key='00' value="">모든 지역</option>)];
        this.state.regions.map((_region, i) => {
            _options.push(<option key={i} value={_region.id}>{_region.name}</option>);
            sessionStorage.setItem('region_'+_region.id, _region.name);
        });

        return (
            <div className="form-group row">
                {this.props.hastitle === "true" ?
                    <label className="search-title col-form-label">
                        <i className="fa fa-map-marked-alt"></i> 지역
                    </label> : ''
                }
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

