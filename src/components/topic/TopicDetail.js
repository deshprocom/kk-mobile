import React, {Component} from 'react';
import {strNotNull, getDateDiff, isEmptyObject} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from './index.less';
import Comments from "../info/Comments";
import BodyType from "./BodyType";
import GoBack from "../GoBack";

export default class TopicDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      max: false,
      index: 0,
      item: {}
    };
  }

  changeState = (max, index, item) => {
    this.setState({
      max,
      index,
      item
    })
  }

  set_avatar = (avatar) => {
    if (strNotNull(avatar)) {
      return avatar;
    } else {
      return Images.home_avatar
    }
  };

  render() {
    const {topicDetail, topicComments} = this.props;
    if (isEmptyObject(topicDetail)) {
      return <div/>
    }
    const {
      images, user, cover_link, official, recommended
    } = topicDetail;
    const {avatar, created_at, nick_name} = user;
    return (
      <div style={{display:'flex',flexDirection:'column',width:'100%'}}>
        <GoBack title={'详情'}/>
        <div className={styles.detailPage}>
          <div className={styles.top}>
            <img className={styles.c_avatar} src={this.set_avatar(avatar)}/>

            <div style={{display: 'flex', flexDirection: 'column', marginLeft: 10}}>
              <div style={{display: 'flex', flexDirection: 'row'}}>
                <span style={{fontSize: 12, color: '#444444'}}>{nick_name}</span>
                {official ? <span className={styles.c_tag} style={{
                  backgroundColor: '#161718',
                  color: '#FFE9AD'
                }}>官方</span> : null}

                {recommended ? <span className={styles.c_tag} style={{
                  backgroundColor: '#161718',
                  color: '#FFE9AD'
                }}>精选</span> : null}
              </div>
              <span className={styles.c_time}>{getDateDiff(created_at)}</span>
            </div>
          </div>

          <BodyType rowData={topicDetail} changeState={this.changeState}/>


          <Comments detail={topicDetail} comments={topicComments.items} total_comments={topicDetail.total_comments}/>


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
            <img style={{width: '100%', height: 'auto', alignSelf: 'center'}}
                 src={isEmptyObject(images) ? cover_link : images[this.state.index].url}/>
          </div> : null}
        </div>
      </div>
    )
  }
}
