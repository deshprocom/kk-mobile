import React, { Component } from 'react';
import {Link} from 'dva/router';
import {Grid} from  'antd-mobile';
import styles from './index.less'

export default class ProductList extends Component {

  renderItem = (item, index) => {
    let linkPath = `/shop/products/${item.id}`;
    const {title, price, all_stock, icon} = item;
    return <Link key={index} to={linkPath} className={styles.listItem} style={index % 2 === 0 ? {} : {marginLeft: 8}}
                             onClick={() => {

                             }}>
      <img
        className={styles.imgThem}
        src={icon}/>

      <span className={styles.txtName}>{title}</span>
      <div style={{display:'flex',flex: 1}}/>
      <div className={styles.viewPrice}>

        <div style={{display:'flex',flexDirection: 'row', alignItems: 'flex-end'}}>
          <span style={{fontSize: 14, color: '#DF1D0F'}}>¥</span>
          <span style={{fontSize: 18, color: '#DF1D0F'}}>{price}</span>
        </div>

        <div style={{display:'flex',flex: 1}}/>
        {all_stock > 0 ?
          <span className={styles.txtNum}>{`剩余${all_stock}件`}</span> : null}
      </div>

    </Link>
  };

  render() {
    const { products } = this.props;
    return(
      <div style={{width:'100%',paddingBottom:80}}>
        <Grid data={products} columnNum={2}
              hasLine={false}
              // className={styles.gridView}
              itemStyle={{ height: '264px', background: 'rgba(0,0,0,.05)' }}
              renderItem={this.renderItem}/>
      </div>
    );
  }
}
