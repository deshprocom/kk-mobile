import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import SaunaGoBack from '../saunas/GoBack';
import styles from './index.less';
import {Images} from '../../Thems';
import {strNotNull} from '../../utils/utils'

export default class SaunaList extends Component {
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
      dataSource: this.state.dataSource.cloneWithRows(nextProps.saunas),
    });
  };

  _star = (star) => {
    let stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(i);
    }
    return stars;
  }

  render() {
    const {isLoading, onEndReached, onClickItem} = this.props;
    const row = (sauna, sectionID, rowID) => {
      let linkPath = `/saunas/${sauna.id}`;
      const {id, title, location, logo, price, star_level, distance} = sauna;
      return (
        <Link key={rowID} to={linkPath} onClick={onClickItem} className={styles.sunnaView}>
          <img
            style={{width: 67, height: 95, marginLeft: 12}}
            src={logo}/>
          <div className={styles.message}>
            <span className={styles.name}>{title}</span>
            {star_level > 0 ? <div className={styles.starView}>
              <span style={{color: '#999999', fontSize: 12}}>服务星级：</span>
              {this._star(sauna.star_level).map((index) => {
                return <img key={index} className={styles.stars} src={Images.macau.star}/>
              })}
            </div> : null}
            <span className={styles.location}>地址：{location}</span>
            <div style={{display: 'flex', flex: 1}}/>
            <div className={styles.priceView}>
              <div style={{display: 'flex', flex: 1}}/>
              <span style={{
                color: '#4A90E2',
                fontSize: 12
              }}>{strNotNull(distance) ? distance.toFixed(2) : distance}km</span>
            </div>
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
      <div style={{display: 'flex', width: '100%', flexDirection: 'column'}}>
        <SaunaGoBack currentPath={'saunas'}/>
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
}
