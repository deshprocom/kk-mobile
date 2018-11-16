import React, {Component} from 'react';
import {Link} from 'dva/router';
import {Images} from "../Thems";
import {strNotNull} from "../utils/utils";
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import GoBack from "./GoBack";
import styles from './index.less'

export default class VisaInfoPage extends Component {

  render() {
    let phone = "13169674979";
    return (
      <div className={styles.visaInfo}>

        <GoBack title={'签证'}/>

        <div style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          marginTop: 1,
          backgroundColor: 'white',
          paddingLeft: 17,
          paddingRight: 17
        }}>
          <span className={styles.text1} style={{marginTop: 20}}>港澳通行证团队旅游L签续签办理</span>
          <span className={styles.text2} style={{marginTop: 20}}>合作商铺地址：珠海市香洲区拱北地下口岸广场t字通道
          </span>
          <span className={styles.text2} style={{marginTop: 5}}>营业时间：11:30 至20:30
          </span>

          <a href={`tel:${phone}`} style={{marginTop: 5}}>
            <span className={styles.text2}>请联系电话：+86-13169674979</span>
          </a>

          <Link key={'quick'} to={`/shop/products/67`}
                className={styles.btn} style={{backgroundColor: "#E54A2E", marginTop: 36}}>
            <span className={styles.text3} style={{alignSelf: 'center'}}>快签办理点击前往>></span>
          </Link>
          <Link key={'last'} to={`/shop/products/68`}
                className={styles.btn} style={{backgroundColor: "#4A90E2", marginTop: 20}}>
            <span className={styles.text3} style={{alignSelf: 'center'}}>慢签办理点击前往>></span>
          </Link>
        </div>
      </div>
    )
  }
}
