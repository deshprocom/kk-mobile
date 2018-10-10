import React, { Component } from 'react';
import { connect } from 'dva';
import ShopNav from "../../components/Shop/ShopNav";
import Products from "./Products";
import { routerRedux } from 'dva/router';
import queryString from 'query-string';

@connect(({ shop }) => ({
  shop
}))
export default class ShopHome extends Component {
  constructor(props) {
    super(props);
  
    const params = queryString.parse(props.location.search);
    this.state = {
      selectedCategoryId: params.CategoryId,
    };
  }

  componentDidMount() {
    const { shop, dispatch } = this.props;
  
    if (!!shop.categories) return;
    
    dispatch({
      type: 'shop/fetchCategories'
    });
  }
  
  UNSAFE_componentWillReceiveProps(nextProps) {
    const params = queryString.parse(nextProps.location.search);
    this.setState({selectedCategoryId: params.CategoryId});
  };
  
  clickSelectNav = (id) => {
    this.props.dispatch(routerRedux.push(`/shop?CategoryId=${id}`));
  };

  render() {
    const { categories } = this.props.shop;
    if (!categories) return <div></div>;

    let { selectedCategoryId } = this.state;
    
    if (!selectedCategoryId) selectedCategoryId = categories[0].id;
    
    return(
      <div>
        <ShopNav categories={categories} navId={selectedCategoryId} onClick={this.clickSelectNav} dispatch={this.props.dispatch}/>
        <Products categoryId={selectedCategoryId}/>
      </div>
    );
  }
}
