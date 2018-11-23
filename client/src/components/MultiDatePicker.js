import React from 'react';

export default class MultiDatePicker extends React.Component {
    componentDidMount() {
        this.$el = $(this.refs.input);
        this.$el.datepicker();
        console.log(this.$el);
    }

    componentWillUnmount() {
        this.$el.datepicker('destroy');
    }

    render() {
        return <div><input {...this.props} ref="input"/></div>;
    }
}
