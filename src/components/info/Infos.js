import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import styles from './index.less';
import {Images} from '../../Thems';
import {strNotNull} from '../../utils/utils'

export default class Infos extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      nextPage: 1,
      infoType: props.infoType,
    };

    this._infosData = [];
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        page: this.state.nextPage,
        type: this.state.infoType,
      }
    })
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.infos !== this.props.infos) {
      let nextPage = this.state.nextPage + 1;

      this._infosData = this._infosData.concat(nextProps.infos);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._infosData),
        isLoading: false,
        nextPage
      });
    }
  }

  onEndReached = () => {
    this.setState({isLoading: true});
    this.props.dispatch({
      type: 'info/fetchInfos',
      payload: {
        page: this.state.nextPage,
        type: this.state.infoType,
      }
    })
  };

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
  }

  render() {
    const row = (info, sectionID, rowID) => {
      let linkPath = `/infos/${info.id}`;
      return (
        <Link key={rowID} to={linkPath}>
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
                      className={styles.likes_count}
                      src={Images.social.like_gray}/>
                    <span className={styles.total_views}>{this.show_count(info.likes_count)}</span>

                  </div>
                </div>

              </div>

            </div>

            <div style={{display: 'flex', flex: 1}}/>
            <img
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

    return (
      <div>
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {this.state.isLoading ? 'Loading...' : 'Loaded'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
