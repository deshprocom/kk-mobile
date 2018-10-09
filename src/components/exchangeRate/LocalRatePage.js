import React, {Component} from 'react';
import styles from './index.less';
import RateInfo from './RateInfo';
import {Tabs} from 'antd-mobile';
import Leaderboard from './Leaderboard';
import NavBar from '../NavBar'
import {routerRedux} from "dva/router";

const categories = [{sub: 1, title: '汇率咨询达人', type: 'ex_rate'}, {sub: 2, title: '积分达人', type: 'integral'}, {
  sub: 3,
  title: '交友达人',
  type: 'dating'
}];

export default class LocalRatePage extends Component {

  goBack = () => {
    this.props.dispatch && this.props.dispatch(routerRedux.goBack());
  };

  render() {
    const {exchangeRate} = this.props;
    return (
      <div className={styles.ratePage}>
        <NavBar title={'澳门本地汇率参考'} goBack={this.goBack}/>
        <RateInfo
          type={'local'}
          exchangeRate={exchangeRate}/>

        <span className={styles.rankingSpan}>排行榜</span>

        <div className={styles.rankingView}>
          <Tabs tabs={categories}
                initalPage={1}
                renderTab={tab => <span className={styles.rankingTitle}>{tab.title}</span>}
                tabBarActiveTextColor={'#E54A2E'}
                tabBarInactiveTextColor={'#000000'}
                tabBarUnderlineStyle={{borderColor: '#E54A2E'}}>
            {this.renderContent}
          </Tabs>

        </div>
      </div>
    )
  }

  renderContent = tab =>
    <Leaderboard
      category={tab}
      dispatch={this.props.dispatch}
      rateLeaders={this.props.rateLeaders}/>
}
