import React, {Component} from 'react';
import {List} from 'antd-mobile';
import {Link} from 'dva/router';
import styles from './index.less';
import {strNotNull} from '../../utils/utils';
import {Images} from '../../Thems'

const Item = List.Item;

export default class HotRecommends extends Component {

  isEmptyImg = (img) => {
    if (strNotNull(img)) {
      return img
    } else {
      return Images.empty_image
    }
  };

  show_count = (item) => {
    if (strNotNull(item)) {
      if (item >= 1000 || item.length > 3) {
        return '999+'
      } else {
        return item
      }
    } else {
      return 0
    }
  };

  render() {
    const {recommends} = this.props;
    const typeMap = {
      info: 'infos',
      hotel: 'hotels',
    };

    let recommendItems = recommends.map((recommend, index) => {
        let sourceType = recommend.source_type;
        let sourceInfo = recommend[sourceType];
        let linkPath = `/${typeMap[sourceType]}/${sourceInfo.id}`;
        return (
          <Item key={index} >
            <Link to={linkPath} className={styles.itemView}>

              <div className={styles.row_center}>
                <span className={styles.hotel_title}>{sourceInfo.title}</span>
                <div style={{display: 'flex', flex: 1}}/>
                {strNotNull(sourceInfo.type.name) ? <span className={styles.hotel}>{sourceInfo.type.name}</span> : null}

              </div>
              <img
                alt=''
                src={this.isEmptyImg(sourceInfo.image)}
                style={{minHeight:164,width: '100%'}}/>

              <div className={styles.itemBtn}>
                <span className={styles.readSpan}>阅读</span>
                <span className={styles.total_views}>{sourceInfo.total_views}</span>
                <div style={{display: 'flex', flex: 1}}/>
                <img
                  alt=''
                  style={{height: 12, width: 12}}
                  src={Images.social.like_gray}/>
                <span className={styles.total_views} style={{marginRight: 20}}>{this.show_count(sourceInfo.likes_count)}</span>

                <img
                  alt=''
                  style={{height: 12, width: 12}}
                  src={Images.reply}/>
                <span className={styles.total_views}>{this.show_count(sourceInfo.comments_count)}</span>

              </div>

            </Link>
          </Item>
        )
      }
    );
    return (
      <div className={styles.hotRecomm}>
        <List>
          <Item className={styles.topic}>热门推荐</Item>
          {recommendItems}
        </List>
      </div>
    );
  }
}
