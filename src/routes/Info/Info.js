import React, { Component } from 'react';
import { connect } from 'dva';
import InfoDetail from "../../components/info/InfoDetail";
import {logMsg} from "../../utils/utils";

@connect(({ info }) => ({
  info
}))
export default class Info extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    logMsg('Info 开始',this)
    logMsg('Info 请求数据')
    this.props.dispatch({
      type: 'info/fetchInfoDetail',
      payload: { id: params.id },
    })
  }
  render() {
    const { infoDetail } = this.props.info;
    logMsg('Info 渲染render',this.props.info)
    return (
      <div>
        <InfoDetail infoDetail={infoDetail}/>
      </div>
    );
  }
}
