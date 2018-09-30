import React, {Component} from 'react';
import {Card} from 'antd-mobile';
import {strNotNull, getDateDiff} from '../../utils/utils';
import {Images} from '../../Thems';
import styles from '../indexPage/index.less';

export default class BodyType extends Component {

  render() {
    return (
      this.bodyTypes(this.props.rowData)
    )
  }

  bodyTypes = (item) => {
    switch (item.body_type) {
      case "long":
        return this.long(item)
      case "short":
        return this.short(item)
    }
  };

  long = (item) => {
    let title2 = item.title;
    let des = title2.replace(/[\n\r]/g, '<br/>');
    return <div>
      {strNotNull(des) ? <div
        className={styles.body} dangerouslySetInnerHTML={{__html: des}}/> : null}

      {strNotNull(item.cover_link) ? <div
        className={styles.long_cover}>
        <img src={item.cover_link}
             onClick={() => {
               // this.props.changeState(true,0,item)
             }}/>
      </div> : null}


    </div>
  };
  getNaturalWidth=(url)=> {
    let image = new Image();
    image.src = url;
    let naturalWidth = image.width;
    return naturalWidth
  };
  getNaturalHeight=(url)=> {
    let image = new Image();
    image.src = url;
    let naturalHidth = image.height;
    return naturalHidth
  };


  short = (item) => {
    const {images, body} = item;
    let des = body.replace(/[\n\r]/g, '<br/>');
    return <div>
      {strNotNull(des) ? <div
        className={styles.body} dangerouslySetInnerHTML={{__html: des}}/> : null}

      {images && images.length > 0 ? this.shortImage(item) : null}

    </div>
  };
  shortImage = (rowData) => {
    if (rowData.images.length === 1) {
      let imgHeight = this.getNaturalHeight(rowData.images[0].url);
      let imgWidth = (200 * this.getNaturalWidth(rowData.images[0].url)) / imgHeight;
      return (
        <div className={styles.long_cover}
             style={{height: imgHeight < 200 ? imgHeight : 200,
               width: imgWidth < window.screen.width - 34 ? imgWidth : 200}}>
          <img className={styles.short_image_one}
               id="imgWH"
               onClick={() => {
                 this.props.changeState(true, 0, rowData)
               }}
               src={rowData.images[0].url}/>
        </div>
      )
    }

    let imageViews = rowData.images.map((item, key) => {
      return <div key={key} className={styles.imgView}>
        <img className={styles.short_image}
             onClick={() => {
               this.props.changeState(true, key, rowData)
             }}
             src={item.url}/>
      </div>

    });

    return <div style={{
      display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '100%', justifyContent: 'space-between'
    }}>
      {imageViews}
    </div>

  }
}
