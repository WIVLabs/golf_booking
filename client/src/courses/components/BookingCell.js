import React from "react";
import {DateUtility, CollectionUtility, StringUtility} from "../../components/Utility";
import BookingCellHour from "./BookingCellHour";

class BookingCell extends React.Component {

    constructor({kickoffsByDateHour, date, dateWidth}) {
        super();

        this.state = {kickoffsByDateHour, date, dateWidth}
    }

    componentWillReceiveProps({kickoffsByDateHour, date, dateWidth}) {

        this.setState({kickoffsByDateHour, date, dateWidth});
    }

    render() {
        return (
            <td className='booking-cell' style={{minWidth:this.state.dateWidth}}>
            {this.state.kickoffsByDateHour ?
                this.state.kickoffsByDateHour.map((_kickoffsByDateHour, idx) => {
                    return (<BookingCellHour key={`cell-hour-${_kickoffsByDateHour.kickoff_hour}`} hour={_kickoffsByDateHour.kickoff_hour} sites={_kickoffsByDateHour.sites} />);
                })
                : ''
            }
            </td>
        )
    }
};


export default BookingCell;
