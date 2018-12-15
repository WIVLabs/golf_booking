import React, {Fragment} from "react";
import {DateUtility, CollectionUtility, StringUtility} from "../../components/Utility";

class BookingCell extends React.Component {

    constructor(props) {
        super(props);

        // 시간생성
        props.kickoff.sites.map(site => {
            let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
            site['hour'] = hour;
        });

        // 시간대별로 그룹핑
        const kickoffsByHour = CollectionUtility.groupBy(props.kickoff.sites, site => site.hour);

        // site.id로 그룹핑
        kickoffsByHour.forEach((_kickoffs, key, thisMap) => {
            // TODO TEST-MOCK 객체
            let mockSite = new Object();
            Object.assign(mockSite, _kickoffs[0]);
            mockSite.id = 2;
            mockSite.name = 'TEST골프';
            _kickoffs.push(mockSite);
            // TODO TEST-MOCK 객체 여기까지.

            _kickoffs = CollectionUtility.groupBy(_kickoffs, _site => _site.id);
            thisMap.set(key, _kickoffs);
        });

        this.state = {
            kickoffsByHour : kickoffsByHour
        }
    }

    componentWillReceiveProps({kickoff}) {
        this.setState({
            kickoff: kickoff
        });
    }

    getPriceElement(sites) {
        if (CollectionUtility.isEmpty(sites)) return '';

        let found = false;
        let smallPrice = sites[0].price;
        sites.forEach(_site => {
            if (_site.price == smallPrice) return;

            found = true;

            if (smallPrice > _site.price) {
                smallPrice = _site.price;
            }
        });

        if (found)
            return (<Fragment>{StringUtility.withComma(smallPrice)}<span className="text-muted">원~</span></Fragment>);
        else
            return (<Fragment>{StringUtility.withComma(smallPrice)}<span className="text-muted">원<span style={{paddingRight: 8 +'px'}}></span></span></Fragment>);
    }

    render() {
        let html = [];
        this.state.kickoffsByHour.forEach((_kickoffs, hour) => {
            let first = true;
            _kickoffs.forEach((_sites, _site_id) => {
                if (first === true) {
                    first = false;
                    html.push(<span key={`hour-${hour}-${_site_id}`} className='booking-cell-time-hour'>{hour}</span>);
                }
                else {
                    html.push(<span key={`hour-${hour}-${_site_id}`} className='booking-cell-time-hour'> </span>);
                }

                let notes = Array.from(CollectionUtility.groupBy(_sites, _site => _site.notes).keys());
                if (_sites.length > 0) {
                    const firstSite = _sites[0];
                    // SBS골프 1팀 80,000원2라운드(18홀)
                    html.push(
                            <span key={`site-${hour}-${_site_id}`} className='booking-cell-time' >
                                <a href={firstSite.booking_url} target='_blank' className='booking-cell-time-site-name'>{firstSite.name}</a>
                                <span className='booking-cell-time-enable-count'>{_sites.length}<span className="text-muted">팀</span></span>
                                <span className='booking-cell-time-fee'>{this.getPriceElement(_sites)}</span>
                                <span className='booking-cell-time-notes'>{notes.join(', ')}</span>
                            </span>
                    );
                }
                html.push(<br key={`br-${hour}-${_site_id}`} />);
            });
            html.push(<hr className='booking-cell-time-line' key={`br-${hour}`} />);
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
