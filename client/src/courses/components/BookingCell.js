import React from "react";
import {DateUtility, CollectionUtility} from "../../components/Utility";
import BookingCellHour from "./BookingCellHour";

class BookingCell extends React.Component {

    constructor({kickoff, dateWidth}) {
        super();

        // 시간생성
        kickoff.sites.map(site => {
            let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
            site['hour'] = hour;
        });

        // 시간대별로 그룹핑
        const kickoffsByHour = CollectionUtility.groupBy(kickoff.sites, site => site.hour);

        // site.id로 그룹핑
        kickoffsByHour.forEach((_kickoffs, key, thisMap) => {
            _kickoffs = CollectionUtility.groupBy(_kickoffs, _site => _site.id);
            thisMap.set(key, _kickoffs);
        });

        this.state = {
            kickoffsByHour : kickoffsByHour,
            dateWidth : dateWidth
        }
    }

    componentWillReceiveProps({kickoff, dateWidth}) {

        this.setState({
            kickoff: kickoff,
            dateWidth : dateWidth
        });
    }

    render() {
        return (
            <td className='booking-cell' style={{minWidth:this.state.dateWidth}}>
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
