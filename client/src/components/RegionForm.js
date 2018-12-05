import * as React from "react";

class RegionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {regions: [], region: this.props.region};
    }

    componentDidMount() {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/regions';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                // console.log(data);
                this.setState({regions: data.data});
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