import React, {Component} from 'react';
import styles from '../index.less'
import {Images} from '../../Thems/index';
import {connect} from 'dva';

@connect(({homePage}) => ({
  homePage
}))
export default class LoadApp extends Component {
  state = {
    show: false,
    showAndroid: false,
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'homePage/fetchAppVersions'
    });
  }

  toIosApp = () => {
    this.setState({
      show: true
    });
    window.open('https://itunes.apple.com/cn/app/macauhike/id1381273877?mt=8');
  };

  toAndroidApp = () => {
    let plat = navigator.userAgent;
    if (plat.indexOf('Android') > -1 || plat.indexOf('Adr') > -1) {
      let ua = navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        this.setState({
          showAndroid: true
        });
      } else {

        this.open_android(`http://cdn-upyun.deshpro.com/deshpro_public/macauhike.apk?version=${this.props.homePage.app_versions.android_platform.version}`);
      }
    }
  };

  open_android = (url) => {
    let a = document.getElementById("android_load");
    a.setAttribute("href", url);
    a.setAttribute("target", "_blank");
    a.click();
  }


  render() {

    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
        {this.state.showAndroid ? <div style={{
          width: '100%',
          height: 70,
          display: 'flex',
          flexDirection: 'row-reverse',
          backgroundColor: '#444444'
        }}>
          <img style={{width: '70%', height: 70, marginRight: 23}} src={Images.safari} alt=""/>
        </div> : null}

        <div className={styles.download} style={this.state.showAndroid ? {marginTop: 70} : null}>

          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            bottom: 60
          }}>
            <a className={styles.ios_app_a} onClick={this.toIosApp} style={{marginLeft: 17}}>
              <img className={styles.iosDownloadImg} src={Images.iphoneload} alt=""/>
            </a>

            <a id='android_load' className={styles.android_app_a} onClick={this.toAndroidApp} style={{marginRight: 17}}>
              <img className={styles.andoridDownloadImg} src={Images.androidload} alt=""/>
            </a>
          </div>

        </div>
      </div>

    )
  }
}
