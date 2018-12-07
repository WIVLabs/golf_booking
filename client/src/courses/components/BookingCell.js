import React from "react";
import {DateUtility, CollectionUtility} from "../../components/Utility";

class BookingCell extends React.Component {

    constructor(props) {
        super(props);

        // 시간생성
        this.props.kickoff.sites.map((site, idx) => {
            let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
            site['hour'] = hour;
        });

        const kickoff = CollectionUtility.groupBy(this.props.kickoff.sites, site => site.hour);

        this.state = {
            kickoff : kickoff
        }
    }

    render() {
        return (
            <td className={'booking-cell'}>
            {!this.state.kickoff.values().next().done ?
                this.state.kickoff.values().next().value.map((site, idx) => {
                    return (
                        <span key={`site-${idx}`} style={{paddingRight: 1 + 'px'}} >
                            <span className='booking-cell-time badge badge-warning'>
                                {DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH:mm')}
                                <a href={site.booking_url} className="badge badge-primary" target='_blank'>{site.name}</a>
                            </span>
                        </span> );
                })
                : ''
            }
            </td>
        )
    }
};


export default BookingCell;
