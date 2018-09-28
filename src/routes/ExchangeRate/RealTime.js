import React, { Component } from 'react';
import { connect } from 'dva';
import RealTimeRate from "../../components/exchangeRate/RealTimeRate";

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
    console.log('fetchRealTime',this.props.exchangeRate)
    const { realTimeRates } = this.props.exchangeRate;

    return (
      <div style={{overflowX: 'hidden'}}>
        <RealTimeRate exchangeRate={realTimeRates}/>
      </div>
    );
  }
}
