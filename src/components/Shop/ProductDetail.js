import React, { Component } from 'react';
import { Carousel, Card } from 'antd-mobile';

export default class ProductDetail extends Component {
  render() {
    const { productDetail } = this.props;
    console.log(productDetail)
    const imagesLayout = productDetail.images.map(image => {
      return(
        <img
          alt=''
          key={image.id}
          src={image.preview}
          style={{ width: '100%', verticalAlign: 'top' }}
        />
      )
    });
    return(
      <div>
        <Carousel
          autoplay={true}
          autoplayInterval={2000}
          infinite
        >
          {imagesLayout}
        </Carousel>
        <Card>
          <Card.Header
            title='商品介绍'
          />
          <Card.Body>
            <div className="renderHtmlData"
                 dangerouslySetInnerHTML={{__html: productDetail.description}}/>
          </Card.Body>
        </Card>
        
      </div>
    );
  }
}
