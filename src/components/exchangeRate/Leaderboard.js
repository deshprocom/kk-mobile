import React, {Component} from 'react';
import styles from './index.less';
import {add, strNotNull} from '../../utils/utils';
import {Images} from '../../Thems'
import RateInfo from './RateInfo';
import {Tabs} from 'antd-mobile';
import {ListView} from "antd-mobile/lib/index";


export default class Leaderboard extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      isLoading: true,
      nextPage: 1,
      trader_type: props.category.type,
    };
    this._infosData = [];
  };

  componentDidMount() {
    this.setState({isLoading: true});
    this.props.dispatch({
      type: 'exchangeRate/fetchRateLeader',
      payload: {
        page: this.state.nextPage,
        page_size: 20,
        trader_type: this.state.trader_type,
      }
    })
  };
  onEndReached = () => {
    this.setState({isLoading: true});
    this.props.dispatch({
      type: 'exchangeRate/fetchRateLeader',
      payload: {
        page: this.state.nextPage
      }
    })
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.rateLeaders !== this.props.rateLeaders) {
      let nextPage = this.state.nextPage + 1;

      this._infosData = this._infosData.concat(nextProps.rateLeaders);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this._infosData),
        isLoading: false,
        nextPage
      });
    }
  };

  show_index = (index) => {
    if (index == 0) {
      return <img className={styles.show_index} src={Images.one1}/>
    } else if (index == 1) {
      return <img className={styles.show_index} src={Images.two}/>
    } else if (index == 2) {
      return <img className={styles.show_index} src={Images.three}/>
    } else {
      return <span className={styles.txt_num} style={{width: 18}}>{add(index, 1)}</span>
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
    const row = (rowData, sectionID, rowID) => {
      const {avatar, mobile, nick_name, signature, user_id} = rowData;
      return (
        <div className={styles.rankingPage}>
          {this.show_index(rowID)}

          <img className={styles.avatar}
               src={this.set_avatar(avatar)}/>

          <div style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
            <span className={styles.txt_name}>{nick_name}</span>
            <span className={styles.txt_decs} style={{marginTop: 2}}>{signature}</span>
          </div>

          <div style={{display: 'flex', flex: 1}}/>

          <span className={styles.txt_decs}>联系他</span>

          <img className={styles.img_left}
               src={Images.adr_right}/>
        </div>
      )
    };

    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: '#F5F5F9',
          height: 1,
          borderTop: '1px solid #ECECED'
        }}
      />
    );
    return (
      <div>
        <ListView
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {this.state.isLoading ? 'Loading...' : '已经没有啦!'}
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
    )
  }
}
