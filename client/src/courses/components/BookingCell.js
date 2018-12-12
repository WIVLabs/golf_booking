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
        console.log(kickoffsByHour);
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
                    spanClassName += ' booking-cell-time-first';
                }
                else {
                    spanClassName += ' booking-cell-time-next';
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
                            <a href={firstSite.booking_url} target='_blank'>{firstSite.name}</a>
                            &nbsp;{sites.length}팀, {StringUtility.withComma(firstSite.price)}원, {notes.join(', ')}
                        </span>
                    );
                }
                html.push(<br key={`br-${++idx}`} />);
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
