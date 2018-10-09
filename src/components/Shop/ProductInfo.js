import React, {Component} from 'react';
import {isEmptyObject} from '../../utils/utils';
import styles from './index.less';

export default class ProductInfo extends Component {

  render() {
    const {product} = this.props;
    const {master} = product;
    if(isEmptyObject(master)){
      return <div className={styles.bottom_page}/>
    }
    return <div className={styles.bottom_page}>
      <span className={styles.title}>{product.title}</span>
      <div className={styles.bottom_viewPrice}>
        <span className={styles.price1}>¥</span>
        <span className={styles.price2}>{master.price}</span>

        <span className={styles.price3}>{master.original_price}</span>

      </div>

      <div className={styles.viewLogistics}>
        <span className={styles.logistics1}>7天退换</span>

        <span className={styles.logistics2}>运费：¥{this.props.product.freight_fee}</span>
        <div className={{display:'flex',flex: 1}}/>
        <span className={styles.logistics3}>{master.origin_point}</span>

      </div>

    </div>
  }
}
