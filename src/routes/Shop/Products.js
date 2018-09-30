import React, { Component } from 'react';
import { connect } from 'dva';
import classnames from "classnames";
import {Link} from 'dva/router';
import ProductList from "../../components/Shop/ProductList";

@connect(({ shop }) => ({
  shop
}))
export default class Products extends Component {
  componentDidMount() {
    this.fetchProducts(this.props)
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.categoryId !== this.props.categoryId)
      this.fetchProducts(nextProps)
  };
  
  fetchProducts = (props) => {
    this.props.dispatch({
      type: 'shop/fetchProducts',
      payload: { category_id: props.categoryId },
    })
  };
  
  render() {
    const { products } = this.props.shop;
    return(
      <div>
        { products && <ProductList products={products}/> }
      </div>
    );
  }
}
