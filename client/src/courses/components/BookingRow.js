import * as React from "react";
import BookingCell from "./BookingCell";

class BookingRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course : props.course
        }

        console.log(this.state);
    }

    render() {
        return (
            <tr>
                <td>{this.state.course ? this.state.course.name: ''}</td>

                {this.state.course ?
                    this.state.course.kickoffs.map((kickoff, idx) => {
                        return <BookingCell key={idx} kickoff={kickoff}/>
                    })
                    :
                    ''
                }
            </tr>
        );
    }
}

export default BookingRow;