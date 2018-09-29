import React, { Component } from 'react';
import { Icon, SearchBar, Flex } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './index.less';
import {Images} from '../../Thems'

export default class HotelNav extends Component {

  onChange = (val) => { this.props.changeKeyword(val) };

  render() {
    const { checkinDate, checkoutDate, onClick, dispatch } = this.props;

    return (
      <div className={styles.navbar}>
        <Flex className={styles.flex}>
          <div onClick={() => dispatch(routerRedux.goBack()) } style={{marginRight:10}}>
            <img className={styles.sign_retrun} src={Images.sign_retrun}/>
          </div>
          <SearchBar placeholder="地名 / 酒店"
                     maxLength={8}
                     style={{width: '68%',backgroundColor:'transparent'}}
                     onChange={this.onChange}
          />
          <div style={{display:'flex',flex:1}}/>
          <div onClick={onClick}>
            <Flex>
              <div style={{fontSize: '13px',marginRight:3}}>
                <span className={styles.dateSpan}>住{checkinDate.format('MMMDo')}</span><br/>
                <span className={styles.dateSpan}>离{checkoutDate.format('MMMDo')}</span>
              </div>
              <img className={styles.down2} src={Images.macau.down2}/>
            </Flex>

          </div>
        </Flex>
      </div>
    );
  }
}
