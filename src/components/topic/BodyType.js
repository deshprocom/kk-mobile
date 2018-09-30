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
    return <div>
      <span className={styles.body}>{title2}</span>

      {strNotNull(item.cover_link) ? <div
        className={styles.long_cover}>
        <img src={item.cover_link}/>
      </div> : null}


    </div>
  };

  short = (item) => {
    const {images, body} = item;
    let des = body.replace(/[\n\r]/g, '<br/>');
    console.log("body",body)
    console.log("des",des)
    return <div>
      {strNotNull(body) ? <div
        className={styles.body} dangerouslySetInnerHTML={{__html: des}}/>: null}

      {images && images.length > 0 ? this.shortImage(images) : null}

    </div>
  };
  shortImage = (images) => {
    if (images.length === 1) {
      return (
        <div className={styles.long_cover} style={{height: 200, width: 200}}>
          <img className={styles.short_image_one}
               src={images[0].url}/>
        </div>
      )
    }

    let imageViews = images.map((item, key) => {
      return <div key={key} className={styles.imgView}>
        <img className={styles.short_image}
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
