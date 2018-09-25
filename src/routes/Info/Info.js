import React, { Component } from 'react';
import { connect } from 'dva';
import InfoDetail from "../../components/info/InfoDetail";

@connect(({ info }) => ({
  info
}))
export default class Info extends Component {
  componentDidMount() {
    const { params } = this.props.match;
  
    this.props.dispatch({
      type: 'info/fetchInfoDetail',
      payload: { id: params.id },
    })
  }
  render() {
    const { infoDetail } = this.props.info;
    return (
      <div>
        <InfoDetail infoDetail={infoDetail}/>
      </div>
    );
  }
}
