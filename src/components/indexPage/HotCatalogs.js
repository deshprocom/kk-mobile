import React, {Component} from 'react';
import {Card, Grid, Flex} from 'antd-mobile';
import styles from './index.less';
import {Images} from '../../Thems';
import {routerRedux} from 'dva/router';


export default class HotCatalogs extends Component {
  clickToPath = (el) => {
    console.log("el",el)
    const {dispatch} = this.props;
    if (el.externalPath)
      window.location.href = el.path;
    else
      dispatch(routerRedux.push(el.path))
  };

  render() {
    return (
      <div className={styles.hotView}>
        <div className={styles.viewLeft}>
          <div onClick={() => {
            this.clickToPath({
              icon: Images.macau.hotel,
              text: '酒店',
              size: {height: 32, width: 35},
              path: '/hotels'
            })
          }}>
            <img className={styles.leftTop}
                 src={Images.navigation2.hotel_bg}/>
          </div>
          <div onClick={() => {
            this.clickToPath({
              icon: Images.macau.rate_exchange,
              text: '汇率',
              size: {height: 34, width: 30},
              path: '/exchange_rates'
            })
          }}>
            <img className={styles.leftBottom}
                 style={{marginTop: 4}}
                 src={Images.navigation2.rate_bg}/>
          </div>

        </div>
        <div className={styles.viewRight}>
          <div onClick={() => {
            this.clickToPath({
              icon: Images.macau.food,
              text: '美食',
              size: {height: 35, width: 34},
              path: '/infos?type=cate',
            })
          }}>
            <img className={styles.leftBottom}
                 src={Images.navigation2.info_ng}/>
          </div>
          <div onClick={() => {
            this.clickToPath({
              icon: Images.macau.entertainment,
              text: '娱乐',
              size: {height: 34, width: 36},
              path: '/infos?type=recreation',
            })
          }}>
            <img className={styles.leftTop}
                 style={{marginTop: 4}}
                 src={Images.navigation2.rec_bg}/>
          </div>

        </div>
      </div>
    )
  }
}
