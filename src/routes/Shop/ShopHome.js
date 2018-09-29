import React, { Component } from 'react';
import { connect } from 'dva';

@connect(({ shop }) => ({
  shop
}))
export default class ShopHome extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'shop/fetchCategories'
    })
  }
  
  render() {
    console.log('fetchCategories')
    console.log(this.props)
    return (
      <div>
        shop home
      </div>
    );
  }
}
