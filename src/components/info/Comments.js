import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {strNotNull, getDateDiff} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from './index.less';

export default class Comments extends Component {

  show_count = (item) => {
    if (strNotNull(item)) {
      if (item >= 1000 || item.length > 3) {
        return '999+'
      } else {
        return item
      }
    } else {
      return 0
    }
  };

  set_avatar = (avatar) => {
    if (strNotNull(avatar)) {
      return avatar;
    } else {
      return Images.home_avatar
    }
  };

  render() {
    const {detail, comments, total_comments} = this.props;
    return (
      <div className={styles.footerView}>
        <div className={styles.infoDetailBtn}>
          <span className={styles.infoSpan}
                onClick={() => {
                  window.location.href = 'https://kkh5.deshpro.com/loadApp'
                }}>{`全部评论(${this.show_count(detail.comments_count)})`}</span>
          <div style={{display: 'flex', flex: 1}}/>
          <span className={styles.infoSpan}
                onClick={() => {
                  window.location.href = 'https://kkh5.deshpro.com/loadApp'
                }}>阅读&nbsp;{`(${this.show_count(detail.total_views)})`}</span>
          <img className={styles.like} src={Images.like_gray} onClick={() => {
            window.location.href = 'https://kkh5.deshpro.com/loadApp'
          }}/>
          <span className={styles.infoSpan} onClick={() => {
            window.location.href = 'https://kkh5.deshpro.com/loadApp'
          }}>&nbsp;{`(${this.show_count(detail.total_likes)})`}</span>
        </div>
        <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>

        {total_comments > 0 ? <div>
          {strNotNull(comments) && comments.length > 0 && comments.map((item, index) => {
            const {user} = item;
            return (
              <div
                className={styles.itemView}
                key={`commtens+${index}`}>
                <div style={{marginTop: 17, display: 'flex', marginRight: 17, flexDirection: 'row'}}>
                  <img className={styles.c_avatar} src={this.set_avatar(user.avatar)} onClick={() => {
                    window.location.href = 'https://kkh5.deshpro.com/loadApp'
                  }}/>

                  <div style={{display: 'flex', flexDirection: 'column', marginLeft: 8}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                      <span className={styles.c_nick}>{user.nick_name}</span>
                    </div>
                    <span className={styles.c_time}>{getDateDiff(user.created_at)}</span>
                  </div>

                  <div style={{display: 'flex', flex: 1}}/>
                  <img style={{height: 18, width: 20}} src={Images.reply} onClick={() => {
                    window.location.href = 'https://kkh5.deshpro.com/loadApp'
                  }}/>
                </div>
                <span className={styles.c_body}>{item.body}</span>

                {strNotNull(item.total_replies) && item.total_replies > 0 ?
                  <div className={styles.replies} onClick={() => {
                    window.location.href = 'https://kkh5.deshpro.com/loadApp'
                  }}>
                    <span className={styles.c_nick2}>查看{item.total_replies}条回复</span>
                  </div> : null}
                <div style={{marginTop: 10, width: '100%', height: 1.5, backgroundColor: '#F3F3F3'}}/>
              </div>

            )
          })}
        </div> : null}
      </div>
    )
  }
}
