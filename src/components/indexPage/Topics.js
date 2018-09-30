import React, {Component} from 'react';
import {Link} from 'dva/router';
import {ListView} from 'antd-mobile';
import ReactDOM from 'react-dom';
import styles from './index.less';
import {strNotNull, getDateDiff} from "../../utils/utils";
import {Images} from "../../Thems";
import BodyType from '../topic/BodyType'

export default class Topics extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      nextPage: 1,
      height: document.documentElement.clientHeight * 3 / 4,
      max: false,
      index: 0,
      item:{}
    };

    this._topicsData = [];
  };

  changeState = (max, index,item) => {
    this.setState({
      max,
      index,
      item
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.state.nextPage
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.topics !== this.props.topics) {
      const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      let nextPage = this.state.nextPage + 1;

      this._topicsData = this._topicsData.concat(nextProps.topics);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._topicsData),
        isLoading: false,
        height,
        nextPage
      });
    }
  }

  onEndReached = () => {
    this.setState({isLoading: true});
    this.props.dispatch({
      type: 'topic/fetchTopics',
      payload: {
        page: this.state.nextPage
      }
    })
  };

  set_avatar = (avatar) => {
    if (strNotNull(avatar)) {
      return avatar;
    } else {
      return Images.home_avatar
    }
  };


  render() {
    const row = (rowData, sectionID, rowID) => {
      let linkPath = `/topics/${rowData.id}`;
      console.log("jskjdksds",this.state.item.id)
      const {
        user, created_at, images, total_likes, total_comments, body_type, location, current_user_liked, excellent
      } = rowData;
      const {address_title} = location;
      return (
        <div className={styles.itemPage}>
          <Link to={linkPath} key={rowID} className={styles.userItem}>
            <img className={styles.itemAvatar} src={this.set_avatar(user.avatar)}/>
            <span className={styles.nick_name}>{user.nick_name}</span>
            <div style={{display: 'flex', flex: 1}}/>
            {excellent ?
              <span className={styles.txt_long} style={{color: '#F24A4A', borderColor: '#F24A4A'}}>精选</span> : null}
            {body_type === 'long' ? <span className={styles.txt_long}>长帖</span> : null}

            <div style={{paddingTop: 5, paddingBottom: 5, paddingRight: 5, paddingLeft: 5}} onClick={() => {
            }}>
              <img
                className={styles.more_3}
                src={Images.social.more_3}/>
            </div>
          </Link>

          <BodyType rowData={rowData} changeState={this.changeState}/>

          <div className={styles.bottomView}>
            <span
              className={styles.time}>{getDateDiff(created_at)}{strNotNull(address_title) ? `·${address_title}` : ""}</span>

            <div style={{display: 'flex', flex: 1}}/>
            <div
              className={styles.btn_like}>
              <img
                className={styles.like}
                src={current_user_liked ? Images.social.like_red : Images.social.like_gray}/>
              <span className={styles.time} style={{marginLeft: 4, marginRight: 25}}>{total_likes}</span>
            </div>

            <div
              className={styles.btn_like}>
              <img
                className={styles.comment}
                src={Images.social.comment_gray}/>
              <span className={styles.time} style={{marginLeft: 4}}>{total_comments}</span>
            </div>
          </div>

          {this.state.max && this.state.item.id == rowData.id ? <div style={{
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
            {strNotNull(images[this.state.index]) ?
              <img style={{width: '100%', height: 'auto', alignSelf: 'center'}}
                   src={images[this.state.index].url}/> : null}

          </div> : null}

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
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          renderSeparator={separator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
