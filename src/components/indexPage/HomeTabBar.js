import React, {Component} from 'react';
import { connect } from 'dva';
import {Flex} from 'antd-mobile';
import styles from './index.less';
import {routerRedux} from 'dva/router';

const Bars = [
  {
    title: '首页',
    background: 'http://kkh5.deshpro.com/images/gray_home.png',
    red_background: 'http://kkh5.deshpro.com/images/red_home.png',
    path: '/homepage',
    width:'22px',
    height:'22px'
  },
  {
    title: '澳门圈',
    background: 'http://kkh5.deshpro.com/images/gray_explore.png',
    red_background: 'http://kkh5.deshpro.com/images/red_explore.png',
    path: '/homepage/discovery',
    width:'20px',
    height:'23px'
  },
];

@connect()
export default class HomeTabBar extends Component {
  toPath = (path) => {
    this.props.dispatch(routerRedux.push(path));
  };

  render() {
    console.log(this.props);
    const { currentPath } = this.props;
    const itemLayout = Bars.map((bar, index) => {
      const background = bar.path === currentPath ? bar.red_background : bar.background;
      const fontStyle = bar.path === currentPath ? {color: 'rgb(229, 74, 46)'} : {};
      return (
        <Flex.Item className={styles.homeItem} key={index} onClick={()=> this.toPath(bar.path)}>
          <Flex justify="center" >
            <div className={styles.icon}
                 style={{background: `url(${background}) center center /  ${bar.width} ${bar.height} no-repeat` }}/>
          </Flex>
          <div className={styles.tabBarText} style={fontStyle} >
            {bar.title}
          </div>
        </Flex.Item>
      )
    });
    return (
      <div>
        <div style={{height: '50px'}}/>
        <div className={styles.homeTabBar}>
          <Flex>
            {itemLayout}
          </Flex>
        </div>
      </div>
    );
  }
}
