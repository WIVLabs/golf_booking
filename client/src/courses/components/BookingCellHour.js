import React, {Component, Fragment} from 'react';
import {CollectionUtility, StringUtility} from "../../components/Utility";

class BookingCellHour extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hour: props.hour,
            kickoffs : props.kickoffs
        }
    }

    getPriceElement(sites) {
        if (CollectionUtility.isEmpty(sites)) return '';

        let foundOtherPrice = false;
        let highPrice = sites[0].price;
        sites.forEach(_site => {
            if (_site.price == highPrice) return;

            foundOtherPrice = true;
            if (highPrice < _site.price) {
                highPrice = _site.price;
            }
        });

        let symbol = '';
        if (foundOtherPrice)
            symbol = '~';

        return (<Fragment>{symbol}{StringUtility.withComma(highPrice)}<span className="text-muted">원</span></Fragment>);
    }

    render() {
        return (
            <div>
                <span className='booking-cell-time-hour'>{this.state.hour}</span>
                <ul className='booking-cell-time-site'>
                {
                    Array.from(this.state.kickoffs.keys()).map(_site_id => {
                        const siteBookings = this.state.kickoffs.get(_site_id);

                        let notes = Array.from(CollectionUtility.groupBy(siteBookings, _booking => _booking.notes).keys());
                        const [firstBooking] = siteBookings;
                        return (
                            <li key={`site-${this.state.hour}-${_site_id}`} className='booking-cell-time' >
                                <a href={firstBooking.booking_url} target='_blank' className='booking-cell-time-site-name'>{firstBooking.name}</a>
                                <span className='booking-cell-time-enable-count'>{siteBookings.length}<span className="text-muted">팀</span></span>
                                <span className='booking-cell-time-fee'>{this.getPriceElement(siteBookings)}</span>
                                <span className='booking-cell-time-notes'>{notes.join(', ')}</span>
                            </li>
                        );
                    })
                }
                </ul>
            </div>
        );
    }
}

export default BookingCellHour;