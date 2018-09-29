import React, {Component} from 'react';
import {ListView} from 'antd-mobile';
import {Link} from 'dva/router';
import ReactDOM from 'react-dom';
import styles from './index.less';
import {Images} from '../../Thems';
import {strNotNull, sub} from '../../utils/utils'

const categorie1 = [{id: 0, name: '全部', type: '', isSelect: true},
  {id: 1, name: '氹仔区', type: 'dangzai', isSelect: false}, {
    id: 2,
    name: '澳门半岛',
    type: 'aomenbandao',
    isSelect: false
  }];

export default class Hotels extends Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      height: document.documentElement.clientHeight * 3 / 4,
    };
  }


  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.hotels !== this.props.hotels) {
      const height = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(nextProps.hotels),
        height,
      });
    }
  };

  _star = (star) => {
    let stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(i);
    }
    return stars;
  };
  //是否有代金劵
  _vouchers = () => {
    return (
      <div className={styles.view} style={{borderColor: '#FF3F3F'}}>
        <span style={{color: '#FF3F3F', fontSize: 10}}>代金劵</span>
      </div>
    )
  };

  //是否是精选
  _recommend = () => {
    return (
      <div className={styles.view} style={{borderColor: '#4A90E2', marginLeft: 8}}>
        <span style={{color: '#4A90E2', fontSize: 10}}>小编推荐</span>
      </div>
    )
  };

  _discount = (price, discount_amount) => {
    if (strNotNull(discount_amount)) {
      if (Number.parseFloat(discount_amount) > Number.parseFloat(price)) {
        return price;
      } else {
        return sub(Number.parseFloat(price), Number.parseFloat(discount_amount))
      }
    } else {
      return price
    }
  };
  setLogo=(logo)=>{
    if(strNotNull(logo)){
      return logo;
    }else{
      return Images.empty_image
    }
  }

  render() {
    const {isLoading, onEndReached} = this.props;
    const row = (hotel, sectionID, rowID) => {
      let linkPath = `/hotels/${hotel.id}`;
      const {title, address, location, logo, start_price, star_level, discount_amount} = hotel;
      return (
        <Link key={rowID} to={linkPath}>
          <div style={{padding: '14px 17px'}} className={styles.hotelItemView}>
            <img
              style={{width: 67, height: 95}}
              src={this.setLogo(logo)}/>

            <div className={styles.message}>
              <span className={styles.name}>{title}</span>
              {hotel.star_level > 0 ? <div className={styles.starView}>
                <span style={{color: '#999999', fontSize: 12}}>酒店星级：</span>
                {this._star(hotel.star_level).map((index) => {
                  return <img key={index} className={styles.stars} src={Images.macau.star}/>
                })}
              </div> : null}
              <div className={styles.locationSpan}>地址：{location}</div>
              <div className={styles.priceView}>
                {hotel.vouchers ? this._vouchers() : <div/>}
                {hotel.recommend ? this._recommend() : <div/>}
                <div style={{display: 'flex', flex: 1}}/>
                {hotel.start_price !== '0.0' ? <span className={styles.price}><span
                  style={{color: '#FF3F3F', fontSize: 12}}>¥</span>{this._discount(start_price, discount_amount)}<span
                  style={{color: '#AAAAAA', fontSize: 12}}>起</span></span> : null}
              </div>
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
      <div>
        <ListView
          ref={el => this.lv = el}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          dataSource={this.state.dataSource}
          renderFooter={() => (<div style={{padding: 30, textAlign: 'center'}}>
            {isLoading ? 'Loading...' : '已经没有啦！'}
          </div>)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          scrollRenderAheadDistance={500}
          onEndReached={onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    );
  }
}
