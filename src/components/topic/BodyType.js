import React, {Component} from 'react';
import {Grid} from 'antd-mobile';
import {strNotNull} from '../../utils/utils';
import styles from '../indexPage/index.less';

export default class BodyType extends Component {

  render() {
    return (
      this.bodyTypes(this.props.rowData)
    )
  }

  bodyTypes = (item) => {
    if (item.body_type === 'long')
      return this.long(item);
    else
      return this.short(item);
  };

  long = (item) => {
    const { changeState } = this.props;
    let title2 = item.title;
    let des = title2.replace(/[\n\r]/g, '<br/>');
    return <div>
      {strNotNull(des) ? <div
        className={styles.body} dangerouslySetInnerHTML={{__html: des}}/> : null}

      {strNotNull(item.cover_link) ? <div
        className={styles.long_cover} style={{marginRight: 17}}>
        <img src={item.cover_link}
             alt={''}
             onClick={() => { changeState && changeState(true, 0, item) }}
             className={styles.short_image_one}/>
      </div> : null}


    </div>
  };


  short = (item) => {
    const {images, body} = item;
    let des = body.replace(/[\n\r]/g, '<br/>');
    return <div>
      {strNotNull(des) ? <div
        className={styles.body}
        style={{marginBottom:9}}
        dangerouslySetInnerHTML={{__html: des}}/> : null}

      {images && images.length > 0 ? this.shortImage(item) : null}

    </div>
  };

  shortRenderItem = (item, index) => {
    const { changeState } = this.props;
    return (
      <div key={item.url} className={styles.imgView}>
        <img className={styles.short_image}
             alt={''}
             onClick={() => { changeState && changeState(true, index, item) }}
             src={item.url}/>
      </div>
    )
  };

  shortImage = (rowData) => {
    const { changeState } = this.props;
    if (rowData.images.length === 1 && strNotNull(rowData.images[0].url)) {
      return (
        <img
          alt={''}
          className={styles.short_image_one}
          onClick={() => { changeState && changeState(true, 0, rowData) }}
          src={rowData.images[0].url}/>
      )
    }else{
      return <Grid data={rowData.images} columnNum={3}
                   hasLine={false}
                   itemStyle={{ height: '108px'}}
                   renderItem={this.shortRenderItem}/>
    }
  }
}
