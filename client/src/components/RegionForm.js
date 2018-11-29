import * as React from "react";

class RegionForm extends React.Component {
    render() {
        return (
            <div className="form-group">
                <label>지역</label>
                <select className="form-control" onChange={this.props.changeRegion}>
                    <option value="경기">경기</option>
                    <option value="제주">제주</option>
                    <option value="강원도">강원도</option>
                    <option value="충청도">충청도</option>
                    <option value="우도">우도</option>
                </select>
            </div>
        );
    }
}

export default RegionForm;