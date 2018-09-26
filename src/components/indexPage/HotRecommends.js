import React, { Component } from 'react';
import { List } from 'antd-mobile';
import { Link } from 'dva/router';

const Item = List.Item;

export default class HotRecommends extends Component {
  
  render() {
    const { recommends } = this.props;
    const typeMap = {
      info: 'infos',
      hotel: 'hotels',
    };
  
    let recommendItems = recommends.map((recommend, index) =>{
      let sourceType = recommend.source_type;
      let sourceInfo = recommend[sourceType];
      let linkPath = `/${typeMap[sourceType]}/${sourceInfo.id}`;
      return (
        <Item key={index}>
          <Link to={linkPath}>
            {sourceInfo.title}
          </Link>
        </Item>
      )
    }
    );
    return (
      <div>
        <List>
          <Item>热门推荐</Item>
          {recommendItems}
        </List>
      </div>
    );
  }
}
