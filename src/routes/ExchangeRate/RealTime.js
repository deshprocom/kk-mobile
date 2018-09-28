import React, { Component } from 'react';
import { connect } from 'dva';
import {Link} from 'dva/router';

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
    console.log(this.props.exchangeRate);
    const { realTimeRates } = this.props.exchangeRate;
    return (
      <div>
        <p>当前是实时汇率</p>
        <Link to='/exchange_rates/local'>
          点击前往本地汇率
        </Link>
      </div>
    );
  }
}
