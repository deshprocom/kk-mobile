import React, {Component} from 'react';
import {Carousel, Card, WhiteSpace, Flex} from 'antd-mobile';
import styles from './index.less';
import {Images} from "../../Thems";
import {routerRedux} from "dva/router";
import {strNotNull, sub} from "../../utils/utils";
import GoBack from "../GoBack";
import store from "../../index";

export default class HotelDetail extends Component {

  state = {
    opacity: 0
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
  }

  handleScroll = () => {
    let detailPage = document.getElementById('detailPage');
    let offsetY = detailPage && detailPage.offsetTop;
    if (offsetY <= 200) {
      let opacity = offsetY / 200;
      this.setState({opacity: opacity});
    } else {
      this.setState({opacity: 1});
    }
  }


  _star = (star) => {
    let stars = [];
    for (let i = 1; i <= star; i++) {
      stars.push(i);
    }
    return stars;
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

  render() {
    const {hotel} = this.props;
    const imagesLayout = hotel.images.map(image => {
      return (
        <img
          alt=''
          key={image.id}
          src={image.image}
          style={{width: '100%', verticalAlign: 'top', height: 200}}
        />
      )
    });
    const {images, location, title, description, telephone, amap_poiid, amap_navigation_url, amap_location} = hotel;
    return (
      <div className={styles.detailPage}>
        <GoBack title={title} dispatch={this.props.dispatch}/>

        <Carousel
          autoplay={true}
          autoplayInterval={2000}
          infinite
        >
          {imagesLayout}
        </Carousel>

        <div className={styles.nav_view}
             id="detailPage">

          <div style={{width: '70%'}}>
            <span className={styles.titleHotel}>{title}</span>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 5, alignItems: 'center'}}>
              <span style={{color: '#999999', fontSize: 12}}>酒店星级：</span>
              {this._star(hotel.star_level).map((index) => {
                return <img key={index} className={styles.stars} src={Images.macau.star}/>
              })}
            </div>
            <span className={styles.location2}>地址：{location}</span>
          </div>
          <div style={{display: 'flex', flex: 1}}/>

          <div style={{marginRight: 22, display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
            {hotel.start_price !== '0.0' ? <span className={styles.price3}><span
              style={{
                color: '#FF3F3F',
                fontSize: 12
              }}>¥</span>{this._discount(hotel.start_price, hotel.discount_amount)}<span
              style={{color: '#AAAAAA', fontSize: 12}}>起</span></span> : null}
            <div style={{display: 'flex', flex: 1}}/>
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <img style={{height: 14, width: 10}}
                   src={Images.macau.location}/>
              <span style={{color: "#4A90E2", fontSize: 12, marginLeft: 4}}>地图</span>
            </div>

          </div>
        </div>
        <WhiteSpace size="sm"/>
        <Card full>
          <Card.Body>
            <div className="renderHtmlData"
                 dangerouslySetInnerHTML={{__html: hotel.description}}/>
          </Card.Body>
        </Card>

        <div style={{height: 50, backgroundColor: 'white'}}/>

        <Flex className={styles.detailFooter}>
          <div className={styles.leftFooter}>
            <a href={`tel:${telephone}`}>
              <img style={{width: 27, height: 23}} src={Images.macau.callPhone}/>
              <span style={{color: "#666666", fontSize: 14, marginLeft: 11}}>联系客服</span>
            </a>
          </div>
          <div className={styles.rightFooter} onClick={() => {
            store.dispatch(routerRedux.push('/homepage/loadApp'))
          }}>
            预定房间
          </div>
        </Flex>
      </div>
    )
  }
}
