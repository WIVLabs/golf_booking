import * as React from "react";
import BookingCell from "./BookingCell";

class BookingRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course : props.course,
            visibleKickoffDates : props.visibleKickoffDates
        }
    }

    componentWillReceiveProps({visibleKickoffDates}) {
        this.setState({
            visibleKickoffDates: visibleKickoffDates
        });
    }

    render() {
        return (
            <tr>
                <td className='text-center'>
                    <span className='site-name'>{this.state.course.name}</span>
                    <span className='site-address text-muted'>{this.state.course.address}</span>
                </td>

                {this.state.course ?
                    this.state.course.kickoffs
                        .filter(_kickoff => this.state.visibleKickoffDates.includes(_kickoff.kickoff_date))
                        .map((_kickoff, idx) => {
                            return <BookingCell key={_kickoff.kickoff_date} kickoff={_kickoff}/>
                         })
                    : ''
                }
            </tr>
        );
    }
}

export default BookingRow;