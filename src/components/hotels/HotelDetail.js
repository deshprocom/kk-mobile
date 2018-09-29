import React, {Component} from 'react';
import { Carousel, Card, WhiteSpace, Flex } from 'antd-mobile';
import styles from './index.less';

export default class HotelDetail extends Component {
  render() {
    const { hotel } = this.props;
    const imagesLayout = hotel.images.map(image => {
      return(
        <img
          key={image.id}
          src={image.image}
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
        <Card full>
          <Card.Body >
            {hotel.title}
            <p>￥{hotel.start_price - hotel.discount_amount}</p>
          </Card.Body>
        </Card>
        <WhiteSpace size="sm" />
        <Card full>
          <Card.Body >
            <div className="renderHtmlData"
                 dangerouslySetInnerHTML={{__html: hotel.description}}/>
          </Card.Body>
        </Card>
        
        <Flex className={styles.detailFooter}>
          <div className={styles.leftFooter}>
            联系客服
          </div>
          <div className={styles.rightFooter}>
            预定房间
          </div>
        </Flex>
      </div>
    )
  }
}
