import React, { Component } from 'react';
import {Link} from 'dva/router';

export default class ProductList extends Component {

  render() {
    const { products } = this.props;
    const productsLayout = products.map(product => {
      return(
        <div key={product.id}
             style={{padding: '10px'}}>
          <Link to={`/shop/products/${product.id}`}>
            {product.title}
          </Link>
        </div>
      )
    });
    return(
      <div>
        {productsLayout}
      </div>
    );
  }
}
