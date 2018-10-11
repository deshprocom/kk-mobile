import React, {Component} from 'react';
import {Carousel, Card} from 'antd-mobile';
import ProductBottom from './ProductBottom';
import ProductInfo from './ProductInfo';
import {Images} from '../../Thems';
import styles from './index.less';
import GoBack from "../GoBack";

export default class ProductDetail extends Component {

  state = {
    imgHeight: 362,
  }

  render() {
    const {productDetail} = this.props;
    const {images} = productDetail;
    console.log('productDetail', images)
    const imagesLayout = images.map(image => {
      return (
        <div key={image.id} style={{width: '100%', height: this.state.imgHeight}}>
          <img
            alt=''
            src={image.large}
            style={{
              width: '100%',
              verticalAlign: 'top'
            }}
            onLoad={() => {
              window.dispatchEvent(new Event('resize'));
              this.setState({imgHeight: 'auto'});
            }}
          />
        </div>
      )
    });
    return (
      <div style={{width: '100%', paddingBottom: 60, display: 'flex', flexDirection: 'column'}}>
        <GoBack title={''}/>
        <Carousel
          autoplay={true}
          autoplayInterval={2000}
          infinite
        >
          {imagesLayout}
        </Carousel>

        <ProductInfo product={productDetail}/>

        <div className={styles.spec_View}>
          <span className={styles.spec}>产品规格</span>
          <span className={styles.unSelected}>未选</span>
          <div style={{display: 'flex', flex: 1}}/>
          <img className={styles.right_img} src={Images.is} alt=""/>
        </div>

        <Card>
          <Card.Header
            title='商品介绍'
          />
          <Card.Body>
            <div className="renderHtmlData"
                 dangerouslySetInnerHTML={{__html: productDetail.description}}/>
          </Card.Body>
        </Card>
        <ProductBottom history={this.props.history}/>
      </div>
    );
  }
}
