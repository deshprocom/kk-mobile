import React, { Component } from 'react';
import LocalRatePage from "../../components/exchangeRate/LocalRatePage";
import {connect} from "dva/index";

@connect(({ exchangeRate }) => ({
  exchangeRate
}))

export default class LocalRate extends Component {

  componentDidMount() {
    this.props.dispatch({
      type: 'exchangeRate/fetchLocalRate'
    })
  }
  render() {
    console.log('fetchLocalRate',this.props.exchangeRate)
    const {localRates} = this.props.exchangeRate;
    return (
      <div style={{overflowX: 'hidden'}}>
        <LocalRatePage exchangeRate={localRates}/>
      </div>
    );
  }
}
