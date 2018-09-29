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
    this.props.dispatch({
      type: 'info/fetchInfoDetail',
      payload: { id: params.id },
    });
    this.props.dispatch({
      type: 'info/fetchInfoComments',
      payload: { target_id: params.id,target_type: 'info' },
    })
  }
  render() {
    const { infoDetail,info_comments } = this.props.info;
    logMsg('Info 渲染render',this.props.info)
    return (
      <div>
        <InfoDetail infoDetail={infoDetail} info_comments={info_comments}/>
      </div>
    );
  }
}
