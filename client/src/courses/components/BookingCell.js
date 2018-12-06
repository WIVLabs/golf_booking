import React from "react";
import {DateUtility} from "../../components/Utility";

class BookingCell extends React.Component {

    constructor({kickoff}) {
        super();

        // let sitesPerHours = {
        //     getSitesByHour : (hour) => {
        //
        //     },
        //     addSite : (site) => {
        //
        //     }
        // };
        //
        // kickoff.sites.map((site, idx) => {
        //     let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
        //     let sitesPerHour = sitesPerHours.get(hour);
        //     sitesPerHour.addSite(site);
        // });
        //
        // console.log(sites);

        this.state = {
            kickoff : kickoff
        }
    }

    render() {
        return (
            <td className={'booking-cell'}>
            {this.state.kickoff.sites ?
                this.state.kickoff.sites.map((site, idx) => {
                    return (
                        <span key={`site-${idx}`} style={{paddingRight: 1 + 'px'}} >
                            <span className='booking-cell-time badge badge-warning'>
                                {DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH:mm')}
                                &nbsp;<a href='http://golf.sbs.co.kr' target='_blank'><img src={site.icon_url} /></a></span>
                            {/*<a href="http://golf.sbs.co.kr" className="badge badge-info">SBS</a>*/}
                        </span> );
                })
                : ''
            }
            </td>
        )
    }
}

export default BookingCell;
