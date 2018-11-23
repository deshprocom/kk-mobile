import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link, routerRedux} from 'dva/router';
import SaunaGoBack from '../saunas/GoBack';
import styles from './index.less';
import {Images} from '../../Thems';
import {strNotNull} from '../../utils/utils';
import GoBack from '../GoBack'

export default class SaunnaInfo extends Component {

  _star = (star) => {
    let stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(i);
    }
    return stars;
  };

  goBack=(path)=>{
    const {dispatch} = this.props;
    if (!path) dispatch(routerRedux.goBack());
    else dispatch(routerRedux.push(path));
  };

  render() {
    const {logo, location, title, description, telephone, star_level, amap_poiid, amap_navigation_url, price, amap_location} = this.props.sauna;
    return <div className={styles.infoView}>

      <div style={{
        width:'100%',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-around',
        marginTop:15,
        position: 'fixed',
        zIndex:99
      }}>
        <img onClick={() => this.goBack()}
             style={{
               marginLeft: 17,
               height: 19,
               width: 10
             }}
             src={Images.sign_retrun}/>
        <div style={{display:'flex',flex:1}}/>
        <a href={`tel:${telephone}`}>
          <img style={{marginRight: 17, height: 22, width: 22}} src={Images.phone}/>
        </a>
      </div>

      <div style={{}}>
        <img src={logo} style={{height: 200, width: '100%'}}/>

        <div className={styles.nav_view}>

          <div style={{width: '70%'}}>
            <span className={styles.title}>{title}</span>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
              <span style={{color: '#999999', fontSize: 12}}>服务星级：</span>
              {this._star(star_level).map((index) => {
                return <img key={index} className={styles.stars} src={Images.macau.star}/>
              })}
            </div>
            <a href={`tel:${telephone}`}
               style={{marginTop: 8}}>
              <span style={{color: '#999999', fontSize: 12}} className={styles.tel}>联系电话：{telephone}</span>
            </a>
            <span className={styles.location2}>地址：{location}</span>
          </div>
          <div style={{display: 'flex', flex: 1}}/>

          <div style={{display: 'flex', marginRight: 22, flexDirection: 'column', alignItems: 'flex-end'}}>
            <div style={{display: 'flex', flex: 1}}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img style={{height: 14, width: 10}}
                   src={Images.macau.location}/>
              <span style={{color: "#4A90E2", fontSize: 12, marginLeft: 4}}>地图</span>
            </div>

          </div>
        </div>

        <div style={{
          display: 'flex',
          backgroundColor: 'white',
          alignItems: 'center',
          paddingLeft: 17,
          paddingRight: 17,
          paddingBottom: 70
        }} className="renderHtmlData"
             id="renderHtmlData"
             dangerouslySetInnerHTML={{__html: description}}>
        </div>


      </div>

    </div>
  }

}
