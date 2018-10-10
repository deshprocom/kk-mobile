import React, {Component} from 'react';
import styles from './index.less';
import {isEmptyObject} from '../../utils/utils';
import RateInfo from './RateInfo';
import {Link} from 'dva/router';
import GoBack from "../GoBack";

export default class RealTimeRate extends Component {

  state = {
    update_time: ''
  };

  change_time = (time) => {
    this.setState({
      update_time: time
    })
  }

  render() {
    const {exchangeRate} = this.props;
    if (isEmptyObject(exchangeRate)) {
      return (
        <div/>
      )
    }
    return (
      <div className={styles.ratePage}>
        <GoBack title={'实时汇率'}/>

        <RateInfo
          type={'real_time'}
          change_time={this.change_time}
          exchangeRate={exchangeRate}/>

        {/*<Link className={styles.localView}*/}
              {/*to={'/exchange_rates/local'}>*/}
          {/*<span className={styles.localSpan}>澳门本地汇率参考</span>*/}

        {/*</Link>*/}
        <div className={styles.localView}
             onClick={() => {
               window.location.href = 'https://kkh5.deshpro.com/loadApp'
             }}>
          <span className={styles.localSpan}>澳门本地汇率参考</span>

        </div>
        <span className={styles.intro}>
          本数据来源于中国银行官网，仅供参考{'\n'}
          更新时间：{this.state.update_time}
        </span>
      </div>
    )
  }
}
