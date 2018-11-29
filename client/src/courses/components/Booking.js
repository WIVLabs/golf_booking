import * as React from "react";

class Booking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booking : props.booking
        }

        console.log(this.state);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.profileOrError !== null && this.state.profileOrError === null) {
          // At this point, we're in the "commit" phase, so it's safe to load the new data.
          //this._loadUserData();
            console.log(prevProps);
            console.log(prevState);
        }

        console.log('disUpdate');
    }

    render() {
        return (
            <tr>
                <td>88</td>
                <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
                <td>08:07<a href="http://golf.sbs.co.kr"><img src="http://golf.sbs.co.kr/favicon.ico" /></a> 08:14<img src="http://golf.sbs.co.kr/favicon.ico" /></td>
            </tr>
        );
    }
}

export default Booking;