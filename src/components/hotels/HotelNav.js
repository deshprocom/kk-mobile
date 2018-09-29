import React, { Component } from 'react';
import { Icon, SearchBar, Flex } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import styles from './index.less';

export default class HotelNav extends Component {
  
  onChange = (val) => { this.props.changeKeyword(val) };
  
  render() {
    const { checkinDate, checkoutDate, onClick, dispatch } = this.props;
    
    return (
      <div className={styles.navbar}>
        <Flex>
          <div onClick={() => dispatch(routerRedux.goBack()) } style={{width: '10%'}}>
            <Icon type="left" />
          </div>
          <SearchBar placeholder="地名 / 酒店"
                     maxLength={8}
                     style={{width: '68%'}}
                     onChange={this.onChange}
          />
          <div onClick={onClick} style={{width: '22%'}}>
            <Flex>
              <div style={{fontSize: '13px', width: 65}}>
                <span>住{checkinDate.format('MMMDo')}</span>
                <span>离{checkoutDate.format('MMMDo')}</span>
              </div>
              <div>
                <Icon type="down"/>
              </div>
            </Flex>
            
          </div>
        </Flex>
      </div>
    );
  }
}
