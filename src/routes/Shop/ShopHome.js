import React, { Component } from 'react';
import { connect } from 'dva';
import ShopNav from "../../components/Shop/ShopNav";
import Products from "./Products";

@connect(({ shop }) => ({
  shop
}))
export default class ShopHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCategoryId: null,
    };
  }
  
  componentDidMount() {
    this.props.dispatch({
      type: 'shop/fetchCategories'
    })
  }
  
  clickSelectNav = (id) => {
    this.setState({selectedCategoryId: id})
  };
  
  render() {
    const { categories } = this.props.shop;
    if (!categories) return <div></div>;
    
    let { selectedCategoryId } = this.state;
    if (!selectedCategoryId) selectedCategoryId = categories[0].id;
  
    return(
      <div>
        <ShopNav categories={categories} navId={selectedCategoryId} onClick={this.clickSelectNav} />
        <Products categoryId={selectedCategoryId}/>
      </div>
    );
  }
}
