import * as React from "react";

class RegionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {regions: []};
    }

    componentDidMount() {
        const url = 'https://14nc6umut2.execute-api.ap-northeast-2.amazonaws.com/v1/regions';

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({regions: data.data});
            });
    }

    render() {
        return (
            <div className="form-group">
                <label>지역</label>
                {this.state.regions ?
                    <select className="form-control"
                            onChange={(ob) => this.props.searchParams.region = ob.target.value}>
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