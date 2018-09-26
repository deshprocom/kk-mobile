import React, {Component} from 'react';
import {Card, Grid, Flex} from 'antd-mobile';
import styles from './index.less';
import {Images} from '../../Thems';

const catalogs = [
  [{
    name: '汇率',
    type: 'exchange_rate',
    size: {height: 34, width: 30},
    icon: Images.macau.rate_exchange
  },
    {
      name: '娱乐',
      type: 'recreation',
      size: {height: 34, width: 36},
      icon: Images.macau.entertainment
    }
  ],
  [
    {
      name: '酒店',
      type: 'hotel',
      size: {height: 32, width: 35},
      icon: Images.macau.hotel
    },
    {
      name: '景点',
      type: 'scenic',
      size: {height: 34, width: 36},
      icon: Images.macau.viewpoint
    }
  ],
  [
    {
      name: '美食',
      type: 'cate',
      size: {height: 35, width: 34},
      icon: Images.macau.food
    },

    {
      name: '人闻',
      type: 'humanities',
      size: {height: 34, width: 30},
      icon: Images.macau.book
    }
  ],
  [
    {
      name: '出入境',
      type: 'entry_exit',
      size: {height: 29, width: 31},
      icon: Images.out_exit
    },
    {
      name: '商城',
      type: 'mall',
      size: {height: 29, width: 31},
      icon: Images.macau.store
    }
  ]


];

const actions = Array.from(new Array(8)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

const services = [
  {
    icon: Images.navigation2.weather,
    text: '天气',
    size: {height: 23, width: 23},
  },
  {
    icon: Images.navigation2.fast_food,
    text: '快餐',
    size: {height: 22, width: 22},
  },
  {
    icon: Images.navigation2.round_trip,
    text: '人闻',
    size: {height: 20, width: 20},
  },
  {
    icon: Images.navigation2.convenient,
    text: '便民',
    size: {height: 18, width: 18}
  },
];

export default class HomeCardNav extends Component {
  render() {
    return (
      <Card full className={styles.customCard}>
        <Grid data={actions} hasLine={false}/>
        <Card.Body>
          {/*<Grid data={services}*/}
          {/*hasLine={false}*/}
          {/*className={styles.customCard}*/}
          {/*renderItem={dataItem => (*/}

          {/*)}*/}
          {/*/>*/}
          <Flex className={styles.customFlex}>
            {services.map(dataItem => (
              <Flex.Item key={dataItem.text} className={styles.customView}>
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
