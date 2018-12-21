import React from 'react';
import 'script-loader!air-datepicker/dist/js/datepicker.min.js';
import './i18n/datepicker.kr'
import '../../node_modules/air-datepicker/dist/css/datepicker.min.css';

export default class AirDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDates: this.props.bookingdates
        }
    }

    componentDidMount() {
        this.$el = $(this.refs.input);
        const $dl = this.$el.datepicker({
            language: 'kr',
            position: 'bottom left',
            onHide: this.props.onSelect,
            minDate: new Date(),
            multipleDates: true,
            dateFormat: 'mm/dd D',
            multipleDatesSeparator: ', '
        }).data('datepicker');

        console.log('전달된 날짜들 ', this.state.bookingDates);
        $dl.selectDate(this.state.bookingDates);
    }

    componentWillUnmount() {
        this.$el.datepicker('destroy');
    }

    render() {
        return <div><input {...this.props} ref="input" type="text" className="datepicker-here form-control"
                           style={{textOverflow: 'ellipsis'}}/></div>;
    }
}