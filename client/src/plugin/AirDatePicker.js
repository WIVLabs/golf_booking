import React from 'react';
import 'script-loader!air-datepicker/dist/js/datepicker.min.js';
import './i18n/datepicker.kr'
import '../../node_modules/air-datepicker/dist/css/datepicker.min.css';

export default class AirDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingDates: this.props.bookingDates
        }
    }

    componentDidMount() {
        this.$el = $(this.refs.input);
        this.$el.datepicker({
            language: 'kr',
            position: 'bottom right',
            onHide: this.props.onSelect,
            minDate: new Date(),
            multipleDates: 3,
            multipleDatesSeparator: ', '
        }).data('datepicker');
        console.log('파라미터 일자값 설정', this.state.bookingDates);
    }

    componentWillUnmount() {
        this.$el.datepicker('destroy');
    }

    render() {
        return <div><input {...this.props} ref="input" type="text" className="datepicker-here form-control"/></div>;
    }
}