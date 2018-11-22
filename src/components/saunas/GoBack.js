import React, {Component} from 'react';
import {Images} from "../../Thems";
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import styles from './index.less';

@connect()
export default class GoBack extends Component {
  goTo = (path) => {
    const {dispatch} = this.props;
    dispatch(routerRedux.push(path));
  };

  render() {
    const {currentPath} = this.props;
    return (
      <div style={{marginBottom: 50, marginTop: 0}}>
        <div className={styles.navBar}>
          <div style={{flexGrow: 2}}>
            <img onClick={() => this.goTo('/homepage')}
                 className={styles.goBackImage}
                 src={Images.sign_retrun}/>
          </div>
          <div className={styles.navBarTitle}>
            <div style={{
              display: 'flex',
              width: 82,
              height: 28,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }} className={currentPath === 'info' ? styles.imgShow1 : styles.imgShow2}>
              <span onClick={() => currentPath !== 'info' && this.goTo('/infos?type=recreation')}
                    className={styles.navBarSpanActive}>
                    休闲娱乐
              </span>
            </div>

            <div style={{
              display: 'flex',
              width: 82,
              height: 28,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }}  className={currentPath === 'saunas' ? styles.imgShow1 : styles.imgShow2}>
                <span onClick={() => this.goTo('/saunas')}
                      className={styles.navBarSpanActive}>
                桑拿水疗
              </span>
            </div>

          </div>
          <div style={{flexGrow: 2}}>
          </div>
        </div>
      </div>
    );
  }
}
