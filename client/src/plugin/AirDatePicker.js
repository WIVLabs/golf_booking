import React from 'react';
import 'script-loader!air-datepicker/dist/js/datepicker.min.js';
import './i18n/datepicker.kr'
import '../../node_modules/air-datepicker/dist/css/datepicker.min.css';

export default class AirDatePicker extends React.Component {
    componentDidMount() {
        this.$el = $(this.refs.input);
        this.$el.datepicker({
            onHide: this.props.onSelect,
            minDate: new Date()
        });
    }

    componentWillUnmount() {
        this.$el.datepicker('destroy');
    }

    render() {
        return <div><input {...this.props} ref="input" type="text"
                           className="datepicker-here form-control"
                           data-language='kr'
                           data-multiple-dates="3"
                           data-multiple-dates-separator=", "
                           data-position='bottom right'/></div>;
    }
}