import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import styles from './index.less';
import {Images} from '../../Thems';
import {strNotNull} from '../../utils/utils';
import GoBack from '../GoBack'
import SaunaGoBack from '../saunas/GoBack'

export default class InfoList extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
    };
  }

  componentDidMount() {
    this.lv.scrollTo(0, this.props.listViewTop);
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.infos),
    });
  }

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

  render() {
    const { isLoading, onEndReached, onClickItem, showSaunas} = this.props;
    const row = (info, sectionID, rowID) => {
      let linkPath = `/infos/${info.id}`;
      return (
        <Link key={rowID} to={linkPath} onClick={onClickItem}>
          <div className={styles.viewItem}>
            <div className={styles.itemLeft}>
              <span className={styles.title}>{info.title}</span>
              <div style={{display: 'flex', flex: 1}}/>
              <div className={styles.itemBtn}>
                <span className={styles.infoSpan}>{info.date}</span>
                <div className={styles.itemBtnRight}>
                  <div
                    className={styles.readView}>
                    <span className={styles.infoSpan}>阅读</span>
                    <span className={styles.total_views}>{info.total_views}</span>
                    <img
                      alt=''
                      className={styles.likes_count}
                      src={Images.social.like_gray}/>
                    <span className={styles.total_views}>{this.show_count(info.likes_count)}</span>
                  </div>
                </div>
              </div>
            </div>
            <div style={{display: 'flex', flex: 1}}/>
            <img
              alt=''
              src={info.image}
              className={styles.rightImg}/>
          </div>
        </Link>
      );
    };

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 2,
          borderTop: '1px solid #ECECED',
          borderBottom: '1px solid #ECECED',
        }}
      />
    );
    
    const goback = showSaunas ? <SaunaGoBack currentPath={'info'}/> : <GoBack title={this.infoType(this.props.infoType)}/>;
    console.log('showSaunas====')
    console.log(showSaunas)
    return (
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        {goback}
        <ListView
          ref={el => this.lv = el}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
          initialListSize={100}
        />
      </div>
    );
  }


  infoType = (infoType) => {
    console.log("infoType",infoType)
    if (infoType === 'cate') {
      return '美食'
    } else if (infoType === 'recreation') {
      return '休闲娱乐'
    } else if (infoType === 'discounts') {
      return '优惠'
    } else if (infoType === 'strategy') {
      return '攻略'
    } else {
      return '资讯'
    }
  }
}
