import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ exchangeRate }) => ({
  exchangeRate
}))
export default class Local extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'exchangeRate/fetchLocal'
    })
  }
  render() {
    console.log(this.props.exchangeRate);
    const { localRates } = this.props.exchangeRate;
    return (
      <div>
        本地汇率
        LocalRates
      </div>
    );
  }
}
