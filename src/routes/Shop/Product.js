import React, { Component } from 'react';
import { connect } from 'dva';
import ProductDetail from "../../components/Shop/ProductDetail";

@connect(({ shop }) => ({
  shop
}))
export default class Info extends Component {
  componentDidMount() {
    const { params } = this.props.match;
    this.props.dispatch({
      type: 'shop/fetchProductDetail',
      payload: { id: params.id },
    });
    window.scrollTo(0, 0);
  }
  render() {
    const { productDetail } = this.props.shop;
    return (
      <div>
        { productDetail && <ProductDetail productDetail={productDetail} /> }
      </div>
    );
  }
}
