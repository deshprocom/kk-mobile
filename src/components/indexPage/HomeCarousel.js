import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import { Link } from 'dva/router';


export default class HomeCarousel extends Component {
  state = {
    imgHeight: 186,
  };
  
  render() {
    const { banners } = this.props;
    const typeMap = {
      info: 'infos',
      hotel: 'hotels',
    };
    const bannersLayout = banners.map(banner => {
      let linkPath = `/${typeMap[banner.source_type]}/${banner.source_id}`;
      
      return(
        <Link
          key={`${banner.source_type}_${banner.source_id}`}
          to={linkPath}
        >
          <img
            src={banner.image}
            alt=''
            style={{ width: '100%', verticalAlign: 'top' }}
            onLoad={() => {
              // fire window resize event to change height
              window.dispatchEvent(new Event('resize'));
              this.setState({ imgHeight: 'auto' });
            }}
          />
        </Link>
      )
    });
    return (
      <div>
        <Carousel
          autoplay={true}
          autoplayInterval={2000}
          infinite
        >
          {bannersLayout}
        </Carousel>
      </div>
    );
  }
}
