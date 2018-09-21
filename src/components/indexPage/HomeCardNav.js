import React, { Component } from 'react';
import { Card, Grid, Flex } from 'antd-mobile';
import styles from './index.less';

const actions = Array.from(new Array(8)).map((_val, i) => ({
  icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
  text: `name${i}`,
}));

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
    text: '人闻',
  },
  {
    icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
    text: '便民',
  },
];

export default class HomeCardNav extends Component {
  render() {
    return (
      <Card full className={styles.customCard}>
        <Grid data={actions} hasLine={false} />
        <Card.Body >
          {/*<Grid data={services}*/}
                {/*hasLine={false}*/}
                {/*className={styles.customCard}*/}
                {/*renderItem={dataItem => (*/}
               
                {/*)}*/}
          {/*/>*/}
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
