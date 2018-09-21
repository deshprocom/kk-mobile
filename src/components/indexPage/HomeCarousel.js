import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';


export default class HomeCarousel extends Component {
  state = {
    imgHeight: 186,
  };
  
  render() {
    const { banners } = this.props;
    return (
      <div>
        <Carousel
          autoplay={true}
          autoplayInterval={2000}
          infinite
        >
          {banners.map(banner => (
            <a
              key={`${banner.source_type}_${banner.source_id}`}
              href="/"
              style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
            >
              <img
                src={banner.image}
                style={{ width: '100%', verticalAlign: 'top' }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event('resize'));
                  this.setState({ imgHeight: 'auto' });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  }
}
