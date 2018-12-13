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
        kickoffsByHour.forEach((_kickoffs, hour) => {
            // mock 객체
            let mockSite = new Object();
            Object.assign(mockSite, _kickoffs[0]);
            mockSite.id = 2;
            mockSite.name = 'TEST골프';
            _kickoffs.push(mockSite);
            // mock 객체 여기까지.


            html.push(<span key={`hour-${++idx}`} className='booking-cell-time-hour'>{hour}</span>);
            const kickoffBySiteMap = CollectionUtility.groupBy(_kickoffs, _site => _site.id);
            let first = true;
            kickoffBySiteMap.forEach(_sites => {
                let spanClassName = 'booking-cell-time';
                if (first == true) {
                    first =  false;
                }
                else {
                    html.push(<span key={`site-${++idx}`} className='booking-cell-time-hour'></span>);
                }
                let notes = [];
                _sites.forEach(_site => {
                    if (notes.includes(_site.notes)) return;

                    notes.push(_site.notes);
                });

                if (_sites.length > 0) {
                    const firstSite = _sites[0];
                    html.push(
                        <span key={`site-${++idx}`} className={spanClassName} >
                            <a href={firstSite.booking_url} target='_blank' className='booking-cell-time-site-name'>{firstSite.name}</a>
                            <span className='booking-cell-time-enable-count'>{_sites.length}<span className="text-muted">팀</span></span>
                            <span className='booking-cell-time-fee'>
                                {StringUtility.withComma(firstSite.price)}<span className="text-muted">원</span></span>
                            <span className='booking-cell-time-notes'>{notes.join(', ')}</span>
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
