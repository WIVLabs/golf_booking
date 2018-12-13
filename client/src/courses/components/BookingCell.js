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
        this.state.kickoff.sites.map(site => {
            let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
            site['hour'] = hour;
        });

        const kickoffsByHour = CollectionUtility.groupBy(this.state.kickoff.sites, site => site.hour);
        let html = [];
        let idx = 0;
        kickoffsByHour.forEach((kickoff, hour) => {
            // mock 객체
            let mockSite = new Object();
            Object.assign(mockSite, kickoff[0]);
            mockSite.id = 2;
            mockSite.name = 'TES골프';
            kickoff.push(mockSite);
            // mock 객체 여기까지.


            html.push(<span key={`hour-${++idx}`} className='booking-cell-time-hour'>{hour}시 </span>);
            const kickoffBySiteMap = CollectionUtility.groupBy(kickoff, site => site.id);
            let first = true;
            kickoffBySiteMap.forEach(sites => {
                let spanClassName = 'booking-cell-time';
                if (first == true) {
                    first =  false;
                }
                else {
                    html.push(<span key={`site-${++idx}`} className='booking-cell-time-hour'></span>);
                }
                let notes = [];
                sites.forEach(site => {
                    if (notes.includes(site.notes)) return;

                    notes.push(site.notes);
                });

                if (sites.length > 0) {
                    const firstSite = sites[0];
                    html.push(
                        <span key={`site-${++idx}`} className={spanClassName} >
                            <a href={firstSite.booking_url} target='_blank' className='booking-cell-time-site-name'>{firstSite.name}</a>
                            <span className='booking-cell-time-enable-count'>{sites.length}팀</span><span className='booking-cell-time-fee'>{StringUtility.withComma(firstSite.price)}원</span> <span className='booking-cell-time-notes'>{notes.join(', ')}</span>
                        </span>
                    );
                }
                html.push(<br key={`br-${++idx}`} />);
                let ul = React.createElement('ul', {}, '');
            });
            html.push(<hr className='booking-cell-time-line' key={`br-${++idx}`} />);
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
