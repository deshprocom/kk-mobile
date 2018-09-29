import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {strNotNull, getDateDiff,isEmptyObject} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from './index.less';
import Content from "../info/Content";

export default class TopicDetail extends Component {

  set_avatar = (avatar) => {
    if (strNotNull(avatar)) {
      return avatar;
    } else {
      return Images.home_avatar
    }
  };

  render() {
    const {topicDetail,topicComments} = this.props;
    if (isEmptyObject(topicDetail)) {
      return <div/>
    }
    const {
      id, images, total_likes, title, user, cover_link, current_user_liked, body,
      body_type, official, recommended, total_comments, total_views
    } = topicDetail;
    const {avatar, created_at, followers_count, following_count, nick_name, signature, user_id} = user;
    return (
      <div className={styles.detailPage}>
        <div className={styles.top}>
          <img className={styles.c_avatar} src={this.set_avatar(avatar)}/>

          <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <span style={{fontSize: 12, color: '#444444'}}>{nick_name}</span>
              {official ? <span className={styles.c_tag} style={{backgroundColor: '#161718',
                color: '#FFE9AD'}}>官方</span> : null}

              {recommended ? <span className={styles.c_tag} style={{backgroundColor: '#161718',
                color: '#FFE9AD'}}>精选</span> : null}
            </div>
            <span className={styles.c_time}>{getDateDiff(created_at)}</span>
          </div>
        </div>

        {strNotNull(body) ? <div className={styles.introduceGame} dangerouslySetInnerHTML={{__html: body}}/> : null}

        <Content detail={topicDetail} comments={topicComments.items} total_comments={topicDetail.total_comments}/>

      </div>
    )
  }
}
