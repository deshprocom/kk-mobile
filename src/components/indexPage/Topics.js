import React, {Component} from 'react';
import {Link, routerRedux} from 'dva/router';
import {ListView} from 'antd-mobile';
import styles from './index.less';
import {strNotNull, getDateDiff} from "../../utils/utils";
import {Images} from "../../Thems";
import BodyType from '../topic/BodyType'
import store from "../../index";

export default class Topics extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
    };
  };

  componentDidMount() {
    this.lv.scrollTo(0, this.props.listViewTop);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.topics),
    });
  }

  set_avatar = (avatar) => {
    if (strNotNull(avatar)) {
      return avatar;
    } else {
      return Images.home_avatar
    }
  };


  render() {
    const { isLoading, onEndReached, onClickItem} = this.props;
    const row = (rowData, sectionID, rowID) => {
      let linkPath = `/topics/${rowData.id}`;
      const {
        user, created_at, images, total_likes, total_comments, body_type, location, current_user_liked, excellent
      } = rowData;
      const {address_title} = location;
      return (
        <div className={styles.itemPage}>
          <Link to={linkPath} key={rowID} onClick={onClickItem}>
            <div  className={styles.userItem}>
              <img className={styles.itemAvatar} src={this.set_avatar(user.avatar)}/>
              <span className={styles.nick_name}>{user.nick_name}</span>
              <div style={{display: 'flex', flex: 1}}/>
              {excellent ?
                <span className={styles.txt_long} style={{color: '#F24A4A', borderColor: '#F24A4A'}}>精选</span> : null}
              {body_type === 'long' ? <span className={styles.txt_long}>长帖</span> : null}

              <div style={{paddingTop: 5, paddingBottom: 5, paddingRight: 5, paddingLeft: 5}} onClick={() => {
              }}>
                <img
                  alt={''}
                  className={styles.more_3}
                  src={Images.social.more_3}/>
              </div>
            </div>
            <BodyType rowData={rowData}/>
          </Link>

          <div className={styles.bottomView}>
            <span
              className={styles.time}>{getDateDiff(created_at)}{strNotNull(address_title) ? `·${address_title}` : ""}</span>

            <div style={{display: 'flex', flex: 1}}/>
            <div
              className={styles.btn_like}
              onClick={() => {
                store.dispatch(routerRedux.push('/homepage/loadApp'))
              }}>
              <img
                className={styles.like}
                src={current_user_liked ? Images.social.like_red : Images.social.like_gray}/>
              <span className={styles.time} style={{marginLeft: 4, marginRight: 25}}>{total_likes}</span>
            </div>

            <div className={styles.btn_like}
                 onClick={() => {
                   store.dispatch(routerRedux.push('/homepage/loadApp'))
                 }}>
              <img className={styles.comment}
                   alt={''}
                   src={Images.social.comment_gray}/>
              <span className={styles.time} style={{marginLeft: 4}}>{total_comments}</span>
            </div>
          </div>
        </div>
      );
    };

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 8,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );

    return (
      <div>
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : '没有更多了...'}
          </div>)}
          renderRow={row}
          useBodyScroll
          renderSeparator={separator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          initialListSize={100}
        />
      </div>
    );
  }
}
