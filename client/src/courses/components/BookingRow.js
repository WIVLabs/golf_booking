import * as React from "react";
import BookingCell from "./BookingCell";

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

    render() {
        return (
            <tr>
                <td className='text-center' style={{width:this.state.golfCourseNameWidth}}>
                    <span className='site-name'>{this.state.course.name}</span>
                    <span className='site-address text-muted'>{this.state.course.address}</span>
                </td>
                {this.state.course ?
                    this.state.course.kickoffs.map((_kickoffsByHour, idx) => {
                            return <BookingCell key={'cell-' + idx} dateWidth={this.state.dateWidth} kickoffsByHour={_kickoffsByHour}/>
                         })
                    : ''
                }
            </tr>
        );
    }
}

export default BookingRow;