import React, {Component} from 'react';
import {Images} from '../../Thems';
import styles from './index.less';

export default class ProductBottom extends Component {

    render() {
        return (
            <div className={styles.detail_page}>
                <div className={styles.bottom}>
                    <div className={styles.bottomLeftView}>
                        <div  className={styles.bottomLeft}
                              onClick={() => {
                                  // this.props.history.push("/loadApp");
                                  window.location.reload();
                              }}
                        >
                            <img className={styles.bottomLeftImg} src={Images.cart}/>
                        </div>
                    </div>

                    <div className={{display: 'flex', flex: 1}}/>

                    <div
                      className={styles.bottomRight}
                        onClick={() => {
                            // this.props.history.push("/loadApp")
                            window.location.reload();
                        }}
                    >
                        <span className={styles.bottomRightTxt}>添加购物车</span>
                    </div>
                </div>
            </div>

        )
    }
}
