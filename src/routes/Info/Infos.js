import React, { Component } from 'react';
import { connect } from 'dva';
import queryString from 'query-string';
import Infos from "../../components/info/Infos";

@connect(({ info }) => ({
  info
}))
export default class Info extends Component {
  render() {
    const { info, dispatch, location } = this.props;
    const params = queryString.parse(location.search);
    return (
      <div>
        <Infos infos={info.infos} dispatch={dispatch} infoType={params.type} />
      </div>
    );
  }
}
