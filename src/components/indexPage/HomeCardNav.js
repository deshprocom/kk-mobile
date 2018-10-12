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
    icon: Images.navigation2.fast_food,
    text: '快餐',
    size: {height: 22, width: 22},
    path: '/services/fastfood',
  },
  {

    icon: Images.navigation2.round_trip,
    text: '往返',
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

        <Grid data={actions} hasLine={false}
              onClick={this.clickToPath}
              itemStyle={{ height: '70px'}}
        />
        <div style={{height:10}}/>

        <Card.Body style={{minHeight:30}}>
          <Flex className={styles.customFlex}>
            {services.map(dataItem => (

              <Flex.Item key={dataItem.text}
                         onClick={() =>this.clickToPath(dataItem)}
                         className={styles.customView}>
                <img style={dataItem.size} src={dataItem.icon} alt="" className={styles.customImg}/>
                <span>{dataItem.text}</span>
              </Flex.Item>
            ))}
          </Flex>
        </Card.Body>
      </Card>
    );
  }
}
