import React, {Component} from 'react';
import {Modal} from 'antd-mobile';
import {Images} from '../../Thems';
import styles from './index.less';

export default class LotteryPage extends Component {
  render(){
    const { visible, onClose } = this.props;
    return(
      <Modal
        transparent={true}
        visible={visible}
        maskClosable={true}
        className={styles.customModal}
        onClose={onClose}
      >
        <img style={{width: '100%'}} src={Images.homepage.turntable} onClick={()=>{
          window.location.href = 'https://kkh5.deshpro.com/loadApp'
        }}/>
        <div onClick={onClose} style={{
          position: 'absolute',
          top: 30,
          right: 25,
          zIndex: 999
        }}>
          <img style={{width: 30, height: 30}} src={Images.lottery_close}/>
        </div>
      </Modal>
    )
  }
}
