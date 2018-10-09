import React, { Component } from 'react';
import { connect } from 'dva';
import ServiceList from "../../components/services/ServiceList";

@connect(({ hotline }) => ({
  hotline
}))
export default class FastFoods extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'hotline/fetchFastFoods'
    })
  }

  render() {
    const { fastFoods } = this.props.hotline;
    return(
      <div>
        { fastFoods && <ServiceList items={fastFoods} type={'fastFoods'}/> }
      </div>
    );
  }
}
