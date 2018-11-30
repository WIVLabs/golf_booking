import React from "react";
import {DateUtility} from "../../components/Utility";

class BookingCell extends React.Component {

    constructor(prop) {
        super(prop);

        this.state = {
            kickoff : prop.kickoff
        }
    }

    render() {
        return (
            <td>
            {this.state.kickoff.sites ?
                this.state.kickoff.sites.map((site, idx) => {
                    return (<div key={`site-${idx}`}>{DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH:mm')} <a href='http://golf.sbs.co.kr' target='_blank'><img src={site.icon_url} /></a></div> );
                })
                : '-'
            }
            </td>
        )
    }
}

export default BookingCell;
