import * as React from "react";
import BookingCell from "./BookingCell";
import {CollectionUtility} from "../../components/Utility";

class BookingRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course : props.course,
            visibleKickoffDates : props.visibleKickoffDates,
            golfCourseNameWidth : props.golfCourseNameWidth,
            dateWidth : props.dateWidth
        }
    }

    componentWillReceiveProps({visibleKickoffDates, golfCourseNameWidth, dateWidth}) {
        this.setState({
            visibleKickoffDates: visibleKickoffDates,
            golfCourseNameWidth : golfCourseNameWidth,
            dateWidth : dateWidth
        });
    }

    findKickoffsByDate(date) {
        if (CollectionUtility.isEmpty(this.state.course.kickoffs)) return [];

        let offLength = this.state.course.kickoffs.length;
        for(let idx = 0; idx < offLength; idx++) {
            let _kickoffs = this.state.course.kickoffs[idx];

            if (_kickoffs.length < 1) continue;

            if (_kickoffs[0].kickoff_date === date) return _kickoffs;
        }

        return [];
    }

    render() {
        return (
            <tr>
                <td className='text-center' style={{width:this.state.golfCourseNameWidth}}>
                    <span className='site-name'>{this.state.course.name}</span>
                    <span className='site-address text-muted'>{this.state.course.address}</span>
                </td>
                {!this.state.visibleKickoffDates ?
                    '' :
                    this.state.visibleKickoffDates.map((_date, idx) => {
                        let kickoffs = this.findKickoffsByDate(_date);
                        return <BookingCell key={'cell-' + idx} dateWidth={this.state.dateWidth} kickoffsByDateHour={kickoffs} date={_date} />
                    })
                }
            </tr>
        );
    }
}

export default BookingRow;