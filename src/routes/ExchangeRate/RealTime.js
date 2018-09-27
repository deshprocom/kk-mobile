import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ exchangeRate }) => ({
  exchangeRate
}))
export default class RealTime extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'exchangeRate/fetchRealTime'
    })
  }
  render() {
    console.log(this.props.exchangeRate)
    return (
      <div>
        realTimeRates
      </div>
    );
  }
}
