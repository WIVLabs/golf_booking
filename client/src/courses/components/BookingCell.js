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

        // console.log(kickoff);
        this.state = {
            kickoff : kickoff
        }
    }

    render() {
        let spans = [];
        let idx = 0;
        this.state.kickoff.forEach(_d => {
            _d.forEach(site => {
                spans.push((<span  key={`site-${++idx}`} style={{paddingRight: 1 + 'px'}} >
                     <span className='booking-cell-time badge badge-warning'>
                         {DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH:mm')}
                         <a href={site.booking_url} className="badge badge-primary" target='_blank'>{site.name}</a>
                     </span>
                 </span>));
            });
        });


        return (
            <td className={'booking-cell'}>
            {
                spans
            }
            </td>
        )
    }
};


export default BookingCell;
