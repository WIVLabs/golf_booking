import React, {Component, Fragment} from 'react';
import {CollectionUtility, StringUtility} from "../../components/Utility";

class BookingCellHour extends Component {

    constructor({hour, sites}) {
        super();

        this.state = {hour, sites}
    }

    getPriceElement(price) {
        if (StringUtility.isEmpty(price)) return '0';

        return (price.is_same ? (StringUtility.withComma(price.max)) : '~' + (StringUtility.withComma(price.max)))
    }

    render() {
        return (
            <div>
                <span className='booking-cell-time-hour'>{this.state.hour}시대</span>
                <ul className='booking-cell-time-site'>
                {
                    this.state.sites.map(_site => {
                        let colorStyle = {};
                        if (_site.id === 1) {
                            colorStyle = {color: 'blue'}
                        }
                        else if (_site.id === 2) {
                            colorStyle = {color: 'green'}
                        }
                        return (
                            <li key={`site-${this.state.hour}-${_site.id}`} className='booking-cell-time' >
                                <a href={_site.url} target='_blank' className='booking-cell-time-site-name' style={colorStyle}>{_site.name}</a>
                                <span className='booking-cell-time-enable-count'>{_site.teams}<span className="text-muted">팀</span></span>
                                <span className='booking-cell-time-fee'>{this.getPriceElement(_site.price)}원</span>
                                <span className='booking-cell-time-notes'>{_site.notes.join(', ')}</span>
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