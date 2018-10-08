import React, {Component} from 'react';
import styles from './index.less';
import {Images} from '../../Thems'
import {strNotNull} from "../../utils/utils";
import NavBar from "../NavBar";

const txt1 = '从深圳过境至澳门主要的交通方式就是乘船过境，在购买船票过境前，首先得确保自身的港澳同行证及身份证仍在有效期内，船票采用实名制购买，以上两证请随身携带以防遗漏。购票时间则建议最好在过境当日的前1~3日进行预定，避免出现临时订票没空位的情况。'
const txt2 = '游客可以乘坐深圳地铁 2号线（蛇口线）至 蛇口港地铁站，并从蛇口港C出口出去，转乘328/M105等公交（1个站，约15分钟）到达新招商蛇口邮轮码头； 从蛇口港地铁站到蛇口邮轮中心，全程约2.3公里，预计10分钟能到。 '

const round1 = 'http://kkh5.deshpro.com/images/fastBtn/round1.jpeg';
const round2 = 'http://kkh5.deshpro.com/images/fastBtn/round2.jpeg';
const round3 = 'http://kkh5.deshpro.com/images/fastBtn/round3.jpeg';
const round4 = 'http://kkh5.deshpro.com/images/fastBtn/round4.jpeg';
const round5 = 'http://kkh5.deshpro.com/images/fastBtn/round5.jpeg';
const round6 = 'http://kkh5.deshpro.com/images/fastBtn/round6.jpeg';


export default class ArriveAndDepart extends Component {

  constructor(props) {
    super(props)
    this.state = {
      max: false,
      item: ''
    };
  }

  imageClick = (max, item) => {
    this.setState({
      max,
      item
    })
  }

  goBack = () => {
    this.props.history.goBack()
  };


  render() {

    return (
      <div style={{display: 'flex', flex: 1}}>
        <NavBar title={'邮轮往返指南'} goBack={this.goBack}/>

        <div style={{
          marginLeft: 17, marginRight: 17, paddingBottom: 40,
          display: 'flex', flexDirection: 'column',
        }}>
          <span className={styles.txt1} style={{marginTop: 15}}>一、过境准备</span>
          <span className={styles.txt2} style={{marginTop: 6}}>{txt1}</span>
          <div className={styles.imgMiddle} onClick={() => {
            this.imageClick(true, round1);
          }}>
            <img style={{width: '100%', height: 230, marginTop: 6, alignSelf: 'center'}}
                 src={Images.fastBtn.round1}/>
          </div>
          <span className={styles.txt1} style={{marginTop: 17}}>二、船票购票流程 </span>
          <span className={styles.txt3} style={{marginTop: 4}}>*目前蛇口邮轮的订购方式主要为现场自主买票及微信预定 </span>
          <span className={styles.txt2} style={{marginTop: 6}}>1、微信搜索「招商蛇口邮轮码头」，点击关注并进入微信公众号 </span>
          <div className={styles.imgMiddle}
               onClick={() => {
                 this.imageClick(true, round5);
               }}>
            <img style={{width: 140, height: 250, marginTop: 11, display: 'flex', alignSelf: 'center'}}
                 src={Images.fastBtn.round5}/>
          </div>

          <span className={styles.txt2} style={{marginTop: 21}}>2、点击主菜单下的「一键预定」，并选择“高速客船”进行船票预订 </span>
          <div className={styles.imgMiddle}
               onClick={() => {
                 this.imageClick(true, round3);
               }}>
            <img style={{width: 160, height: 280, marginTop: 20, display: 'flex', alignSelf: 'center'}}
                 src={Images.fastBtn.round3}/>
          </div>

          <span className={styles.txt2} style={{marginTop: 17}}>3、进入邮轮母港购票页面，选择行程、时间及到达港口等信息后进行确认购票 </span>
          <div className={styles.imgMiddle}
               onClick={() => {
                 this.imageClick(true, round4);
               }}>
            <img style={{width: 160, height: 286, marginTop: 14, display: 'flex', alignSelf: 'center'}}
                 src={Images.fastBtn.round4}/>
          </div>

          <span className={styles.txt2} style={{marginTop: 14}}>目前深圳到澳门路线共有两条： </span>
          <span className={styles.txt2} style={{marginTop: 7}}>①深圳蛇口⇌澳门氹仔 ②深圳蛇口⇌澳门外港 </span>
          <span className={styles.txt3}
                style={{marginTop: 12}}>注：蛇口邮轮的行驶时间约为1小时左右，班次间隔平均在1小时/一班上下，具体邮轮班次时间表请见文末。 </span>
          <span className={styles.txt1} style={{marginTop: 20}}>三、邮轮船票领取方式</span>
          <span className={styles.txt2} style={{marginTop: 12}}>购票成功后可以根据船次时间前往招商蛇口邮轮码头，进行取票过境。
            蛇口邮轮码头在B1、L1、L2均设立了自助取票点，过境旅客可通过携带身份证进行自助取票 </span>
          <div className={styles.imgMiddle}
               onClick={() => {
                 this.imageClick(true, round2);
               }}>
            <img style={{width: '100%', height: 229, marginTop: 14, display: 'flex', alignSelf: 'center'}}
                 src={Images.fastBtn.round2}/>
          </div>

          <span className={styles.txt1} style={{marginTop: 18}}>四、蛇口邮轮码头交通信息 </span>
          <span className={styles.txt2} style={{marginTop: 6}}>{txt2}</span>
          <div className={styles.imgMiddle}
               onClick={() => {
                 this.imageClick(true, round6);
               }}>
            <img style={{width: '100%', height: 280, marginTop: 11, display: 'flex', alignSelf: 'center'}}
                 src={Images.fastBtn.round6}/>
          </div>

        </div>

        {this.state.max ? <div style={{
          backgroundColor: 'rgb(20,20,20)',
          position: 'fixed',
          zIndex: 999,
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          textAlign: 'center',
          display: 'flex'

        }}
                               onClick={() => {
                                 this.setState({
                                   max: false
                                 })
                               }}>
          <img style={{width: '100%', height: 'auto', alignSelf: 'center'}} src={this.state.item}/>
        </div> : null}
      </div>
    );
  }
}
