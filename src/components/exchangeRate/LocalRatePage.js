import React, {Component} from 'react';
import styles from './index.less';
import {isEmptyObject} from '../../utils/utils';
import {Images} from '../../Thems'
import RateInfo from './RateInfo';

export default class LocalRatePage extends Component {

  componentDidMount(){
    window.document.title = "澳门本地汇率参考";
  }

  render(){
    const {exchangeRate} = this.props;
    return(
      <div className={styles.ratePage}>
        <RateInfo
          type={'local'}
          exchangeRate={exchangeRate}/>
      </div>
    )
  }
}
