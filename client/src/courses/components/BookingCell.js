import React from "react";
import {DateUtility, CollectionUtility} from "../../components/Utility";
import BookingCellHour from "./BookingCellHour";

class BookingCell extends React.Component {

    constructor({kickoffsByHour, dateWidth}) {
        super();

        // console.log(kickoff);
        // 시간생성
        // kickoff.sites.map(site => {
        //     let hour = DateUtility.convert(site.kickoff_time, 'YYYY.MM.DD HH:mm', 'HH');
        //     site['hour'] = hour;
        // });
        //
        // // 시간대별로 그룹핑
        // const kickoffsByHour = CollectionUtility.groupBy(kickoff.sites, site => site.hour);
        //
        // // site.id로 그룹핑
        // kickoffsByHour.forEach((_kickoffs, key, thisMap) => {
        //     _kickoffs = CollectionUtility.groupBy(_kickoffs, _site => _site.id);
        //     thisMap.set(key, _kickoffs);
        // });

        this.state = {
            kickoffsByHour : kickoffsByHour,
            dateWidth : dateWidth
        }
    }

    componentWillReceiveProps({kickoffsByHour, dateWidth}) {

        this.setState({
            kickoffsByHour: kickoffsByHour,
            dateWidth : dateWidth
        });
    }

    render() {
        return (
            <td className='booking-cell' style={{minWidth:this.state.dateWidth}}>
            {this.state.kickoffsByHour ?
                this.state.kickoffsByHour.map((_kickoffByHour, idx) => {
                    return (<BookingCellHour key={`cell-hour-${_kickoffByHour.kickoff_hour}`} hour={_kickoffByHour.kickoff_hour} sites={_kickoffByHour.sites} />);
                })
                    : ''
            }
            </td>
        )
    }
};


export default BookingCell;
