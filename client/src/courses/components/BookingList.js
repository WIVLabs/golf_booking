import React from "react";

class BookingList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            bookings: props.bookings
        }
        console.log(this.state);
    }

    render() {
        return (<div />);
    };
}

export default BookingList;