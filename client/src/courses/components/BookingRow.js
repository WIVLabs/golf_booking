import * as React from "react";
import BookingCell from "./BookingCell";

class BookingRow extends React.Component {
    constructor({course}) {
        super();
        this.state = {
            course : course
        }
    }

    render() {
        return (
            <tr>
                <td className='site-name text-center'>{this.state.course ? this.state.course.name: ''}</td>

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