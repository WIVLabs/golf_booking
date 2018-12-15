import React from "react";
import {DateUtility, CollectionUtility} from "../../components/Utility";
import BookingCellHour from "./BookingCellHour";

class BookingCell extends React.Component {

    constructor(props) {
        super();

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

    render() {
        return (
            <td className='booking-cell'>
            {
                this.state.kickoffsByHour ?
                    Array.from(this.state.kickoffsByHour.keys()).map(hour => {
                        return (<BookingCellHour key={`cell-hour-${hour}`} hour={hour} kickoffs={this.state.kickoffsByHour.get(hour)} />);
                    })
                    : ''
            }
            </td>
        )
    }
};


export default BookingCell;
