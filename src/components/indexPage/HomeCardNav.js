import React, { Component } from 'react';
import { Card, Grid, Flex } from 'antd-mobile';
import styles from './index.less';
import { routerRedux } from 'dva/router';

const actions = [
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '汇率',
    path: '/exchange_rates'
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '酒店',
    path: '/hotels'
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '美食',
    path: '/infos?type=cate',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '出入境',
    path: 'http://www.fsm.gov.mo/psp/pspmonitor/mobile/PortasdoCerco.aspx',
    externalPath: true
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '娱乐',
    path: '/infos?type=recreation',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '景点',
    path: '/infos?type=scenic',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '人闻',
    path: '/infos?type=humanities',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '商城',
    path: '/shop'
  },
];

const services = [
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '天气',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '快餐',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '往返',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '便民',
  },
];

export default class HomeCardNav extends Component {
  clickToPath = (el) => {
    const { dispatch } = this.props;
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
        />
        <Card.Body >
          <Flex className={styles.customFlex}>
            {services.map(dataItem => (
              <Flex.Item key={dataItem.text}>
                <img src={dataItem.icon} alt="" className={styles.customImg} />
                <span>{dataItem.text}</span>
              </Flex.Item>
            ))}
          </Flex>
        </Card.Body>
      </Card>
    );
  }
}
