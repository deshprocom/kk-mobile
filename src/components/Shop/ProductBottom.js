import React, {Component} from 'react';
import {Images} from '../../Thems';
import styles from './index.less';

export default class ProductBottom extends Component {

  render() {
    return (
      <div className={styles.detail_page}>
        <div className={styles.bottom}>
          <div className={styles.bottomLeftView}>
            <div className={styles.bottomLeft}
                 onClick={() => {
                   window.location.href = 'https://kkh5.deshpro.com/loadApp'
                 }}
            >
              <img className={styles.bottomLeftImg} src={Images.cart}/>
            </div>
          </div>

          <div className={{display: 'flex', flex: 1}}/>

          <div
            className={styles.bottomRight}
            onClick={() => {
              window.location.href = 'https://kkh5.deshpro.com/loadApp'
            }}
          >
            <span className={styles.bottomRightTxt}>添加购物车</span>
          </div>
        </div>
      </div>

    )
  }
}
