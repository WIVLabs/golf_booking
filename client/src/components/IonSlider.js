import React from 'react';
import 'script-loader!ion-rangeslider/js/ion.rangeSlider.min.js';
import '../../node_modules/ion-rangeslider/css/normalize.css';
import '../../node_modules/ion-rangeslider/css/ion.rangeSlider.css';


export default class IonSlider extends React.Component {
    componentDidMount() {
        this.$el = $(this.refs.input);
        this.$el.ionRangeSlider({
            onChange : this.props.onChange
        });
    }

    componentWillUnmount() {
        this.$el.ionRangeSlider('destroy');
    }

    render() {
        return <div><input {...this.props} ref="input"/></div>;
    }
}
