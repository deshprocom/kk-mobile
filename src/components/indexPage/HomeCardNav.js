import React, {Component} from 'react';
import {Card, Grid, Flex} from 'antd-mobile';
import styles from './index.less';
import {Images} from '../../Thems';
import {routerRedux} from 'dva/router';


const actions = [
  {
    icon: Images.macau.rate_exchange,
    text: '汇率',
    size: {height: 34, width: 30},
    path: '/exchange_rates'
  },
  {
    icon: Images.macau.hotel,
    text: '酒店',
    size: {height: 32, width: 35},
    path: '/hotels'
  },
  {
    icon: Images.macau.food,
    text: '美食',
    size: {height: 35, width: 34},
    path: '/infos?type=cate',
  },
  {
    icon: Images.out_exit,
    text: '出入境',
    size: {height: 29, width: 31},
    path: 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx',
    externalPath: true
  },
  {
    icon: Images.macau.entertainment,
    text: '娱乐',
    size: {height: 34, width: 36},
    path: '/infos?type=recreation',
  },
  {
    icon: Images.macau.viewpoint,
    text: '景点',
    size: {height: 34, width: 36},
    path: '/infos?type=scenic',
  },
  {
    icon: Images.macau.book,
    text: '人闻',
    size: {height: 34, width: 30},
    path: '/infos?type=humanities',
  },
  {
    icon: Images.macau.store,
    text: '商城',
    size: {height: 29, width: 31},
    path: '/shop'
  },
];

const services = [
  {
    icon: Images.navigation2.weather,
    text: '天气',
    size: {height: 23, width: 23},
    path: 'http://wx.weather.com.cn/mweather/101330101.shtml#1',
    externalPath: true
  },
  {
    icon: Images.navigation2.car_bg,
    text: '出入境',
    size: {height: 20, width: 20},
    path: 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx',
    externalPath: true
  },
  {

    icon: Images.navigation2.round_trip,
    text: '船务',
    size: {height: 20, width: 20},
    path: '/services/arrive_and_depart'
  },
  {
    icon: Images.navigation2.convenient,
    text: '便民',
    size: {height: 18, width: 18},
    path: '/services/publicservice',

  },
];
const services2 = [{
  text: '攻略',
  type: 'raiders',
  size: {height: 19, width: 19},
  icon: Images.navigation2.raiders_bg,
  path: '/infos?type=strategy'
},
  {
    text: '签证',
    type: 'visa',
    size: {height: 19, width: 20},
    icon: Images.navigation2.visa,
    path: '/visa'
  },
  {
    text: '优惠',
    type: 'coupon',
    size: {height: 20, width: 20},
    icon: Images.navigation2.coupon_bg,
    path: '/infos?type=discounts'
  },
  {
    text: '商城',
    type: 'mall',
    size: {height: 18, width: 18},
    icon: Images.navigation2.mall_bg,
    path: '/shop'
  }];

export default class HomeCardNav extends Component {
  clickToPath = (el) => {
    const {dispatch} = this.props;
    if (el.externalPath)
      window.location.href = el.path;
    else
      dispatch(routerRedux.push(el.path))
  };

  render() {
    return (
      <Card full className={styles.customCard}>

        <Card.Body style={{minHeight: 30}}>
          <Flex className={styles.customFlex}>
            {services.map((dataItem, index) => (

              <Flex.Item key={dataItem.text}
                         onClick={() => this.clickToPath(dataItem)}
                         className={styles.customView}>
                <img style={dataItem.size} src={dataItem.icon} alt="" className={styles.customImg}/>
                <span>{dataItem.text}</span>
                {/*<div style={{width: index === services.length - 1 ? 0 : 1, height: 30, backgroundColor: '#F3F3F3'}}/>*/}
              </Flex.Item>
            ))}
          </Flex>

          <Flex className={styles.customFlex}
                style={{marginTop: 10}}>
            {services2.map((dataItem, index) => (

              <Flex.Item key={dataItem.text}
                         onClick={() => {
                           this.clickToPath(dataItem)
                         }}
                         className={styles.customView}>

                {dataItem.type === 'visa' ?
                  <img style={{width: 28, height: 14, position: 'absolute', bottom:25, left: '29%',zIndex:99}}
                         src={Images.navigation2.tehui}/> : null}

                <img style={dataItem.size} src={dataItem.icon} alt="" className={styles.customImg}/>
                <span>{dataItem.text}</span>

                {/*<div style={{width: index === services.length - 1 ? 0 : 1, height: 30, backgroundColor: '#F3F3F3'}}/>*/}
              </Flex.Item>
            ))}
          </Flex>
        </Card.Body>
      </Card>
    );
  }
}
