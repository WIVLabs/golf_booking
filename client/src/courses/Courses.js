import React from "react";

class Courses extends React.Component {

    constructor({match}) {
        super();
        this.clickPrevious = this.clickPrevious.bind(this);
    }

    clickPrevious() {
        this.props.history.goBack();
        return false;
    }

    render() {
        let params = new URLSearchParams(window.location.search);

        let name = params.get('name');

        return (
            <div>
                - QueryString으로 받은 파라미터.<br />
                Name : {name}

                <form>
                    <div className="form-group">
                        <a href='javascript:;' className="form-control bg-primary" onClick={this.clickPrevious}>이전화면으로가기</a>
                    </div>
                </form>
            </div>
    )};
}


export default Courses;