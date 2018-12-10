import React from "react";
import {DateUtility, CollectionUtility, StringUtility} from "../../components/Utility";

class BookingCell extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            kickoff : this.props.kickoff
        }
    }

    render() {
        // 시간생성
        this.state.kickoff.sites.map((site, idx) => {
            let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
            site['hour'] = hour;
        });

        const kickoffsByHour = CollectionUtility.groupBy(this.state.kickoff.sites, site => site.hour);

        let html = [];
        let idx = 0;
        kickoffsByHour.forEach(kickoff => {
            const kickoffBySiteMap = CollectionUtility.groupBy(kickoff, site => site.id);
            const sites = Array.from(kickoffBySiteMap.values())[0];
            if (sites.length > 0) {
                const firstSite = sites[0];
                // sites.forEach(site => {
                    html.push((<span key={`site-${++idx}`}>{firstSite.hour}시대 &nbsp;
                        <span className='booking-cell-time'>
                                 <a href={firstSite.booking_url} target='_blank'>{firstSite.name}</a>
                            &nbsp;{sites.length}건, {StringUtility.withComma(firstSite.price)}원
                             </span>
                            </span>))
                // });
            }
            html.push((<br key={`br-${++idx}`} />));
        });


        return (
            <td className={'booking-cell'}>
            {
                html
            }
            </td>
        )
    }
};


export default BookingCell;
