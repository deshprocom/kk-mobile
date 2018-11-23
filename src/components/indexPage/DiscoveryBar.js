import React, {Component} from 'react';
import {connect} from 'dva';
import styles from '../saunas/index.less';

@connect()
export default class DiscoveryBar extends Component {
  render() {
    const {changed_index, show_index} = this.props;
    return (
      <div style={{
        height:50,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
        backgroundColor:'#E54A2E',
        position: 'fixed',
        zIndex: 99
      }}>
        <div className={styles.navBar2}>
          <div className={styles.navBarTitle}>
            <div style={{
              display: 'flex',
              width: 82,
              height: 28,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }} className={show_index === 0 ? styles.imgShow1 : styles.imgShow2}>
              <span onClick={() => {
                changed_index && changed_index(0)
              }}
                    className={styles.navBarSpanActive}>
                    精华
              </span>
            </div>

            <div style={{
              display: 'flex',
              width: 82,
              height: 28,
              borderRadius: 4,
              alignItems: 'center',
              justifyContent: 'center'
            }} className={show_index === 1 ? styles.imgShow1 : styles.imgShow2}>
                <span onClick={() => {
                  changed_index && changed_index(1)
                }}
                      className={styles.navBarSpanActive}>
                广场
              </span>
            </div>

          </div>
        </div>
      </div>
    );
  }
}
