import React, { Component } from 'react';
import { connect } from 'dva';
import ServiceList from "../../components/services/ServiceList";

@connect(({ hotline }) => ({
  hotline
}))
export default class PublicServices extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'hotline/fetchPublicServices'
    })
  }

  render() {
    const { publicServices } = this.props.hotline;
    return(
      <div>
        { publicServices && <ServiceList items={publicServices} type={'public'} dispatch={this.props.dispatch}/> }
      </div>
    );
  }
}
